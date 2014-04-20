<?php
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
	// perform the Database query
	$query = "SELECT * ";
	$query .= "FROM subjects ";
	$query .= "WHERE visible = 1 ";
	$query .= "ORDER BY position ASC";
	
	
	
	$result = mysqli_query($connection, $query);
	
	//Test if there was a query error
	if (!result) {
		die("Database query failed.");
	}
	
	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
	<title>Database</title>
</head>
<body>
	<ul>
		<?php
			while($subject = mysqli_fetch_assoc($result)) {
			?>
			<li><?php echo $subject["menu_name"] . " (" . $subject["id"] . ")"; ?></li>
		<?php
			}
		?>
	</ul>
		
		<?php mysqli_free_result($result);?>
		
</body>
</html>

<?php mysqli_close($connection);?>