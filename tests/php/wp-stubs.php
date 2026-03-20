<?php
/**
 * WordPress and Gravity Forms function stubs for unit testing.
 *
 * These stubs replicate the signatures of WP/GF functions used by the
 * mu-plugin so that the plugin code can be loaded and tested outside a
 * real WordPress environment.
 */

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', '/tmp/wp/' );
}

// ---------------------------------------------------------------------------
// Global tracking arrays — tests inspect these to verify calls were made.
// ---------------------------------------------------------------------------

/** @var array Tracks all wp_remote_post / wp_remote_request / wp_remote_get calls. */
global $cbm_test_http_calls;
$cbm_test_http_calls = array();

/** @var array Tracks all gform_update_meta calls. */
global $cbm_test_meta;
$cbm_test_meta = array();

/** @var array Tracks all wp_mail calls. */
global $cbm_test_emails;
$cbm_test_emails = array();

/** @var array|WP_Error|null Override return value for next HTTP call. */
global $cbm_test_http_response_queue;
$cbm_test_http_response_queue = array();

// ---------------------------------------------------------------------------
// WP_Error stub.
// ---------------------------------------------------------------------------

if ( ! class_exists( 'WP_Error' ) ) {
    class WP_Error {
        private $code;
        private $message;

        public function __construct( $code = '', $message = '' ) {
            $this->code    = $code;
            $this->message = $message;
        }

        public function get_error_message() {
            return $this->message;
        }

        public function get_error_code() {
            return $this->code;
        }
    }
}

// ---------------------------------------------------------------------------
// WordPress HTTP API stubs.
// ---------------------------------------------------------------------------

function is_wp_error( $thing ) {
    return $thing instanceof WP_Error;
}

/**
 * Dequeue the next response from the test queue, or return a default 200 OK.
 */
function _cbm_test_next_response() {
    global $cbm_test_http_response_queue;
    if ( ! empty( $cbm_test_http_response_queue ) ) {
        return array_shift( $cbm_test_http_response_queue );
    }
    // Default success with a generated ID.
    return array(
        'response' => array( 'code' => 200 ),
        'body'     => json_encode( array( 'id' => 'test-id-' . uniqid() ) ),
    );
}

function wp_remote_post( $url, $args = array() ) {
    global $cbm_test_http_calls;
    $cbm_test_http_calls[] = array(
        'method' => 'POST',
        'url'    => $url,
        'args'   => $args,
    );
    return _cbm_test_next_response();
}

function wp_remote_get( $url, $args = array() ) {
    global $cbm_test_http_calls;
    $cbm_test_http_calls[] = array(
        'method' => 'GET',
        'url'    => $url,
        'args'   => $args,
    );
    return _cbm_test_next_response();
}

function wp_remote_request( $url, $args = array() ) {
    global $cbm_test_http_calls;
    $cbm_test_http_calls[] = array(
        'method' => $args['method'] ?? 'GET',
        'url'    => $url,
        'args'   => $args,
    );
    return _cbm_test_next_response();
}

function wp_remote_retrieve_response_code( $response ) {
    if ( is_wp_error( $response ) ) {
        return 0;
    }
    return $response['response']['code'] ?? 0;
}

function wp_remote_retrieve_body( $response ) {
    if ( is_wp_error( $response ) ) {
        return '';
    }
    return $response['body'] ?? '';
}

// ---------------------------------------------------------------------------
// WordPress utility stubs.
// ---------------------------------------------------------------------------

function wp_json_encode( $data ) {
    return json_encode( $data );
}

function sanitize_text_field( $str ) {
    return trim( strip_tags( (string) $str ) );
}

function sanitize_email( $email ) {
    return filter_var( (string) $email, FILTER_SANITIZE_EMAIL );
}

function sanitize_textarea_field( $str ) {
    return trim( strip_tags( (string) $str ) );
}

function esc_url_raw( $url ) {
    return filter_var( (string) $url, FILTER_SANITIZE_URL );
}

function wp_mail( $to, $subject, $message, $headers = '', $attachments = array() ) {
    global $cbm_test_emails;
    $cbm_test_emails[] = array(
        'to'      => $to,
        'subject' => $subject,
        'message' => $message,
    );
    return true;
}

function get_option( $key, $default = false ) {
    if ( $key === 'admin_email' ) {
        return 'admin@example.com';
    }
    return $default;
}

function admin_url( $path = '' ) {
    return 'https://example.com/wp-admin/' . ltrim( $path, '/' );
}

function plugins_url( $path, $file ) {
    return 'https://example.com/wp-content/mu-plugins/' . $path;
}

// ---------------------------------------------------------------------------
// Gravity Forms stubs.
// ---------------------------------------------------------------------------

function gform_update_meta( $entry_id, $meta_key, $meta_value ) {
    global $cbm_test_meta;
    $cbm_test_meta[] = array(
        'entry_id'   => $entry_id,
        'meta_key'   => $meta_key,
        'meta_value' => $meta_value,
    );
}

/**
 * Gravity Forms rgar() — retrieve array value by key with default.
 */
function rgar( $array, $key, $default = '' ) {
    return isset( $array[ $key ] ) ? $array[ $key ] : $default;
}

/**
 * Gravity Forms rgpost() — retrieve $_POST value.
 */
function rgpost( $key, $default = '' ) {
    return isset( $_POST[ $key ] ) ? $_POST[ $key ] : $default;
}

// ---------------------------------------------------------------------------
// WordPress hook stubs (no-op for testing — handlers are called directly).
// ---------------------------------------------------------------------------

function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
    // No-op in tests.
}

function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
    // No-op in tests.
}

function wp_enqueue_script( $handle, $src = '', $deps = array(), $ver = false, $in_footer = false ) {
    // No-op in tests.
}

function wp_localize_script( $handle, $object_name, $data ) {
    // No-op in tests.
}

// ---------------------------------------------------------------------------
// Helper to reset global state between tests.
// ---------------------------------------------------------------------------

function cbm_test_reset() {
    global $cbm_test_http_calls, $cbm_test_meta, $cbm_test_emails, $cbm_test_http_response_queue;
    $cbm_test_http_calls          = array();
    $cbm_test_meta                = array();
    $cbm_test_emails              = array();
    $cbm_test_http_response_queue = array();
    $_POST                        = array();
}

/**
 * Enqueue a mock HTTP response to be returned by the next wp_remote_* call.
 *
 * @param int         $status_code HTTP status code.
 * @param array|null  $body        Response body (will be JSON-encoded).
 * @param bool        $wp_error    If true, return a WP_Error instead.
 * @param string      $error_msg   WP_Error message (only when $wp_error=true).
 */
function cbm_test_enqueue_response( int $status_code = 200, ?array $body = null, bool $wp_error = false, string $error_msg = '' ) {
    global $cbm_test_http_response_queue;

    if ( $wp_error ) {
        $cbm_test_http_response_queue[] = new WP_Error( 'http_request_failed', $error_msg );
        return;
    }

    $cbm_test_http_response_queue[] = array(
        'response' => array( 'code' => $status_code ),
        'body'     => $body !== null ? json_encode( $body ) : '',
    );
}
