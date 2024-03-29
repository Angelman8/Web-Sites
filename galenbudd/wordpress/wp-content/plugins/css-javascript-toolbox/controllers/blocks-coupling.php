<?php
/**
* @version $ Id; blocks-coupling.php 21-03-2012 03:22:10 Ahmed Said $
*/
		
// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* Applying Code blocks for the curren request.
* 
* This controller is always loaded.
* 
* The class resposibility is to output the code blocks
* tha associated with current request.
* 
* @author Ahmed Said
* @version 6
*/
class CJTBlocksCouplingController extends CJTController {
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $blocks = array(
		'code' => array('header' => '', 'footer' => ''),
		'scripts' => array('header' => array(), 'footer' => array()),
	);
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $controllerInfo = array('model' => 'coupling');
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $filters = null;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $hasRun = false;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected static $instance = null;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	private $onActionIds = array();
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onassigncouplingcallback = array('parameters' => array('callback'));

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onappendcode = array('parameters' => array('code'));
		
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $oncancelmatching  = array('parameters' => array('matched'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $ondefaultfilters = array('parameters' => array('filters'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $ondo = array('parameters' => array('data', 'method', 'condition'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onblocksorder = array('parameters' => array('order'));

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $ongetblocks = array('parameters' => array('blocks'));

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $ongetcache = array('parameters' => array('cache'));

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $ongetfilters = array('parameters' => array('filters'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onmatchingurls  = array('parameters' => array('urls'));

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onnoblocks  = array('hookType' => CJTWordpressEvents::HOOK_ACTION);

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onoutput = array('parameters' => array('code', 'location'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onprocess  = array('hookType' => CJTWordpressEvents::HOOK_ACTION);

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onprocessblock  = array('parameters' => array('block'));
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $onsetfilters = array('parameters' => array('filters'));
	
	/**
	* Initialize controller object.
	* 
	* @see CJTController for more details
	* @return void
	*/
	public function __construct() {
		// Only one instance is allowed.
		if (self::$instance) {
			throw new Exception('Trying to instantiate multiple coupling instances!!');
		}
		// Hold the single instance we've!
		self::$instance = $this;
		$siteHook = cssJSToolbox::$config->core->siteHook;
		// Initialize controller.
		parent::__construct(false);
		// Import related libraries
		CJTModel::import('block');
		// Not default action needed.
		$this->defaultAction = null;
		// Initialize controller.
		$initCouplingCallback = $this->onassigncouplingcallback(array(&$this, 'initCoupling'));
		add_action('admin_init', $initCouplingCallback);
		add_action($siteHook->tag, $initCouplingCallback, $siteHook->priority);
		// Add Shortcode callbacks.
		add_shortcode('cjtoolbox', array(&$this, 'shortcode'));
	}
	
	/**
	* put your comment there...
	* 
	* @param mixed $id
	*/
	public function addOnActionIds($id) {
		// Add ID is not exists.
		if (!in_array($id, $this->onActionIds)) {
			$this->onActionIds[] = $id;	
		}
		// Chaining.
		return $this;
	}

	/**
	* put your comment there...
	* 
	*/
	public function getBlocks() {
		// Set request view filters used for querying database.
		$this->setRequestFilters();
		// Get blocks order. NOTE: This is all blocks order not only the queried/target blocks.
		$blocksOrder = array();
		$metaBoxesOrder = $this->onblocksorder($this->model->getOrder());
		// Get ORDER-INDEX <TO> BLOCK-ID mapping.
		preg_match_all('/cjtoolbox-(\d+)/', $metaBoxesOrder['normal'], $blocksOrder, PREG_SET_ORDER);
		// Prepare request URL to match against Links & Expressions.
		$linksRequestURL = self::getRequestURL();
		$expressionsRequestURL = "{$linksRequestURL}?{$_SERVER['QUERY_STRING']}";
		extract($this->onmatchingurls(compact('linksRequestURL', 'expressionsRequestURL')));
		// Get all blocks including (Links & Expressions Blocks).
		$blocks = $this->ongetblocks($this->model->getPinsBlocks(CJTBlockModel::PINS_LINK_EXPRESSION, 
																					$this->getFilters()->pinPoint, 
																					$this->getFilters()->customPins));
		if (empty($blocks)) {
			$this->onnoblocks();
		  return false;
		}
		// Import related libraries.
		cssJSToolbox::import('framework:php:evaluator:evaluator.inc.php');
		/**
		* Iterator over all blocks by using they order.
		* For each block get code and scripts.
		*/
		$this->onprocess();
		foreach ($blocksOrder as $blockOrder) {
			$blockId = (int) $blockOrder[1];
			// As mentioned above. Orders is for all blocks not just those queried from db.
			if (isset($blocks[$blockId])) {
				$block = $this->onprocessblock($blocks[$blockId]);
				/**
				* Process Links & Expressions blocks.
				* For better performace check only those with links and expressions flags.
				*/
				if ($block->blocksGroup & CJTBlockModel::PINS_LINK_EXPRESSION) {
					/**
					* Initiliaze $matchedLink and $matchedExpression inside IF statment.
					* Those variables need to refresh state at each block.
					* If there is no link or expression flags, they will be FALSE.
					* Otherwise they'll get the correct value inside each statement.
					*/
					/// Check if there is a matched link.
					if ($matchedLink = ($block->blocksGroup & CJTBlockModel::PINS_LINKS)) {
						$links = explode("\n", trim($block->links));
						$matchedLink = in_array($linksRequestURL, $links);
					}
					/// Check if there is a matched expression.
					if ($matchedExpression = ($block->blocksGroup & CJTBlockModel::PINS_EXPRESSIONS)) {
						$expressions = explode("\n", $block->expressions);
						foreach ($expressions as $expression) {
							/// @TODO: Matches may be used later to evaulate variables inside code block.
							if($matchedExpression = @preg_match("/{$expression}/", $expressionsRequestURL)) {
							  break;
							}
						}
					}
					/**
					* Exclude Links & Expressions Blocks that doesn't has a match.
					* If there is no matched link or expression then exclude block.
					*/
					if ($this->oncancelmatching(!($matchedExpression || $matchedLink))) {
						continue;
					}
				}
				// For every location store blocks code into single string
				$evaluatedCode = CJTPHPCodeEvaluator::getInstance($block)->exec()->getOutput();
				/** @todo Include Debuging info only if we're in debuging mode! */
				if (1) {
					$evaluatedCode = "\n<!-- Block ({$blockId}) START-->\n{$evaluatedCode}\n<!-- Block ({$blockId}) END -->\n";
				}
				$this->blocks['code'][$block->location] .= $this->onappendcode($evaluatedCode);
				// Store all used Ids in the CORRECT ORDER.
				$this->addOnActionIds($blockId);
			}
		}
		// Return true if there is at least 1 block return within the set.
		return true;
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function getCached() {
		// Cache is not implemented yet might be supported by extenal Extensions!
		return $this->ongetcache(false);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function getFilters() {
		return $this->ongetfilters($this->filters);	
	}

	/**
	* put your comment there...
	* 
	*/
	public function getOnActionIds() {
		return $this->onActionIds;
	}

	/**
	* put your comment there...
	* 
	*/
	public static function getRequestURL() {
		// URL Protocol.
		$protocol = 'http' . ((isset($_SERVER["HTTPS"]) && ($_SERVER["HTTPS"] == "on")) ? 's' : '') . '://';
		// Host name & port.
		$host = $_SERVER['HTTP_HOST'];
		$port = ($_SERVER["SERVER_PORT"] != "80") ? ":{$_SERVER["SERVER_PORT"]}" : '';
		// Request URI.
		$requestURI = $_SERVER['REQUEST_URI'];
		// Final URL.
		$url = "{$protocol}{$host}{$port}{$requestURI}";
		return $url;
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function hasOnActionIds() {
		return !empty($this->onActionIds);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function initCoupling() {
		// For some reasons wp action is fired twice.
		// The wrong call won't has $wp_query object set,
		// but this is only valid at Front end.
		if (!is_admin() && !$GLOBALS['wp_query']) {
			return;
		}
		// Don't run twice!
		if (!$this->hasRun) {
			// Stop running it again!
			$this->hasRun = true;
			// Get cache or get blocks if not cached.
			// If there is no cache or no blocks for output
			// do nothing.
			if ($this->getCached() || $this->getBlocks()) {
				$actionsPrefix = is_admin() ? 'admin'	: 'wp';
				// Output blocks on various locations!
				add_action("{$actionsPrefix}_head", array(&$this, 'outputBlocks'), 30);
			  add_action("{$actionsPrefix}_footer", array(&$this, 'outputBlocks'), 30);
			}
		}
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function outputBlocks() {
		// Derived location name from wordpress filter name.
		$currentFilter = current_filter();
		// Map "wp hook location" to "block hook location".
		$locationsMap = array('head' => 'header', 'footer' => 'footer');
		// This hook is used across both ends, front and back ends.
		// Remove application prefix (wp_ or admin_).
		// Remining is head or footer.
		$location = str_replace(array('wp_', 'admin_'), '', $currentFilter);
		// Map to block location.
		$location = $locationsMap[$location];
		echo $this->onoutput($this->blocks['code'][$location], $location);
	}
	
	/**
	* put your comment there...
	* 
	*/
	protected function setRequestFilters() {
		// Get request blocks.
		$filters = $this->ondefaultfilters((object) array(
			'pinPoint' => 0x00000000,
			'customPins' => array(),
		));
		if (is_admin()) {
			// Include all backend blocks.
		  $filters->pinPoint |= CJTBlockModel::PINS_BACKEND;
		}
		else {
			$filters->pinPoint |= CJTBlockModel::PINS_FRONTEND;
			// Pages.
			if (is_page()) {
				// Blocks with ALL PAGES selected.
				$filters->pinPoint |= CJTBlockModel::PINS_PAGES_ALL_PAGES;
				// Blocks with PAGE-ID selected.
				$filters->customPins[] = array(
					'pin' => 'pages',
					'pins' => array($GLOBALS['post']->ID),
					'flag' => CJTBlockModel::PINS_PAGES_CUSTOM_PAGE,
				);
				// Blocks with FRONT-PAGE selected.
				if (is_front_page()) {
					$filters->pinPoint |= CJTBlockModel::PINS_PAGES_FRONT_PAGE;
				}
			} // End is_page()
			else if (is_attachment()) {
				$filters->pinPoint |= CJTBlockModel::PINS_ATTACHMENT;
			}
			// Posts.
			else if (is_single()) {
				// Blocks with ALL POSTS & ALL CATEGORIES selected.
				$filters->pinPoint |= CJTBlockModel::PINS_POSTS_ALL_POSTS | CJTBlockModel::PINS_CATEGORIES_ALL_CATEGORIES;
				// Blocks with POST-ID selected.
				$filters->customPins[] = array(
					'pin' => 'posts',
					'pins' => array($GLOBALS['post']->ID),
					'flag' => CJTBlockModel::PINS_POSTS_CUSTOM_POST,
				);
				// Include POST PARENT CATRGORIES blocks.				
				$parentCategoriesIds = wp_get_post_categories($GLOBALS['post']->ID, array('fields' => 'ids'));
				/**
				* Custom-Posts just added "ON THE RUN/FLY"
				* Need simple fix by confirming that the post is belong to
				* specific category or not.
				* Custom posts NOW unlike Posts, it doesn't inherit parent
				* taxonomis Code Blocks!!
				*/
				if (!empty($parentCategoriesIds)) {
					$filters->customPins[] = array(
						'pin' => 'categories',
						'pins' => $parentCategoriesIds,
						'flag' => CJTBlockModel::PINS_CATEGORIES_CUSTOM_CATEGORY,
					);
				}
				/** 
				* @TODO check for recent posts Based on user configuration.
				* Recent posts should be detcted by comparing
				* user condifguration with post date.
				*/
				if (0) {
				
				}
			} // End is_single()
			// Categories.
			else if(is_category()) {
				// Blocks with ALL CATEGORIES selected.
				$filters->pinPoint |= CJTBlockModel::PINS_CATEGORIES_ALL_CATEGORIES;
				// Blocks with CATEGORY-ID selected.
				$filters->customPins[] = array(
					'pin' => 'categories',
					'pins' => array(get_queried_object()->term_id),
					'flag' => CJTBlockModel::PINS_CATEGORIES_CUSTOM_CATEGORY,
				);				
			} // End is_category()
			// Blocks with BLOG-INDEX selected.
			else if (is_home()) {
				$filters->pinPoint |= CJTBlockModel::PINS_POSTS_BLOG_INDEX;
			}
			else if (is_search()) {
				$filters->pinPoint |= CJTBlockModel::PINS_SEARCH;
			}
			else if (is_tag()) {
				$filters->pinPoint |= CJTBlockModel::PINS_TAG;
			}
			else if (is_author()) {
				$filters->pinPoint |= CJTBlockModel::PINS_AUTHOR;
			}
			else if (is_archive()) {
				$filters->pinPoint |= CJTBlockModel::PINS_ARCHIVE;
			}
			else if (is_404()) {
				$filters->pinPoint |= CJTBlockModel::PINS_404_ERROR;
			}
		}
		$this->filters = $this->onsetfilters($filters);
	}
	
	/**
	* Wordpress do shortcode callback for
	* CJT Shortcodes ([cjtoolbox ....])! 
	* 
	* This method role is to load the shortcode routines
	* in order to handle the request.
	* 
	* It doesn't do anything except deferring the shortcode
	* codes from loaded until shortcode is really used!
	* 
	* @param mixed $attributes
	*/
	public function shortcode($attributes, $content) {
		// Instantiate Shortcode handler class.
		cssJSToolbox::import('controllers:coupling:shortcode:shortcode.php');
		$shortcode = new CJT_Controllers_Coupling_Shortcode($attributes, $content);
		// Return Shortcode replacement!
		return ((string) $shortcode);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public static function & theInstance() {
		return self::$instance;
	}
	
} // End class.

// Hookable!
CJTBlocksCouplingController::define('CJTBlocksCouplingController', array('hookType' => CJTWordpressEvents::HOOK_FILTER));