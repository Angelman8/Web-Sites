<?php
/**
* 
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* 
*/
class CJTV10CEUpgrade {
	
	/**
	* put your comment there...
	* 
	*/
	public function database() {
		// Upgrade database tables.
		cssJSToolbox::import('framework:installer:dbfile.class.php');
		CJTDBFileInstaller::getInstance(cssJSToolbox::resolvePath('includes:installer:upgrade:1.0-CE:db:mysql:structure.sql'))->exec();
		// Chaining.
		return $this;
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function finalize() {
		// Upgrade database internal version number using
		// installer class.
		cssJSToolbox::import('includes:installer:installer:installer.class.php');
		CJTInstaller::getInstance()->finalize();
		// Chaining.
		return $this;
	}
	
	/**
	* put your comment there...
	* 
	*/
	public static function getInstance() {
		return new CJTV10CEUpgrade();
	}
	
} // End class.