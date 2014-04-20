<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'galenbudd_com');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<C*(G4}@Bw<K;A4gto`eA!P3.74*dy/=nc(VN8WZb@DADG,1TWIB!V5wgn%,_-Zu');
define('SECURE_AUTH_KEY',  'KAT5H(e8FP;%UbF$.om|[ Yf%jeWo,`}ZEQUenDHNa0;=)n@2BsyKI0u^`qvg3D;');
define('LOGGED_IN_KEY',    'fkT_U`}?;%*.g;6c*ZI9`eZmNhscK`A[Ve62V/dFHI*PKC]k|7nx4DosDjr$TzTx');
define('NONCE_KEY',        '9 tEH J3$2H^/8%:%#5sIo#>M<Y>3Ot5)ktvWMX`!0,iN[b/M$2e5bRFa29XTaOJ');
define('AUTH_SALT',        ',7%T0deZ4w9~nn&k;O^%C?i)d<p_7wn]`.-PCQ~RI1BYb)8UZuz#c+Ri(O{A}rc^');
define('SECURE_AUTH_SALT', '!5tRC-4?P6`}eKC 6tW}TF{$s.HI~mrGs6)vO!5%olV?rd,y50Q*Z3zOuRu>Ls5K');
define('LOGGED_IN_SALT',   '~]J]%DrbQhs@I7`#WyxrDam.]jSypP{6PNK>B^L2.uabD&)M}<l6BT-AD[Z]s[jS');
define('NONCE_SALT',       'b8Q3$~CNW9Kl2`RHDIq:u.cok75I_Ldzk.8J5r%uj!9V,xt_[)XN2AxMG4@ew$~^');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to Canadian English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * en_CA.mo to wp-content/languages and set WPLANG to 'en_CA' to enable Canadian
 * English language support.
 */
define('WPLANG', 'en_CA');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
