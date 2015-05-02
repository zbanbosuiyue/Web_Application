<?php
	$serverName="localhost";
	$userName="root";
	$passWord="";
	$db="wordDictionary";
	$conn=mysql_connect($serverName, $userName, $passWord);	
	if (!$conn){
		die('Connection failed: '. $conn->connect_error);
	}
	
	$db_selected=mysql_select_db($db,$conn);
	if (!$db_selected){
		die('Can\'t use $db'.mysql_error());
	}
	
	$tableName="Movie";
	$sqlCreateTable="
	CREATE TABLE IF NOT EXISTS $tableName(
	id int AUTO_INCREMENT PRIMARY KEY,
	word varchar(30) not null,
	userAdd varchar(30),
	frequency int
	) AUTO_INCREMENT = 1";
	
	$result=mysql_query($sqlCreateTable);
	if(!$result){
		die('Invalid query: '.mysql_error()."</br>");	
	}
	
	$initWord= "Rong";
	$sqlInit=mysql_query("select word from Movie where word = '$initWord'");
	if (mysql_num_rows($sqlInit)<1){
		mysql_query("insert into Movie (word, userAdd, frequency) values('$initWord', 'admin',1)");
	}
?>