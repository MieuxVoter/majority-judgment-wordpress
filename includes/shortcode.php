<?php
// This file enqueues a shortcode.

defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );


add_shortcode( 'mj_example', function( $atts ) {
  $default_atts = array( 'color' => 'black' );
  $args = shortcode_atts( $default_atts, $atts );
  $uniqid = uniqid('id');

  global $current_user;
  $display_name = $current_user ? $current_user->display_name : 'World';

  ob_start(); ?>
  <script>
  window.erwSettings = window.erwSettings || {};
  window.erwSettings["<?= $uniqid ?>"] = {
    'color': '<?= $args["color"] ?>',
    'name': '<?= $display_name ?>',
  }
  </script>
  <div class="erw-root" data-id="<?= $uniqid ?>"></div>

  <?php
  return ob_get_clean();
});


add_shortcode( 'mj_result', function( $atts ) {
	$default_atts = [
		'name' => 'Candidate name',
		'rank' => '2',
    'grades' => '1;1;1;1;1'
	];
  $args = shortcode_atts( $default_atts, $atts );
  $uniqid = uniqid('id');

   ob_start(); ?>
  <script>
  window.mjSettings = window.mjSettings || {};
  window.mjSettings["<?= $uniqid ?>"] = {
    'name': '<?= $args["name"] ?>',
    'grades': '<?= $args['grades'] ?>',
    'rank': '<?= $args['rank'] ?>',
  }
  </script>

  <div class="mj-root" data-id="<?= $uniqid ?>"></div>

  <?php
  return ob_get_clean();
});

