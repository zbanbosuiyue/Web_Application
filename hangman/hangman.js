// the word is originalWord.
var wrongChar=[];
var count=0;
var helpCount=0;
var userInput;


//or we can use window.onload=clickBeginGame;
if(restartSign){
	$(document).ready(function() {
		clickBeginGame();
	});
}

$('#line3').ready(function(){
	for (i=0;i<26;i++){
		var chr=String.fromCharCode(65 + i);
		var newButton=document.createElement('button');
		newButton.id=chr;
		newButton.className='keyboard';
		newButton.innerHTML=chr;
		newButton.onclick=function(){
			userInput=this.id;
			clickKeyboard();
		};
		document.getElementById('line3').appendChild(newButton);
	}
});	

		
function clickBeginGame(){
	if (document.getElementById('beginGame')){
		var buttonBeginGame=document.getElementById('beginGame');
		buttonBeginGame.parentNode.removeChild(buttonBeginGame);
		document.getElementById('showWord').style.display="block";
	}

	
	for (i=0; i<originalWord.length;i++){
		var newTextBox=document.createElement('input');
		newTextBox.type="text";
		newTextBox.maxLength='1';
		newTextBox.style.width="15px";
		newTextBox.id=i;
		newTextBox.readOnly=true;
		document.getElementById('line2').appendChild(newTextBox);
	}
}

function clickKeyboard(){
	var currentCount=0;
	var correctCount=0;
	var leftChance='hangman'.length-wrongChar.length-1;
	originalWord=originalWord.toUpperCase();

	for (i=0; i<originalWord.length; i++){
		if(document.getElementById(i).value==originalWord[i]){
			correctCount++;
		}
	}
	

	if(wrongChar.length<'hangman'.length && correctCount<originalWord.length){
		document.getElementById(userInput).setAttribute="disabled";
		document.getElementById(userInput).style.background="#333";
		for (i=0; i<originalWord.length; i++){
			if(userInput==originalWord[i]){
				document.getElementById(userInput).style.background="#F00";
				currentCount++;
				
				correctCount=0;
				for (j=0; j<originalWord.length; j++){
					if(document.getElementById(j).value==originalWord[j]){
						correctCount++;
					}
				}
				
				document.getElementById(i).value=userInput;
				
				if (correctCount==originalWord.length-1) document.getElementById('showMessage').innerHTML='Congradulation!! You Win.';
			}
		}
		

	
		if (currentCount==0){
			if(wrongChar.indexOf(userInput)==-1){
				wrongChar.push(userInput);
				document.getElementById('showMessage').innerHTML="You have "+ leftChance + " attempts left to win";
				if(wrongChar.length=='hangman'.length){
					document.getElementById('showMessage').innerHTML="Sorry. You loss. The word is <span>"+originalWord+"</span>" ;
				}
			}
		}
	} else if(correctCount==originalWord.length) document.getElementById('showMessage').innerHTML='Already Won. Haha.';
}

function clickAddWord(){
	if (count==0){
		var addNewDiv=document.createElement('div');
		addNewDiv.innerHTML="<form id='newWordForm' action='addWord.php' method='POST' ><input id='addNewWord' name='newWord' type='text'> <input id='submitNewWord' type='submit' value='Submit'></form>";
		document.getElementById('line6').appendChild(addNewDiv);
		count=1;
	}
}

function clickHelp(){
	if (wrongChar.length<'hangman'.length){
		
		var correctCount=0;
		for (i=0; i<originalWord.length; i++){
			if(document.getElementById(i).value==originalWord[i]){
				correctCount++;		
			}
		}
		if (correctCount<originalWord.length)
		{
			if (helpCount < 3){
				if(helpCount<2) document.getElementById('showMessage').innerHTML="Only " + (2-helpCount) + " times help.";
				else document.getElementById('showMessage').innerHTML="Sorry, no more help";
				var emptyBox=[];
				for (i=0; i<originalWord.length; i++){
					if (document.getElementById(i).value.length==0){
						emptyBox.push(i);
					}
				}
	

				var randomHelp=emptyBox[Math.floor(Math.random() * emptyBox.length)];
				for (i=0; i<originalWord.length;i++){
					if (originalWord[randomHelp]==originalWord[i]){
						document.getElementById(i).value=originalWord[i];
					}
				}
	
				helpCount=helpCount+1;
			} else document.getElementById('showMessage').innerHTML='Sorry. Too Many Help Already.';
		
			if(correctCount==originalWord.length-1) document.getElementById('showMessage').innerHTML='Congradulation!! You Win.';
		
		} else document.getElementById('showMessage').innerHTML='Already Won. Haha.';
	}
}



