<?php
	// CONNECT TO DATABASE
	$dbhost = "localhost";
	$dbuser = "wc_admin";
	$dbpass = "c5GTptLjPsQWR8bb";
	$dbname = "widget_corp";
	
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	
	if(mysqli_connect_errno()) {
		die("Database connection failed: " . mysqli_connect_errno() . ")");
	}
?>

<?php
	// Often these are form values in $_POST
	$menu_name = "Today's Widget Trivia";
	$position = (int) 4;
	$visible = (int) 1;
	
	// Escape all strings
	$menu_name = mysqli_real_escape_string($connection, $menu_name);
	
	// PERFORM DATABASE QUERY
	$query = "INSERT INTO subjects (";
	$query .= " menu_name, position, visible";
	$query .= ") VALUES (";
	$query .= " '{$menu_name}', {$position}, {$visible}";
	$query .= ")";
	
	
	
	$result = mysqli_query($connection, $query);
	
	//TEST IF QUERY HAD ERRORS
	if ($result) {
		// Success!
		echo "Success!";
	} else {
		// Failure!
		die("Database query failed. " . mysqli_error($connection));
	}
	
	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
	<title>Databases Insert</title>
</head>
<body>
	
</body>
</html>


<?php
	//CLOSE DATABASE CONNECTION
	mysqli_close($connection);
?>