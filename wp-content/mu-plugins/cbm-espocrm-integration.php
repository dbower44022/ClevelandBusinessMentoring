<?php
/**
 * Plugin Name: CBM EspoCRM Integration
 * Description: Integrates WordPress Gravity Forms with EspoCRM for client intake.
 *              Creates linked Company, Contact, and Engagement records on form submission.
 * Version:     1.0.0
 * Author:      Cleveland Business Mentors
 *
 * This is a must-use plugin (mu-plugin). It loads automatically and cannot be
 * deactivated through the WordPress admin interface.
 *
 * Required wp-config.php constants:
 *   CBM_ESPOCRM_URL     - Base URL of the EspoCRM instance (no trailing slash)
 *   CBM_ESPOCRM_API_KEY - API key for the wordpress-integration API user
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'CBM_ESPOCRM_PLUGIN_DIR', __DIR__ . '/cbm-espocrm-integration' );

require_once CBM_ESPOCRM_PLUGIN_DIR . '/includes/naics-data.php';
require_once CBM_ESPOCRM_PLUGIN_DIR . '/includes/class-espocrm-api-client.php';
require_once CBM_ESPOCRM_PLUGIN_DIR . '/includes/class-client-intake-handler.php';
