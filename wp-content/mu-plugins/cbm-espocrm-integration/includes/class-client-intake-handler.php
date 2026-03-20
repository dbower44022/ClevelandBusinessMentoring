<?php
/**
 * Client Mentoring Request Form — Gravity Forms submission handler.
 *
 * Hooks into gform_after_submission to create three linked records in EspoCRM:
 *   1. Company  (the business)
 *   2. Contact  (the person, flagged as Primary Contact, linked to Company)
 *   3. Engagement (Status = Submitted, linked to Company)
 *
 * Rollback strategy:
 *   - Step 1 fails: log + alert, stop.
 *   - Step 2 fails: delete Company from step 1, log + alert, stop.
 *   - Step 3 fails: keep Company + Contact (they are valid), log + alert.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class CBM_Client_Intake_Handler {

    /**
     * Gravity Form ID for the Client Mentoring Request form.
     *
     * UPDATE THIS after creating the form in Gravity Forms admin.
     */
    private const FORM_ID = 1;

    /**
     * Gravity Forms field ID mapping.
     *
     * UPDATE THESE after building the form. Keys are logical names;
     * values are Gravity Forms field IDs. Address sub-fields use dot notation.
     */
    private const FIELD_MAP = array(
        'first_name'       => 1,
        'last_name'        => 2,
        'email'            => 3,
        'phone'            => 4,
        'zip_code'         => 5,
        'business_name'    => 6,
        'website'          => 7,
        'address_street'   => '8.1',
        'address_city'     => '8.2',
        'address_state'    => '8.3',
        'address_zip'      => '8.4',
        'organization_type' => 9,
        'business_stage'   => 10,
        'naics_sector'     => 11,
        'naics_subsector'  => 12,
        'mentoring_focus'  => 13,
        'mentoring_needs'  => 14,
    );

    /**
     * Admin email address for error notifications.
     *
     * Falls back to the WordPress admin email if not defined.
     */
    private const ADMIN_EMAIL_OPTION = 'admin_email';

    /** @var CBM_EspoCRM_API_Client */
    private $api;

    public function __construct() {
        add_action(
            'gform_after_submission_' . self::FORM_ID,
            array( $this, 'handle_submission' ),
            10,
            2
        );

        add_filter(
            'gform_field_validation_' . self::FORM_ID,
            array( $this, 'validate_naics_subsector' ),
            10,
            4
        );

        add_filter(
            'gform_enqueue_scripts_' . self::FORM_ID,
            array( $this, 'enqueue_naics_cascade_script' ),
            10,
            2
        );
    }

    /**
     * Main submission handler — creates Company, Contact, and Engagement in EspoCRM.
     *
     * @param array $entry The Gravity Forms entry.
     * @param array $form  The Gravity Forms form object.
     */
    public function handle_submission( array $entry, array $form ): void {
        try {
            $this->api = new CBM_EspoCRM_API_Client();
        } catch ( RuntimeException $e ) {
            $this->flag_entry( $entry['id'], 'failed', array(), $e->getMessage() );
            $this->send_error_email( $entry['id'], 'initialization', $e->getMessage() );
            return;
        }

        // Step 1: Create Company.
        $company_result = $this->create_company( $entry );

        if ( ! $company_result['success'] ) {
            $this->flag_entry( $entry['id'], 'failed', array(), $company_result['error'] );
            $this->send_error_email( $entry['id'], 'Company creation', $company_result['error'] );
            return;
        }

        $company_id = $company_result['id'];

        // Step 2: Create Contact linked to Company.
        $contact_result = $this->create_contact( $entry, $company_id );

        if ( ! $contact_result['success'] ) {
            // Rollback: delete the Company we just created.
            $this->api->delete_record( 'Company', $company_id );

            $this->flag_entry( $entry['id'], 'failed', array(), $contact_result['error'] );
            $this->send_error_email( $entry['id'], 'Contact creation (Company rolled back)', $contact_result['error'] );
            return;
        }

        $contact_id = $contact_result['id'];

        // Step 3: Create Engagement linked to Company.
        $engagement_result = $this->create_engagement( $entry, $company_id );

        if ( ! $engagement_result['success'] ) {
            // Do NOT delete Company or Contact — they are valid records.
            $this->flag_entry(
                $entry['id'],
                'partial',
                array(
                    'company_id' => $company_id,
                    'contact_id' => $contact_id,
                ),
                $engagement_result['error']
            );
            $this->send_error_email( $entry['id'], 'Engagement creation (Company + Contact preserved)', $engagement_result['error'] );
            return;
        }

        // All three records created successfully.
        $this->flag_entry(
            $entry['id'],
            'success',
            array(
                'company_id'    => $company_id,
                'contact_id'    => $contact_id,
                'engagement_id' => $engagement_result['id'],
            )
        );
    }

    /**
     * Create a Company record in EspoCRM.
     *
     * @param array $entry GF entry.
     *
     * @return array{success: bool, id: string|null, error: string|null}
     */
    private function create_company( array $entry ): array {
        $last_name     = $this->get_field( $entry, 'last_name' );
        $business_name = $this->get_field( $entry, 'business_name' );

        // Fallback name for pre-startup applicants with no business name.
        $name = ! empty( $business_name )
            ? $business_name
            : sprintf( '%s - Pre-Startup', $last_name );

        $data = array(
            'name'                     => $name,
            'website'                  => $this->get_field( $entry, 'website', 'url' ),
            'billingAddressStreet'     => $this->get_field( $entry, 'address_street' ),
            'billingAddressCity'       => $this->get_field( $entry, 'address_city' ),
            'billingAddressState'      => $this->get_field( $entry, 'address_state' ),
            'billingAddressPostalCode' => $this->get_field( $entry, 'address_zip' ),
            'organizationType'         => $this->get_field( $entry, 'organization_type' ),
            'companyRole'              => 'Client Company',
            'businessStage'            => $this->get_field( $entry, 'business_stage' ),
            'naicsSector'              => $this->get_field( $entry, 'naics_sector' ),
            'naicsSubsector'           => $this->get_field( $entry, 'naics_subsector' ),
            'mentoringFocusAreas'      => $this->get_multiselect_field( $entry, 'mentoring_focus' ),
            'mentoringNeedsDescription' => $this->get_field( $entry, 'mentoring_needs', 'textarea' ),
        );

        return $this->api->create_record( 'Company', $data );
    }

    /**
     * Create a Contact record in EspoCRM, linked to the Company.
     *
     * @param array  $entry      GF entry.
     * @param string $company_id EspoCRM Company ID.
     *
     * @return array{success: bool, id: string|null, error: string|null}
     */
    private function create_contact( array $entry, string $company_id ): array {
        $data = array(
            'firstName'          => $this->get_field( $entry, 'first_name' ),
            'lastName'           => $this->get_field( $entry, 'last_name' ),
            'emailAddress'       => $this->get_field( $entry, 'email', 'email' ),
            'phoneNumber'        => $this->get_field( $entry, 'phone' ),
            'addressPostalCode'  => $this->get_field( $entry, 'zip_code' ),
            'companyId'          => $company_id,
            'isPrimaryContact'   => true,
        );

        return $this->api->create_record( 'Contact', $data );
    }

    /**
     * Create an Engagement record in EspoCRM, linked to the Company.
     *
     * @param array  $entry      GF entry.
     * @param string $company_id EspoCRM Company ID.
     *
     * @return array{success: bool, id: string|null, error: string|null}
     */
    private function create_engagement( array $entry, string $company_id ): array {
        $last_name     = $this->get_field( $entry, 'last_name' );
        $business_name = $this->get_field( $entry, 'business_name' );
        $name_part     = ! empty( $business_name ) ? $business_name : 'Pre-Startup';

        $data = array(
            'name'           => sprintf( '%s - %s Engagement', $last_name, $name_part ),
            'status'         => 'Submitted',
            'companyId'      => $company_id,
            'submissionDate' => gmdate( 'c' ),
        );

        return $this->api->create_record( 'Engagement', $data );
    }

    /**
     * Retrieve and sanitize a single field value from the GF entry.
     *
     * @param array  $entry GF entry.
     * @param string $key   Logical field name (key in FIELD_MAP).
     * @param string $type  Sanitization type: 'text' (default), 'email', 'url', 'textarea'.
     *
     * @return string Sanitized value.
     */
    private function get_field( array $entry, string $key, string $type = 'text' ): string {
        $field_id = self::FIELD_MAP[ $key ] ?? null;
        if ( null === $field_id ) {
            return '';
        }

        $raw = rgar( $entry, (string) $field_id );

        switch ( $type ) {
            case 'email':
                return sanitize_email( $raw );
            case 'url':
                return esc_url_raw( $raw );
            case 'textarea':
                return sanitize_textarea_field( $raw );
            default:
                return sanitize_text_field( $raw );
        }
    }

    /**
     * Retrieve a multi-select field value as an array.
     *
     * Gravity Forms stores multi-select values as a JSON-encoded string
     * or comma-separated string depending on version.
     *
     * @param array  $entry GF entry.
     * @param string $key   Logical field name.
     *
     * @return array<string> Sanitized values.
     */
    private function get_multiselect_field( array $entry, string $key ): array {
        $field_id = self::FIELD_MAP[ $key ] ?? null;
        if ( null === $field_id ) {
            return array();
        }

        $raw = rgar( $entry, (string) $field_id );

        if ( empty( $raw ) ) {
            return array();
        }

        // Gravity Forms stores multi-select as JSON array string.
        $decoded = json_decode( $raw, true );
        if ( is_array( $decoded ) ) {
            return array_map( 'sanitize_text_field', $decoded );
        }

        // Fallback: comma-separated.
        return array_map( 'sanitize_text_field', explode( ',', $raw ) );
    }

    /**
     * Store CRM sync metadata on the Gravity Forms entry.
     *
     * @param int    $entry_id   GF entry ID.
     * @param string $status     'success', 'partial', or 'failed'.
     * @param array  $record_ids Associative array of created record IDs.
     * @param string $error      Error message (empty on success).
     */
    private function flag_entry( int $entry_id, string $status, array $record_ids = array(), string $error = '' ): void {
        gform_update_meta( $entry_id, 'cbm_crm_sync_status', $status );

        if ( ! empty( $record_ids['company_id'] ) ) {
            gform_update_meta( $entry_id, 'cbm_crm_company_id', $record_ids['company_id'] );
        }
        if ( ! empty( $record_ids['contact_id'] ) ) {
            gform_update_meta( $entry_id, 'cbm_crm_contact_id', $record_ids['contact_id'] );
        }
        if ( ! empty( $record_ids['engagement_id'] ) ) {
            gform_update_meta( $entry_id, 'cbm_crm_engagement_id', $record_ids['engagement_id'] );
        }
        if ( ! empty( $error ) ) {
            gform_update_meta( $entry_id, 'cbm_crm_error_log', wp_json_encode( array(
                'timestamp' => gmdate( 'c' ),
                'status'    => $status,
                'error'     => $error,
            ) ) );
        }
    }

    /**
     * Send an error notification email to the admin.
     *
     * Email includes the entry ID (no PII) and a link to the entry in WP admin.
     *
     * @param int    $entry_id GF entry ID.
     * @param string $step     Description of which step failed.
     * @param string $error    Error message.
     */
    private function send_error_email( int $entry_id, string $step, string $error ): void {
        $admin_email = get_option( self::ADMIN_EMAIL_OPTION );
        $subject     = sprintf( 'ALERT: CRM sync failed for intake submission #%d', $entry_id );

        $entry_url = admin_url( sprintf(
            'admin.php?page=gf_entries&view=entry&id=%d&lid=%d',
            self::FORM_ID,
            $entry_id
        ) );

        $body = sprintf(
            "A CRM sync error occurred for Client Mentoring Request submission #%d.\n\n" .
            "Failed step: %s\n" .
            "Error: %s\n\n" .
            "View the entry in WordPress admin:\n%s\n\n" .
            "Please review the submission and manually create any missing CRM records if needed.",
            $entry_id,
            $step,
            $error,
            $entry_url
        );

        wp_mail( $admin_email, $subject, $body );
    }

    /**
     * Server-side validation: verify NAICS subsector belongs to selected sector.
     *
     * @param array  $result          Validation result array.
     * @param mixed  $value           Submitted field value.
     * @param array  $form            GF form object.
     * @param object $field           GF field object.
     *
     * @return array Modified validation result.
     */
    public function validate_naics_subsector( array $result, $value, array $form, $field ): array {
        $subsector_field_id = self::FIELD_MAP['naics_subsector'];

        if ( (int) $field->id !== (int) $subsector_field_id ) {
            return $result;
        }

        // Find the sector value from the submitted data.
        $sector_field_id = self::FIELD_MAP['naics_sector'];
        $sector_value    = rgpost( 'input_' . $sector_field_id );
        $subsector_value = $value;

        if ( empty( $sector_value ) || empty( $subsector_value ) ) {
            return $result;
        }

        $all_subsectors = cbm_get_naics_subsectors();

        if ( ! isset( $all_subsectors[ $sector_value ] ) ||
             ! isset( $all_subsectors[ $sector_value ][ $subsector_value ] ) ) {
            $result['is_valid'] = false;
            $result['message']  = 'The selected subsector does not belong to the selected sector. Please select a valid subsector.';
        }

        return $result;
    }

    /**
     * Enqueue the NAICS cascading dropdown JavaScript on the form page.
     *
     * @param array $form  GF form object.
     * @param bool  $ajax  Whether AJAX is enabled for the form.
     */
    public function enqueue_naics_cascade_script( $form, $ajax ): void {
        $js_url = plugins_url(
            'cbm-espocrm-integration/assets/js/naics-cascade.js',
            dirname( __DIR__ ) . '/cbm-espocrm-integration.php'
        );

        wp_enqueue_script(
            'cbm-naics-cascade',
            $js_url,
            array( 'jquery' ),
            filemtime( CBM_ESPOCRM_PLUGIN_DIR . '/assets/js/naics-cascade.js' ),
            true
        );

        // Pass NAICS data and field IDs to JavaScript.
        $naics_data = array();
        $sectors    = cbm_get_naics_sectors();
        $subsectors = cbm_get_naics_subsectors();

        foreach ( $sectors as $code => $label ) {
            $naics_data[ $code ] = array(
                'label'      => $label,
                'subsectors' => isset( $subsectors[ $code ] ) ? $subsectors[ $code ] : array(),
            );
        }

        wp_localize_script( 'cbm-naics-cascade', 'cbmNaicsData', array(
            'sectors'          => $naics_data,
            'sectorFieldId'    => self::FIELD_MAP['naics_sector'],
            'subsectorFieldId' => self::FIELD_MAP['naics_subsector'],
            'formId'           => self::FORM_ID,
        ) );
    }
}

// Initialize the handler.
new CBM_Client_Intake_Handler();
