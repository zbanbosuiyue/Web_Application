<?php
include 'connectDB.php';
$result=mysql_query("select * from movie;");
if(!$result){
	die('Invalid query: '.mysql_error()."</br>");	
}
if (mysql_num_rows($result) == 0) {
    echo "No rows found, nothing to print so am exiting";
    exit;
}
$randomNum=rand(0,mysql_num_rows($result)-1);
$words=array();
while ($row = mysql_fetch_assoc($result)) {
	array_push($words,$row["word"]);
}

// Generate the word from the database
$randomWord=$words[$randomNum];
$new=0;
$restartSign=false;
if(isset($_GET['new'])){
	$new=$_GET['new']; 
	$restartSign=true;
}

?>
<html>
<head>
<link rel="stylesheet" href="hangman.css">
</head>
<script>
var originalWord = '<?php echo $randomWord;?>';
var restartSign= '<?php echo $restartSign; ?>';
</script>

<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="hangman.js"></script>
<body>
<table id="table1" cellpadding="0" cellspacing="0" height="100%" width="100%" border="0">
	<tr>
		<td valign="middle" align="center">
			<?php if($new!=1){
				echo "<button id='beginGame' onclick='clickBeginGame()'>Play Game</button>";
			}
			?>
			<div id="showWord"<?php if($new==1){ echo " style='display: block'";  } ?>>
				<table cellspacing="0" cellpadding="10" border="0">
					<tr>
						<td id="line1" align="center" ><button id="help" onclick='clickHelp()'>Help</button></td>
					</tr>
					<tr>
						<td id="line2" align="center"></td>
					</tr>
					<tr>
						<td id="line3" align="center"></td>
					</tr>
					<tr>
						<td id="line4" align="center"><p id='showMessage'>You have 7 attempts left to win</p></td>
					</tr>					
					<tr>
						<td id="line5" align="center"><button id="restart" onclick="window.location='index.php?new=1'">Start A New Game</button></td>
					</tr>
					<tr>
						<td id="line6" align="center"><a id="addNewWord" href="javascript:clickAddWord()">Add Your Words</a></td>	
					</tr>

				</table>
			</div>
			
		</td>
	</tr>
</table>
</body>
</html>
