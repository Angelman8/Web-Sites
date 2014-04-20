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

define('DB_NAME', 'galenbud_wor2');



/** MySQL database username */

define('DB_USER', 'galenbud_wor2');



/** MySQL database password */

define('DB_PASSWORD', 'olm6H4kK8nJ');



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

define('AUTH_KEY',         'cK9b hB8/_`||uP+|:COJ0LFep7 k!- V,jN0Z Y(~#xUN#kO~zaFbij.]9~F1I|');

define('SECURE_AUTH_KEY',  '2anQ>vu~Hm5HRp}b>z#(4]yl4={A?7/xC0x8I=g%~>6WfOurI`#K+%).,:acGdg-');

define('LOGGED_IN_KEY',    'AMSXONfLCwb/Y,ig0XuxBs)4%B9obCtSD-B6GYsMeb_AO_)4 B*~WOR=ZFJJP$+D');

define('NONCE_KEY',        'Z]OFG?-gt~ir/&PQlN>~Cx9D(*b1g.kFh:WF8C[|{7pFT9+O_c|8>-_&85j<]U{Z');

define('AUTH_SALT',        'csB(r~0A0beu_+eHKkjRCS;yP@{<8-#%z}GBXh=6Zf/v_C!s8$j1NTK/X3]$+`h(');

define('SECURE_AUTH_SALT', 'E%=LXU-B6-aKGAyM9+foPec+k-T5}0a?_Ulc[U5u$=9XhcZ}pl gGBL|+o,450BD');

define('LOGGED_IN_SALT',   'l0;QKBCm|:-kx9`E ^jX^?7Rk55i9 p&s^qH8!q^RPAzp33|w1|&#z<vvut-oLg^');

define('NONCE_SALT',       'b- 40n)]0HRBc+-j!QKLYY6:xmdad6;+gY(m*hRQ7=ur#p?>_DeJdO0X{q|d,b8d');



/**#@-*/



/**

 * WordPress Database Table prefix.

 *

 * You can have multiple installations in one database if you give each a unique

 * prefix. Only numbers, letters, and underscores please!

 */

$table_prefix  = 'wrd_';



/**

 * WordPress Localized Language, defaults to English.

 *

 * Change this to localize WordPress. A corresponding MO file for the chosen

 * language must be installed to wp-content/languages. For example, install

 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German

 * language support.

 */

define('WPLANG', '');



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

