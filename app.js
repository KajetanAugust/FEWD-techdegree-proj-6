
//VARIABLES

let missed = 0;
const keyboard = document.getElementById('qwerty');
const qwertyLetters = document.getElementsByTagName('button');
let phrase = document.getElementById('phrase');
let letterFound = 'null';
const hearts = document.querySelectorAll('.tries');
const startButton = document.querySelector('#overlay a'); // the start button is selected
const startScreen = document.getElementById('overlay'); // the start screen overlay is selected
const header = document.querySelector('h2');
const letters = document.getElementsByClassName('letter');
let guesses = document.getElementsByClassName('show');
startButton.style.fontFamily = "'Open Sans', sans-serif";
const ul = document.querySelector('#phrase ul');

// ARRAY OF PHRASES

const phrases = [
    'right out of the gate',
    'raining cats and dogs',
    'shot in the dark',
    'under the weather',
    'go for broke',
    'quick and dirty',
    'greased lightning',
    'in a pickle',
    'keep your shirt on',
    'back to square one'
];

//RANDOM PHRASE GENERATOR

function randomPhrase() {
    const highest = (phrases.length); // Const contains the highest number for draw
    const draw = Math.floor( Math.random() * highest); // Math.random draws the random number from 0 to const highest
    return phrases[draw]; // the array item is returned
}

//CREATING ARRAY OF LETTERS

function getRandomPhraseAsArray(){
    const arrayOfLetters = randomPhrase().split(''); // the phrase chosen in randomPhrase function is split to array of letters
    return arrayOfLetters; // array of letters is returned
}

//PHRASE TO DISPLAY

function addPhraseToDisplay() {
    const phraseToProcess = getRandomPhraseAsArray() // getRandomPhraseAsArray function is called and assigned to the const
for(let i = 0; i < phraseToProcess.length; i++)  { 
    const li = document.createElement('li');
    li.textContent = phraseToProcess[i];
    ul.appendChild(li);
}
};
addPhraseToDisplay();

// ADDING CLASSES

let phraseLi = document.querySelectorAll('ul li'); // li elements are selected
for (let i = 0; i < phraseLi.length; i ++ ){ // for loop loops through the li elements
    if(phraseLi[i].textContent !== ' '){ // if statement checks if textContent of li elements is not a space
        phraseLi[i].className = 'letter'; // if textContent is not a space it gets the class 'letter'
    } else {
        phraseLi[i].className = 'space'; // if textContent is a space it gets the class space
    }
}

// CHECK LETTER FUNCTION
            
function checkLetter() {
    letterFound = false;
    let key = event.target.textContent;
  
    for (let i = 0; i < phraseLi.length; i ++ ){ //for loop loops through the li elements of random phrase choosen earlier
        if(phraseLi[i].textContent.toLowerCase() === (event.target.textContent)){ //if statement compares clicked button to every letter in the phrase 
            phraseLi[i].className = 'letter show'; //if the match is found letter gets the class of .show
            event.target.setAttribute('class', 'chosen'); //the pressed button gets the class of chosen
            event.target.setAttribute('disabled', ''); //and the button is disabled
            letterFound = event.target.textContent; //letterFound variable gets value of event.target.textContent
        }
        
        if(phraseLi[i].textContent.toLowerCase() !== (event.target.textContent)){ //if the match is not found
            event.target.setAttribute('class', 'chosen'); //the pressed button gets the class of chosen
            event.target.setAttribute('disabled', ''); // and the button is disabled
        }
    }
}

//CHECK WIN FUNCTION

function checkWin() {
    if(missed === 5){   // if the all hearts are lost the you loose screen is displayed
        startScreen.setAttribute('class', 'lose'); 
        header.textContent = 'Sorry, try again!';
        
        startButton.textContent = 'Play Again';
        startScreen.style.display = ''; 
        
        startButton.addEventListener('click', () => { // if a 'play again' button is clicked gameReset() function runs
            gameReset();
           
        });
    }
    if(letters.length === guesses.length){ // if all letters in a phrase are shown 'You Won!' screen is displayed
        startScreen.setAttribute('class', 'win'); 
        header.textContent = 'You Won!';
        startButton.textContent = 'Play Again!';
        startScreen.style.display = ''; 

        startButton.addEventListener('click', () => { // if a 'play again' button is clicked gameReset() function runs
            gameReset();   
        });
    }
}

//GAME RESET FUNCTION

function gameReset(){
    // ul.innerHTML = '';
    addPhraseToDisplay();
    let phraseLi = document.querySelectorAll('ul li'); // li elements are selected
    for (let i = 0; i < phraseLi.length; i ++ ){ // for loop loops through the li elements
        if(phraseLi[i].textContent !== ' '){ // if statement checks if textContent of li elements is not a space
            phraseLi[i].setAttribute('class' ,'letter'); // if textContent is not a space it gets the class 'letter'
        } else {
            phraseLi[i].className = 'space'; // if textContent is a space it gets the class space
        };
    };
    for( let i = 0; missed > 0; i++){ //reseting hearts and missed counter
        missed -= 1;
        hearts[missed].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    };
    for(let i = 0; qwertyLetters.length > i; i++){  //reseting keyboard
        qwertyLetters[i].removeAttribute('class');
        qwertyLetters[i].removeAttribute('disabled')
    }
    startScreen.setAttribute('class', 'start')
    startScreen.style.display = 'none'; // if the startButton is clicked it changes the display of startScreen to none
};

// EVENT LISTENER FOR LETTERS PRESSES

keyboard.addEventListener('click', () => {
    let click = event.target;
    if(click.tagName === 'BUTTON'){
        checkLetter(click);
        console.log(letterFound);
            if(!letterFound){
                missed += 1;
                hearts[missed - 1].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
            }
    }
    checkWin();
});

// START BUTTON

startButton.addEventListener('click', () => { // event listener is added to the startButton
    
    startScreen.style.display = 'none'; // if the startButton is clicked it changes the display of startScreen to none
});
