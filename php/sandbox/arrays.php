<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
	<title>Arrays</title>
</head>
<body>
	<?php
		$numbers = array(4,8,15,16,23,42);
		echo $numbers[0];
	?>
	<br>
	
	<?php $mixed = array(6, "fox", "dog", array("x", "y", "z"));?>
	<?php echo $mixed[2]; ?><br>
	<?php $mixed[4] = "Mouse"; ?><br>
	
	<pre>
		<?php echo print_r($mixed);?><br>
	</pre>
	
	<?php echo $mixed[3][2]; ?><br>
	
	$array = [1,2,3];
	
</body>
</html>
