<?php
/**
 * @majority-jugdment-plugin
 * Plugin Name:       Majority Jugdment
 * Plugin URI:        https://github.com/MieuxVoter/mv-wordpress
 * Description:       Visualize the results of a majority jugment vote .
 * Version:           0.0.1
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Pierre-Louis Guhur (Mieux Voter)
 * Author URI:        https://mieuxvoter.fr
 * License:           MIT
 */

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );


define( 'MJ_WIDGET_PATH', plugin_dir_path( __FILE__ ) . '/widget' );
define( 'MJ_ASSET_MANIFEST', MJ_WIDGET_PATH . '/build/asset-manifest.json' );
define( 'MJ_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );

require_once( MJ_INCLUDES . '/enqueue.php' );
require_once( MJ_INCLUDES . '/shortcode.php' );

