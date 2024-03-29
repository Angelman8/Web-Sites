<?php
/**
* 
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* 
*/
class CJTSetupActivationFormView extends CJTView {
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $cjtWebSite;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $component;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $license;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $securityToken;
	
	/**
	* put your comment there...
	* 
	* @param mixed $info
	* @return CJTInstallerNoticeView
	*/
	public function __construct($info) {
		// CJTView class!
		parent::__construct($info);
		// Enqueue Styles & Scripts.
		add_action('admin_print_styles', array(__CLASS__, 'enququeStyles'));
		add_action('admin_print_scripts', array(__CLASS__, 'enqueueScripts'));
	}
	
	/**
	* put your comment there...
	* 
	* @param mixed $tpl
	*/
	public function display($tpl = null) {
		// Initialize.
		$model =& $this->model;
		// Set vars!
		$this->securityToken = cssJSToolbox::getSecurityToken();
		$this->component = $this->getRequestParameter('component');
		$this->cjtWebSite = cssJSToolbox::getCJTWebSiteURL();
		$this->license = $model->getStateStruct($this->component, 'license');
		// Display view.
		echo $this->getTemplate($tpl);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public static function enqueueScripts() {
		// Use related scripts.
		self::useScripts(__CLASS__, 
			'jquery',
			'jquery-serialize-object',
			'thickbox',
			'framework:js:ui:{CJT-}jquery.link-progress',
			'framework:js:ajax:{CJT-}cjt-server',
			'framework:js:misc:{CJT-}simple-error-dialog',
			'views:setup:activation-form:public:js:{CJTSetupActivationFormView-}default'
		);
	}

	/**
	* Output CSS files required to Add-New-Block view.
	* 
	* @return void
	*/
	public static function enququeStyles() {
		// Use related styles.
		self::useStyles(__CLASS__,
			'thickbox',
			'framework:css:{CJT-}error-dialog',
			'framework:css:{CJT-}forms',
			'views:setup:activation-form:public:css:{CJTSetupActivationFormView-}default'
		);
	}
	
} // End class.