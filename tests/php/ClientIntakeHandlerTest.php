<?php
/**
 * Tests for CBM_Client_Intake_Handler.
 *
 * Exercises the gform_after_submission handler logic:
 *   - 3-step API chain (Company -> Contact -> Engagement)
 *   - Field mapping and sanitization
 *   - Rollback on partial failure
 *   - Entry meta tracking
 *   - Error notification emails
 *   - NAICS server-side validation
 */

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class ClientIntakeHandlerTest extends TestCase {

    private CBM_Client_Intake_Handler $handler;

    /**
     * Build a fake Gravity Forms entry with all fields populated.
     */
    private function make_entry( array $overrides = array() ): array {
        $defaults = array(
            'id'    => 42,
            '1'     => 'Jane',                   // first_name
            '2'     => 'Doe',                     // last_name
            '3'     => 'jane@example.com',        // email
            '4'     => '(216) 555-1234',          // phone
            '5'     => '44113',                   // zip_code
            '6'     => 'Doe Consulting',          // business_name
            '7'     => 'https://doe.com',         // website
            '8.1'   => '123 Main St',             // address_street
            '8.2'   => 'Cleveland',               // address_city
            '8.3'   => 'OH',                      // address_state
            '8.4'   => '44113',                   // address_zip
            '9'     => 'For-Profit',              // organization_type
            '10'    => 'Startup',                 // business_stage
            '11'    => '54',                      // naics_sector
            '12'    => '541',                     // naics_subsector
            '13'    => '["Marketing","Finance"]', // mentoring_focus (JSON array)
            '14'    => 'Need help with growth strategy and marketing.', // mentoring_needs
        );

        // Use union operator (+) instead of array_merge() to preserve
        // numeric keys. array_merge() re-indexes integer keys from 0.
        return $overrides + $defaults;
    }

    protected function setUp(): void {
        cbm_test_reset();

        // Constants should already be defined from the API client test.
        if ( ! defined( 'CBM_ESPOCRM_URL' ) ) {
            define( 'CBM_ESPOCRM_URL', 'https://crm.example.com' );
        }
        if ( ! defined( 'CBM_ESPOCRM_API_KEY' ) ) {
            define( 'CBM_ESPOCRM_API_KEY', 'test-api-key-123' );
        }

        $this->handler = new CBM_Client_Intake_Handler();
    }

    // =====================================================================
    // Happy path
    // =====================================================================

    public function test_happy_path_creates_three_records(): void {
        // Queue 3 successful responses: Company, Contact, Engagement.
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        $this->assertCount( 3, $cbm_test_http_calls );

        // Verify POST to Company, Contact, Engagement in order.
        $this->assertStringEndsWith( '/Company', $cbm_test_http_calls[0]['url'] );
        $this->assertStringEndsWith( '/Contact', $cbm_test_http_calls[1]['url'] );
        $this->assertStringEndsWith( '/Engagement', $cbm_test_http_calls[2]['url'] );
    }

    public function test_happy_path_stores_all_record_ids_in_meta(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_meta;
        $meta_map = $this->meta_to_map( $cbm_test_meta );

        $this->assertSame( 'success', $meta_map['cbm_crm_sync_status'] );
        $this->assertSame( 'comp-001', $meta_map['cbm_crm_company_id'] );
        $this->assertSame( 'cont-001', $meta_map['cbm_crm_contact_id'] );
        $this->assertSame( 'eng-001', $meta_map['cbm_crm_engagement_id'] );
    }

    public function test_happy_path_sends_no_error_email(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_emails;
        $this->assertEmpty( $cbm_test_emails );
    }

    // =====================================================================
    // Company field mapping
    // =====================================================================

    public function test_company_payload_contains_correct_fields(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        $company_body = json_decode( $cbm_test_http_calls[0]['args']['body'], true );

        $this->assertSame( 'Doe Consulting', $company_body['name'] );
        $this->assertSame( 'https://doe.com', $company_body['website'] );
        $this->assertSame( '123 Main St', $company_body['billingAddressStreet'] );
        $this->assertSame( 'Cleveland', $company_body['billingAddressCity'] );
        $this->assertSame( 'OH', $company_body['billingAddressState'] );
        $this->assertSame( '44113', $company_body['billingAddressPostalCode'] );
        $this->assertSame( 'For-Profit', $company_body['organizationType'] );
        $this->assertSame( 'Client Company', $company_body['companyRole'] );
        $this->assertSame( 'Startup', $company_body['businessStage'] );
        $this->assertSame( '54', $company_body['naicsSector'] );
        $this->assertSame( '541', $company_body['naicsSubsector'] );
        $this->assertSame( array( 'Marketing', 'Finance' ), $company_body['mentoringFocusAreas'] );
        $this->assertSame(
            'Need help with growth strategy and marketing.',
            $company_body['mentoringNeedsDescription']
        );
    }

    public function test_company_name_fallback_when_business_name_blank(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $entry = $this->make_entry( array( '6' => '' ) ); // blank business name
        $this->handler->handle_submission( $entry, array() );

        global $cbm_test_http_calls;
        $company_body = json_decode( $cbm_test_http_calls[0]['args']['body'], true );

        $this->assertSame( 'Doe - Pre-Startup', $company_body['name'] );
    }

    // =====================================================================
    // Contact field mapping
    // =====================================================================

    public function test_contact_payload_linked_to_company(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        $contact_body = json_decode( $cbm_test_http_calls[1]['args']['body'], true );

        $this->assertSame( 'Jane', $contact_body['firstName'] );
        $this->assertSame( 'Doe', $contact_body['lastName'] );
        $this->assertSame( 'jane@example.com', $contact_body['emailAddress'] );
        $this->assertSame( '(216) 555-1234', $contact_body['phoneNumber'] );
        $this->assertSame( '44113', $contact_body['addressPostalCode'] );
        $this->assertSame( 'comp-001', $contact_body['companyId'] );
        $this->assertTrue( $contact_body['isPrimaryContact'] );
    }

    // =====================================================================
    // Engagement field mapping
    // =====================================================================

    public function test_engagement_payload_linked_to_company(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        $eng_body = json_decode( $cbm_test_http_calls[2]['args']['body'], true );

        $this->assertSame( 'Doe - Doe Consulting Engagement', $eng_body['name'] );
        $this->assertSame( 'Submitted', $eng_body['status'] );
        $this->assertSame( 'comp-001', $eng_body['companyId'] );
        $this->assertNotEmpty( $eng_body['submissionDate'] );
    }

    public function test_engagement_name_fallback_when_no_business_name(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'eng-001' ) );

        $entry = $this->make_entry( array( '6' => '' ) );
        $this->handler->handle_submission( $entry, array() );

        global $cbm_test_http_calls;
        $eng_body = json_decode( $cbm_test_http_calls[2]['args']['body'], true );

        $this->assertSame( 'Doe - Pre-Startup Engagement', $eng_body['name'] );
    }

    // =====================================================================
    // Step 1 failure: Company creation fails
    // =====================================================================

    public function test_step1_failure_stops_and_flags_entry(): void {
        cbm_test_enqueue_response( 500, array( 'message' => 'Internal server error' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        // Only 1 call (Company), no Contact or Engagement attempted.
        $this->assertCount( 1, $cbm_test_http_calls );

        global $cbm_test_meta;
        $meta_map = $this->meta_to_map( $cbm_test_meta );
        $this->assertSame( 'failed', $meta_map['cbm_crm_sync_status'] );
    }

    public function test_step1_failure_sends_error_email(): void {
        cbm_test_enqueue_response( 500, array( 'message' => 'Server error' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_emails;
        $this->assertCount( 1, $cbm_test_emails );
        $this->assertStringContainsString( 'CRM sync failed', $cbm_test_emails[0]['subject'] );
        $this->assertStringContainsString( '#42', $cbm_test_emails[0]['subject'] );
        $this->assertStringContainsString( 'Company creation', $cbm_test_emails[0]['message'] );
    }

    // =====================================================================
    // Step 2 failure: Contact creation fails -> rollback Company
    // =====================================================================

    public function test_step2_failure_rolls_back_company(): void {
        // Company succeeds, Contact fails.
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 422, array( 'message' => 'Invalid contact data' ) );
        // DELETE for rollback.
        cbm_test_enqueue_response( 200, array() );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        // 3 calls: POST Company, POST Contact, DELETE Company.
        $this->assertCount( 3, $cbm_test_http_calls );
        $this->assertSame( 'DELETE', $cbm_test_http_calls[2]['method'] );
        $this->assertStringContainsString( 'comp-001', $cbm_test_http_calls[2]['url'] );
    }

    public function test_step2_failure_flags_entry_as_failed(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 422, array( 'message' => 'Invalid contact' ) );
        cbm_test_enqueue_response( 200, array() ); // DELETE

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_meta;
        $meta_map = $this->meta_to_map( $cbm_test_meta );
        $this->assertSame( 'failed', $meta_map['cbm_crm_sync_status'] );
    }

    public function test_step2_failure_sends_error_email_with_rollback_note(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 422, array( 'message' => 'Bad data' ) );
        cbm_test_enqueue_response( 200, array() );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_emails;
        $this->assertCount( 1, $cbm_test_emails );
        $this->assertStringContainsString( 'Company rolled back', $cbm_test_emails[0]['message'] );
    }

    // =====================================================================
    // Step 3 failure: Engagement fails -> Company+Contact preserved
    // =====================================================================

    public function test_step3_failure_preserves_company_and_contact(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 500, array( 'message' => 'Engagement error' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        // Only 3 POST calls, NO DELETE.
        $this->assertCount( 3, $cbm_test_http_calls );
        foreach ( $cbm_test_http_calls as $call ) {
            $this->assertSame( 'POST', $call['method'] );
        }
    }

    public function test_step3_failure_flags_entry_as_partial(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 500, array( 'message' => 'Engagement error' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_meta;
        $meta_map = $this->meta_to_map( $cbm_test_meta );

        $this->assertSame( 'partial', $meta_map['cbm_crm_sync_status'] );
        $this->assertSame( 'comp-001', $meta_map['cbm_crm_company_id'] );
        $this->assertSame( 'cont-001', $meta_map['cbm_crm_contact_id'] );
        $this->assertArrayNotHasKey( 'cbm_crm_engagement_id', $meta_map );
    }

    public function test_step3_failure_sends_error_email(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'comp-001' ) );
        cbm_test_enqueue_response( 200, array( 'id' => 'cont-001' ) );
        cbm_test_enqueue_response( 500, array( 'message' => 'Engagement error' ) );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_emails;
        $this->assertCount( 1, $cbm_test_emails );
        $this->assertStringContainsString( 'Engagement creation', $cbm_test_emails[0]['message'] );
        $this->assertStringContainsString( 'Company + Contact preserved', $cbm_test_emails[0]['message'] );
    }

    // =====================================================================
    // NAICS server-side validation
    // =====================================================================

    public function test_naics_validation_passes_for_valid_pair(): void {
        // Sector 54 contains subsector 541.
        $_POST['input_11'] = '54';

        $result = $this->handler->validate_naics_subsector(
            array( 'is_valid' => true, 'message' => '' ),
            '541',
            array(),
            (object) array( 'id' => 12 )
        );

        $this->assertTrue( $result['is_valid'] );
    }

    public function test_naics_validation_fails_for_invalid_pair(): void {
        // Sector 54 does NOT contain subsector 111 (that belongs to sector 11).
        $_POST['input_11'] = '54';

        $result = $this->handler->validate_naics_subsector(
            array( 'is_valid' => true, 'message' => '' ),
            '111',
            array(),
            (object) array( 'id' => 12 )
        );

        $this->assertFalse( $result['is_valid'] );
        $this->assertStringContainsString( 'does not belong', $result['message'] );
    }

    public function test_naics_validation_skips_non_subsector_fields(): void {
        // Field ID 5 is not the subsector field, so validation should pass through.
        $result = $this->handler->validate_naics_subsector(
            array( 'is_valid' => true, 'message' => '' ),
            'anything',
            array(),
            (object) array( 'id' => 5 )
        );

        $this->assertTrue( $result['is_valid'] );
    }

    // =====================================================================
    // Network error (WP_Error)
    // =====================================================================

    public function test_wp_error_on_company_create_stops_chain(): void {
        cbm_test_enqueue_response( 0, null, true, 'Could not resolve host' );

        $this->handler->handle_submission( $this->make_entry(), array() );

        global $cbm_test_http_calls;
        $this->assertCount( 1, $cbm_test_http_calls );

        global $cbm_test_meta;
        $meta_map = $this->meta_to_map( $cbm_test_meta );
        $this->assertSame( 'failed', $meta_map['cbm_crm_sync_status'] );

        global $cbm_test_emails;
        $this->assertCount( 1, $cbm_test_emails );
    }

    // =====================================================================
    // Helpers
    // =====================================================================

    /**
     * Flatten the meta array into key => value for easy assertions.
     */
    private function meta_to_map( array $meta_entries ): array {
        $map = array();
        foreach ( $meta_entries as $m ) {
            $map[ $m['meta_key'] ] = $m['meta_value'];
        }
        return $map;
    }
}
