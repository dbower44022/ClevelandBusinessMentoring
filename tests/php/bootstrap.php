<?php
/**
 * PHPUnit bootstrap for CBM EspoCRM integration tests.
 *
 * Loads WordPress/GF stubs, then requires the plugin source files.
 */

// Load stubs that emulate WordPress and Gravity Forms functions.
require_once __DIR__ . '/wp-stubs.php';

// Plugin source directory.
$plugin_dir = dirname( __DIR__, 2 ) . '/wp-content/mu-plugins/cbm-espocrm-integration';

// Load plugin files in the same order as the bootstrap mu-plugin.
require_once $plugin_dir . '/includes/naics-data.php';
require_once $plugin_dir . '/includes/class-espocrm-api-client.php';
require_once $plugin_dir . '/includes/class-client-intake-handler.php';
