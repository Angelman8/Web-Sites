<?php

	/**
	 * @package		WordPress Plugin
	 * @subpackage	Global Hide Admin Tool Bar
	 * @indentation	//www.gnu.org/prep/standards/standards.html
	 * @license		//www.gnu.org/licenses/gpl-2.0.html
	 * @link		//wordpress.org/plugins/global-admin-bar-hide-or-remove/
	 */

	/**
	 * Uninstall Module
	 *
	 * @version	2014-04-16
	 * @author	sLa NGjI's @ slangji.wordpress.com
	 */

	if ( !defined( 'WP_UNINSTALL_PLUGIN' ) )
		exit();

	$option_names = array( 
			'global-admin-bar-plugin-setting',
			'global-admin-bar-plugin-user-setting',
			'global-admin-bar-roles',
			'global-admin-bar-profiles' 
	);

	if ( !is_multisite() )

		{

			foreach ( $option_names as $option_name )

				{

					delete_option( $option_name );

				}
		}

	else

		{

			global $wpdb;

			$blog_ids         = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );
			$original_blog_id = get_current_blog_id();

			foreach ( $blog_ids as $blog_id )

				{

					switch_to_blog( $blog_id );

					foreach ( $option_names as $option_name )

						{

							delete_site_option( $option_name );

						}

				}

			switch_to_blog( $original_blog_id );

		}

?>