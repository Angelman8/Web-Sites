<?php
/*
Plugin Name: Cyclone Slider 2
Plugin URI: http://www.codefleet.net/cyclone-slider-pro/
Description: Create and manage sliders with ease. Built for both casual users and developers.
Version: 2.7.7
Author: Nico Amarilla
Author URI: http://www.codefleet.net/
License:

  Copyright 2013 (kosinix@codefleet.net)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as 
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
  
*/
if(!defined('CYCLONE_VERSION')){
    define('CYCLONE_VERSION', '2.7.7' );
}
if(!defined('CYCLONE_PATH')){
    define('CYCLONE_PATH', realpath(plugin_dir_path(__FILE__)) . DIRECTORY_SEPARATOR );
}
if(!defined('CYCLONE_URL')){
    define('CYCLONE_URL', plugin_dir_url(__FILE__) );
}
if(!defined('CYCLONE_DEBUG')){
    define('CYCLONE_DEBUG', false );
}

// Include common classes
require_once(CYCLONE_PATH.'classes/codefleet/class-codefleet-view.php');
require_once(CYCLONE_PATH.'classes/codefleet/class-codefleet-admin-page.php');
require_once(CYCLONE_PATH.'classes/codefleet/class-codefleet-admin-sub-page.php');
require_once(CYCLONE_PATH.'classes/codefleet/class-codefleet-settings-page.php');
require_once(CYCLONE_PATH.'classes/codefleet/class-codefleet-settings-sub-page.php');

require_once(CYCLONE_PATH.'classes/class-cyclone-slider-exporter.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-importer.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-settings-page.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-export-page.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-import-page.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-data.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-youtube.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-vimeo.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-admin.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-widget.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-scripts.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-templates-manager.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-image-editor.php');
require_once(CYCLONE_PATH.'classes/class-cyclone-slider-image-resizer.php');
require_once(CYCLONE_PATH.'classes/class-image-resizer.php');
require_once(CYCLONE_PATH.'classes/class-nextgen-integration.php');
require_once(CYCLONE_PATH.'inc/functions.php');

$cyclone_slider_saved_done = false; //Global variable to limit save_post execution to only once

// Store the plugin instance to a global object so that other plugins can use remove_action and remove_filter
// Inject dependencies here
$codefleet_view = new Codefleet_View();

$cyclone_slider_image_resizer = new Cyclone_Slider_Image_Resizer();

$cyclone_slider_data = new Cyclone_Slider_Data( $cyclone_slider_image_resizer );

$cyclone_slider_nextgen_integration = new Nextgen_Integration( $cyclone_slider_data );

$cyclone_slider_exporter = new Cyclone_Slider_Exporter( $cyclone_slider_data );

$cyclone_slider_importer = new Cyclone_Slider_Importer( $cyclone_slider_data );

$cyclone_slider_templates_manager = new Cyclone_Templates_Manager();

// Add directories to get templates
$cyclone_slider_templates_manager->add_template_location(
    array(
        'path'=>CYCLONE_PATH.'templates/', // This resides in the plugin
        'url'=>CYCLONE_URL.'templates/'
    )
);
$cyclone_slider_templates_manager->add_template_location(
    array(
        'path'=> realpath(get_stylesheet_directory()).DIRECTORY_SEPARATOR.'cycloneslider'.DIRECTORY_SEPARATOR,// This resides in the current theme or child theme
        'url'=> get_stylesheet_directory_uri()."/cycloneslider/"
    )
);

$cyclone_slider_settings_page = new Cyclone_Slider_Settings_Page( $codefleet_view, $cyclone_slider_templates_manager );
$cyclone_slider_settings_page->set_option_group('cyclone_option_group');
$cyclone_slider_settings_page->set_option_name('cyclone_option_name');
$cyclone_slider_settings_page->set_parent_slug('edit.php?post_type=cycloneslider');
$cyclone_slider_settings_page->set_menu_slug('cycloneslider-settings');

$cyclone_slider_youtube = new Cyclone_Slider_Youtube();
$cyclone_slider_vimeo = new Cyclone_Slider_Vimeo();

$cyclone_slider_scripts = new Cyclone_Slider_Scripts( $cyclone_slider_templates_manager, $cyclone_slider_settings_page->get_settings_data() );

$cyclone_slider_admin = new Cyclone_Slider_Admin( $codefleet_view, $cyclone_slider_scripts, $cyclone_slider_templates_manager, $cyclone_slider_data, $cyclone_slider_settings_page->get_settings_data() );

$cyclone_slider_plugin_instance = new Cyclone_Slider( $cyclone_slider_scripts, $cyclone_slider_data, $codefleet_view, $cyclone_slider_templates_manager, $cyclone_slider_youtube, $cyclone_slider_vimeo );

// Load domain in this hook to work with WPML
add_action('plugins_loaded', 'cycloneslider_plugin_init');
function cycloneslider_plugin_init() {
    global $cyclone_slider_settings_page;
    
    load_plugin_textdomain( 'cycloneslider', false, 'cyclone-slider-2/lang' );
    
    // These strings should be here for translation to work
    $cyclone_slider_settings_page->set_page_title( __('Cyclone Slider Settings', 'cycloneslider') );
    $cyclone_slider_settings_page->set_menu_title( __('Settings', 'cycloneslider') );
    $cyclone_slider_settings_page->show();
    
}
