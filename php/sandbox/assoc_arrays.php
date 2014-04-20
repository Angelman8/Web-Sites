<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
	<title>Associative Arrays</title>
</head>
<body>
	<?php $assoc = array("first name" => "Galen", "last name" => "Budd");?>
	<?php echo $assoc["first name"];?><br>
	<?php echo $assoc["last name"];?><br>
	<?php $assoc["first name"] = "Larry";?>
	<?php echo $assoc["first name"] . " " . $assoc["last name"];?><br>
	
</body>
</html>
