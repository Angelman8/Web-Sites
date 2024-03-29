<?php
/*
Plugin Name: CSS & JavaScript Toolbox
Plugin URI: http://css-javascript-toolbox.com/css-javascript-toolbox-free
Description: CJT Plugin for WordPress to easily add custom CSS and JavaScript to individual pages
Version: 6.1.5
Author: Wipeout Media 
Author URI: http://css-javascript-toolbox.com/
License:

Copyright (c) 2011, Wipeout Media.
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/** * */
define('CJTOOLBOX_PLUGIN_BASE', basename(dirname(__FILE__)) . '/' . basename(__FILE__));

/** * */
define('CJTOOLBOX_PLUGIN_FILE', __FILE__);

/** CJT Name */
define('CJTOOLBOX_NAME', plugin_basename(dirname(__FILE__)));

/** CJT Text Domain used for localize texts */
define('CJTOOLBOX_TEXT_DOMAIN', CJTOOLBOX_NAME);  

/**  */
define('CJTOOLBOX_LANGUAGES', CJTOOLBOX_NAME . '/locals/languages/');

/** CJT Absoulte path */
define('CJTOOLBOX_PATH', dirname(__FILE__));

/** Dont use!! @deprecated */
define('CJTOOLBOX_INCLUDE_PATH', CJTOOLBOX_PATH . '/framework'); 

/** Access Points  path */
define('CJTOOLBOX_ACCESS_POINTS', CJTOOLBOX_PATH . '/access.points');

/** Frmaework path */
define('CJTOOLBOX_FRAMEWORK', CJTOOLBOX_INCLUDE_PATH); // Alias to include path!

// Class Autoload Added @since 6.2.
require 'autoload.inc.php';

// Import dependencies
require_once CJTOOLBOX_FRAMEWORK . '/php/includes.class.php';
require_once CJTOOLBOX_FRAMEWORK . '/events/definition.class.php';
require_once CJTOOLBOX_FRAMEWORK . '/events/events.class.php';
require_once CJTOOLBOX_FRAMEWORK . '/events/wordpress.class.php';
require_once CJTOOLBOX_FRAMEWORK . '/events/hookable.interface.php';
require_once CJTOOLBOX_FRAMEWORK . '/events/hookable.class.php';

// Initialize events engine/system!
CJTWordpressEvents::__init(array('hookType' => CJTWordpressEvents::HOOK_ACTION));
CJTWordpressEvents::$paths['subjects']['core'] = CJTOOLBOX_FRAMEWORK . '/events/subjects';
CJTWordpressEvents::$paths['observers']['core'] = CJTOOLBOX_FRAMEWORK . '/events/observers';

/**
* CJT Plugin interface.
* 
* The CJT Plugin is maximum deferred.
* All functionality here is just to detect if the request should be processed!
* 
* The main class is located css-js-toolbox.class.php cssJSToolbox class
* The plugin is fully developed using Model-View-Controller design pattern.
* 
* access.points directory has all the entry points that processed by the Plugin.
* 
* @package CJT
* @author Ahmed Said
* @version 6
*/
class CJTPlugin extends CJTHookableClass {

	/**
	* 
	*/
	const DB_VERSION = '1.1-CE';
		
	/**
	* 
	*/
	const Edition = 'free';
	
	/**
	* 
	*/
	const FW_Version = '2.0';

	/**
	* 
	*/
	const VERSION = '6.1.5 CE';
	
	/**
	* 
	*/
	const DB_VERSION_OPTION_NAME = 'cjtoolbox_db_version';

	/**
	* 
	*/
	const PLUGIN_REQUEST_ID = 'cjtoolbox';
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $accessPoints;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $extensions;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $installed;
	
	/**
	* put your comment there...
	* 
	* @var CJTPlugin
	*/
	protected static $instance;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $mainAC;
	
	/**
	* put your comment there...
	* 	
	* @var mixed
	*/
	protected $onloaddbversion = array('parameters' => array('dbVersion'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onimportbasefile = array('parameters' => array('file'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onimportcontroller = array('parameters' => array('file'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onimportmodel  = array('parameters' => array('file'));
	
	/**
	* put your comment there...
	* 
	*/
	protected function __construct() {
		// Hookable!
		parent::__construct();
		// Allow access points to utilize from CJTPlugin functionality
		// even if the call is recursive inside getInstance/construct methods!!!
		self::$instance = $this; 
		// Read vars!
		$dbVersion = $this->onloaddbversion(get_option(self::DB_VERSION_OPTION_NAME));
		$this->installed = (($dbVersion) == self::DB_VERSION);
		// Load plugin and all installed extensions!.
		$this->load();
		$this->loadExtensions();
		// Run MAIN access point!
		$this->main();
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function extensions() {
		return $this->extensions;	
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function getAccessPoint($name) {
		return $this->accessPoints[$name];
	}
	
	/**
	* put your comment there...
	* 
	*/
	public static function getInstance() {
		if (!self::$instance) {
			self::$instance = new CJTPlugin();
		}
		return self::$instance;
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function isInstalled() {
		return $this->installed;	
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function listen() {
		// For now we've only admin access points! Future versions might has something changed!
		if (is_admin()) {
			// Import access points core classes.
			require_once 'framework/access-points/page.class.php';
			require_once 'framework/access-points/directory-spider.class.php';
			// Get access points!
			$accessPoints = CJTAccessPointsDirectorySpider::getInstance('CJT', CJTOOLBOX_ACCESS_POINTS);
			// For every access point create instance and LISTEN to the request!
			foreach ($accessPoints as $name => $info) {
				/**
				* @var CJTAccessPoint
				*/
				$this->accessPoints[$name] = $point = $accessPoints->point()->listen();
				// We need to do some work with there is a connected access point.
				$point->onconnected = array(&$this, 'onconnected');
			}
		}
		// Chaining!
		return $this;
	}
	
	/**
	* put your comment there...
	* 
	*/
	protected function load() {
		// Bootstrap the Plugin!
		require_once $this->onimportbasefile('css-js-toolbox.class.php');
		cssJSToolbox::getInstance();
		// Load MVC framework core!
		require_once $this->onimportmodel(CJTOOLBOX_MVC_FRAMEWOK . '/model.inc.php');
		require_once $this->onimportcontroller(CJTOOLBOX_MVC_FRAMEWOK . '/controller.inc.php');
		// Chaining!
		return $this;
	}
	
	/**
	* put your comment there...
	* 
	*/
	protected function loadExtensions() {
		// Load extensions lib!
		require_once 'framework/extensions/extensions.class.php';
		$this->extensions = new CJTExtensions();
		// Load all extensions!
		$this->extensions->load();
		// Chaining!
		return $this;
	}
	
	/**
	* Run MAIN access point!
	* 
	* @return $this
	*/
	protected function main() {
		// Access point base class is a dependency!
		require_once 'framework/access-points/access-point.class.php';
		// Run Main Acces Point!
		include_once 'access.points/main.accesspoint.php';
		$this->mainAC = new CJTMainAccessPoint();
		$this->mainAC->listen();
	}
	
	/**
	* Called When any In-Listen-State (ILS) Access point is 
	* connected (called by Wordpress hooking system).
	* 
	* @return boolean TRUE.
	*/
	public function onconnected($observer, $state) {
		// In all cases that we'll process the request load the localization file.
		load_plugin_textdomain(CJTOOLBOX_TEXT_DOMAIN, false, CJTOOLBOX_LANGUAGES);
		// Always connet  the access point!
		return $state;
	}
	
}// End Class

// Initialize events!
CJTPlugin::define('CJTPlugin', array('hookType' => CJTWordpressEvents::HOOK_FILTER));

// Let's Go!
CJTPlugin::getInstance();