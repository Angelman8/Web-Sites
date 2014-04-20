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
	$id = 7;
	$menu_name = "Delete me";
	$position = 4;
	$visible = 1;
	
	// PERFORM DATABASE QUERY
	$query = "UPDATE subjects SET ";
	$query .= "menu_name = '{$menu_name}', ";
	$query .= "position = {$position}, ";
	$query .= "visible = {$visible} ";
	$query .= "WHERE id = {$id}";
	
	
	
	$result = mysqli_query($connection, $query);
	
	//TEST IF QUERY HAD ERRORS
	if ($result && mysqli_affected_rows($connection) == 1) {}
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