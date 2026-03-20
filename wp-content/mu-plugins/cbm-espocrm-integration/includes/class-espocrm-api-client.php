<?php
/**
 * EspoCRM REST API client.
 *
 * Reusable HTTP client for communicating with the self-hosted EspoCRM instance.
 * Uses the WordPress HTTP API (wp_remote_post / wp_remote_request) and authenticates
 * via X-Api-Key header using credentials stored in wp-config.php constants.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class CBM_EspoCRM_API_Client {

    /** @var string */
    private $base_url;

    /** @var string */
    private $api_key;

    /** @var int HTTP timeout in seconds. */
    private const TIMEOUT = 15;

    /**
     * @throws RuntimeException If required wp-config constants are missing.
     */
    public function __construct() {
        if ( ! defined( 'CBM_ESPOCRM_URL' ) || ! defined( 'CBM_ESPOCRM_API_KEY' ) ) {
            throw new RuntimeException(
                'CBM EspoCRM integration: CBM_ESPOCRM_URL and CBM_ESPOCRM_API_KEY must be defined in wp-config.php.'
            );
        }

        $this->base_url = rtrim( CBM_ESPOCRM_URL, '/' );
        $this->api_key  = CBM_ESPOCRM_API_KEY;
    }

    /**
     * Create a record in EspoCRM.
     *
     * @param string $entity_type Entity name (e.g. "Company", "Contact", "Engagement").
     * @param array  $data        Associative array of field => value pairs.
     *
     * @return array{success: bool, id: string|null, error: string|null}
     */
    public function create_record( string $entity_type, array $data ): array {
        $url = sprintf( '%s/api/v1/%s', $this->base_url, rawurlencode( $entity_type ) );

        $response = wp_remote_post( $url, array(
            'timeout' => self::TIMEOUT,
            'headers' => array(
                'X-Api-Key'    => $this->api_key,
                'Content-Type' => 'application/json',
            ),
            'body' => wp_json_encode( $data ),
        ) );

        return $this->parse_response( $response, $entity_type, 'create' );
    }

    /**
     * Delete a record in EspoCRM (used for rollback on partial failure).
     *
     * @param string $entity_type Entity name.
     * @param string $id          Record ID to delete.
     *
     * @return bool True on successful deletion.
     */
    public function delete_record( string $entity_type, string $id ): bool {
        $url = sprintf(
            '%s/api/v1/%s/%s',
            $this->base_url,
            rawurlencode( $entity_type ),
            rawurlencode( $id )
        );

        $response = wp_remote_request( $url, array(
            'method'  => 'DELETE',
            'timeout' => self::TIMEOUT,
            'headers' => array(
                'X-Api-Key' => $this->api_key,
            ),
        ) );

        if ( is_wp_error( $response ) ) {
            $this->log_error( 'delete', $entity_type, $response->get_error_message() );
            return false;
        }

        $code = wp_remote_retrieve_response_code( $response );
        if ( $code >= 200 && $code < 300 ) {
            return true;
        }

        $this->log_error( 'delete', $entity_type, "HTTP $code" );
        return false;
    }

    /**
     * Verify API connectivity.
     *
     * @return array{success: bool, error: string|null}
     */
    public function test_connection(): array {
        $url = sprintf( '%s/api/v1/App/user', $this->base_url );

        $response = wp_remote_get( $url, array(
            'timeout' => self::TIMEOUT,
            'headers' => array(
                'X-Api-Key' => $this->api_key,
            ),
        ) );

        if ( is_wp_error( $response ) ) {
            return array(
                'success' => false,
                'error'   => $response->get_error_message(),
            );
        }

        $code = wp_remote_retrieve_response_code( $response );
        if ( $code >= 200 && $code < 300 ) {
            return array( 'success' => true, 'error' => null );
        }

        return array(
            'success' => false,
            'error'   => "HTTP $code: " . wp_remote_retrieve_body( $response ),
        );
    }

    /**
     * Parse the API response into a standard result array.
     *
     * @param array|WP_Error $response    Response from wp_remote_post.
     * @param string         $entity_type For logging context.
     * @param string         $action      For logging context.
     *
     * @return array{success: bool, id: string|null, error: string|null}
     */
    private function parse_response( $response, string $entity_type, string $action ): array {
        if ( is_wp_error( $response ) ) {
            $error = $response->get_error_message();
            $this->log_error( $action, $entity_type, $error );
            return array( 'success' => false, 'id' => null, 'error' => $error );
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code >= 200 && $code < 300 && ! empty( $body['id'] ) ) {
            return array( 'success' => true, 'id' => $body['id'], 'error' => null );
        }

        $error = sprintf(
            'HTTP %d — %s',
            $code,
            isset( $body['message'] ) ? $body['message'] : wp_remote_retrieve_body( $response )
        );
        $this->log_error( $action, $entity_type, $error );

        return array( 'success' => false, 'id' => null, 'error' => $error );
    }

    /**
     * Log an error without including PII.
     *
     * @param string $action      The API action (create, delete).
     * @param string $entity_type The entity type.
     * @param string $message     The error message.
     */
    private function log_error( string $action, string $entity_type, string $message ): void {
        error_log( sprintf(
            '[CBM EspoCRM] %s %s failed: %s',
            ucfirst( $action ),
            $entity_type,
            $message
        ) );
    }
}
