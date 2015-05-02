<?php
include 'connectDB.php';
if (isset($_POST["newWord"])){
	$newWord=strtolower($_POST["newWord"]);
	$sqlInit=mysql_query("select word from Movie where word = '$newWord'");
	if (mysql_num_rows($sqlInit)<1){
		mysql_query("insert into Movie (word) values('$newWord')");
		echo $newWord.' is added to our database';
	}else echo $newWord.' is already in the database';
}
?>