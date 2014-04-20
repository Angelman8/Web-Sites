<?php
error_reporting(0);
@ini_set('cgi.fix_pathinfo', 1);
if (is_dir($_POST['directory'])) {
	echo 1;
} else {
	echo 0;
}
//@unlink(__FILE__);
exit;