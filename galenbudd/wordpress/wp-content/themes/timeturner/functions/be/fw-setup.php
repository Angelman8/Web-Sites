<?php
/**
 * Framework setup.
 * @package TimeTurner
 * @since TimeTurner 1.0.0
*/

function timeturner_get_categories($parent) {	
	$timeturner_categories = get_categories();
	
	foreach ($timeturner_categories as $cat) {
		$categories[$cat->term_id] = $cat->name;
	} 
	return($categories);
}
		$categories = timeturner_get_categories(0);
		$categoriesParents = timeturner_get_categories(0);
		
	if (count($categories) > 0) {
	foreach ( $categories as $key => $value ) {
			$catids[] = $key;
			$catnames[] = $value;
	}
	}
	if (count($categoriesParents) > 0){
	foreach ( $categoriesParents as $key => $value ) {

		$catidsp[] = $key;
			$catnamesp[] = $value;
		}
} ?>