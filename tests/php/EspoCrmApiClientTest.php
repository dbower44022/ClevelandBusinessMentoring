<?php
/**
 * Tests for CBM_EspoCRM_API_Client.
 */

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class EspoCrmApiClientTest extends TestCase {

    private CBM_EspoCRM_API_Client $client;

    protected function setUp(): void {
        cbm_test_reset();

        // Ensure wp-config constants are defined.
        if ( ! defined( 'CBM_ESPOCRM_URL' ) ) {
            define( 'CBM_ESPOCRM_URL', 'https://crm.example.com' );
        }
        if ( ! defined( 'CBM_ESPOCRM_API_KEY' ) ) {
            define( 'CBM_ESPOCRM_API_KEY', 'test-api-key-123' );
        }

        $this->client = new CBM_EspoCRM_API_Client();
    }

    // ----- create_record -------------------------------------------------

    public function test_create_record_sends_correct_url_and_headers(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'abc123' ) );

        $result = $this->client->create_record( 'Company', array( 'name' => 'Acme' ) );

        global $cbm_test_http_calls;
        $this->assertCount( 1, $cbm_test_http_calls );

        $call = $cbm_test_http_calls[0];
        $this->assertSame( 'POST', $call['method'] );
        $this->assertSame( 'https://crm.example.com/api/v1/Company', $call['url'] );
        $this->assertSame( 'test-api-key-123', $call['args']['headers']['X-Api-Key'] );
        $this->assertSame( 'application/json', $call['args']['headers']['Content-Type'] );
    }

    public function test_create_record_sends_json_body(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'abc123' ) );

        $data = array( 'name' => 'Acme', 'website' => 'https://acme.com' );
        $this->client->create_record( 'Company', $data );

        global $cbm_test_http_calls;
        $body = json_decode( $cbm_test_http_calls[0]['args']['body'], true );
        $this->assertSame( 'Acme', $body['name'] );
        $this->assertSame( 'https://acme.com', $body['website'] );
    }

    public function test_create_record_returns_id_on_success(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'company-001' ) );

        $result = $this->client->create_record( 'Company', array( 'name' => 'Test' ) );

        $this->assertTrue( $result['success'] );
        $this->assertSame( 'company-001', $result['id'] );
        $this->assertNull( $result['error'] );
    }

    public function test_create_record_returns_error_on_http_failure(): void {
        cbm_test_enqueue_response( 422, array( 'message' => 'Validation failed' ) );

        $result = $this->client->create_record( 'Company', array() );

        $this->assertFalse( $result['success'] );
        $this->assertNull( $result['id'] );
        $this->assertStringContainsString( '422', $result['error'] );
        $this->assertStringContainsString( 'Validation failed', $result['error'] );
    }

    public function test_create_record_returns_error_on_wp_error(): void {
        cbm_test_enqueue_response( 0, null, true, 'Connection timed out' );

        $result = $this->client->create_record( 'Contact', array( 'firstName' => 'Jane' ) );

        $this->assertFalse( $result['success'] );
        $this->assertNull( $result['id'] );
        $this->assertSame( 'Connection timed out', $result['error'] );
    }

    public function test_create_record_uses_15_second_timeout(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'x' ) );

        $this->client->create_record( 'Company', array( 'name' => 'Test' ) );

        global $cbm_test_http_calls;
        $this->assertSame( 15, $cbm_test_http_calls[0]['args']['timeout'] );
    }

    // ----- delete_record -------------------------------------------------

    public function test_delete_record_sends_delete_method(): void {
        cbm_test_enqueue_response( 200, array( 'id' => 'abc123' ) );

        $result = $this->client->delete_record( 'Company', 'abc123' );

        global $cbm_test_http_calls;
        $this->assertSame( 'DELETE', $cbm_test_http_calls[0]['method'] );
        $this->assertSame( 'https://crm.example.com/api/v1/Company/abc123', $cbm_test_http_calls[0]['url'] );
        $this->assertTrue( $result );
    }

    public function test_delete_record_returns_false_on_failure(): void {
        cbm_test_enqueue_response( 404, array( 'message' => 'Not found' ) );

        $result = $this->client->delete_record( 'Company', 'nonexistent' );

        $this->assertFalse( $result );
    }

    public function test_delete_record_returns_false_on_wp_error(): void {
        cbm_test_enqueue_response( 0, null, true, 'DNS resolution failed' );

        $result = $this->client->delete_record( 'Company', 'abc123' );

        $this->assertFalse( $result );
    }

    // ----- test_connection -----------------------------------------------

    public function test_connection_success(): void {
        cbm_test_enqueue_response( 200, array( 'user' => array( 'id' => 'system' ) ) );

        $result = $this->client->test_connection();

        $this->assertTrue( $result['success'] );
        $this->assertNull( $result['error'] );

        global $cbm_test_http_calls;
        $this->assertStringContainsString( '/api/v1/App/user', $cbm_test_http_calls[0]['url'] );
    }

    public function test_connection_failure_returns_error(): void {
        cbm_test_enqueue_response( 401, array( 'message' => 'Unauthorized' ) );

        $result = $this->client->test_connection();

        $this->assertFalse( $result['success'] );
        $this->assertStringContainsString( '401', $result['error'] );
    }
}
