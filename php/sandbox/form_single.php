<?php
	if (isset($_POST['submit'])) {
		//form was submitted
		$username = $_POST["username"];	
		$password = $_POST["password"];	
		$message = "Logging in {$username}...";
	} else {
		$message = "Please Log in.";
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
	<title>Form</title>
</head>
<body>
	
	<?php echo "{$message}"?><br><br>
	
	<form action="form_single.php" method="post">
		Username: <input type="text" name="username" value=""><br>
		Password: <input type="password" name="password" value=""><br>
		<br>
		<input type="submit" name="submit" value="Submit">
	</form>
		
</body>
</html>
