
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
const ul = phrase.querySelector('ul');

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
    'back to square one',
    'hands down',
    'wild goose chase',
    'talk the talk',
    'right off the bat',
    'on the ropes',
    'cut the mustard',
    'know the ropes',
    'easy as pie',
    'lovey dovey',
    'elephant in the room',
    'son of a gun',
    'a piece of cake',
    'under your nose',
    'eat my hat'
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
    for(let i = 0; i < phraseToProcess.length; i++)  { //loops through the letters and creates li elements
        const li = document.createElement('li');
        li.textContent = phraseToProcess[i];
        if (phraseToProcess[i] !== ' ') {
            li.className = 'letter'; //letters get the class of letter
        } else {
            li.className = 'space'; // spaces get the class of space
        }
        ul.appendChild(li); //letters in li are appended to ul
    }
};
addPhraseToDisplay(); //function is called

// CHECK LETTER FUNCTION
            
const checkLetter = input => {
    letterFound = false; //letter found base state is set
    let key = input.textContent; //text content of input is gathered
    const phraseLi = document.querySelectorAll('ul li'); //all phrase letters are selected
    for (let i = 0; i < phraseLi.length; i += 1) {  
      let letter = phraseLi[i].textContent.toLowerCase(); //letter is gathered
      if ( key === letter ) { //letter and input key is compared
        let match = phraseLi[i]; //matched letter is chosen
        match.className = 'letter show'; //matched letter gets the class of shown and is shown
        letterFound = input.textContent; //letter found gets text content of input
      }
      input.setAttribute('class', 'chosen'); //pressed letter key gets class of chosen
      input.setAttribute('disabled', ''); //pressed letter key is disabled
    }
  }

//CHECK WIN FUNCTION

function checkWin() {
    if(missed === 5){   // if the all hearts are lost the you loose screen is displayed
        startScreen.setAttribute('class', 'lose'); 
        header.textContent = 'Sorry, try again!';
        startButton.textContent = 'Play Again';
        startScreen.style.display = ''; 
        startButton.addEventListener('click', () => { // if a 'play again' button is clicked 
            gameReset(); //game reset function is called
        });
    }
    if(letters.length === guesses.length){ // if all letters in a phrase are shown 'You Won!' screen is displayed
        startScreen.setAttribute('class', 'win'); 
        header.textContent = 'You Won!';
        startButton.textContent = 'Play Again!';
        startScreen.style.display = ''; 
        startButton.addEventListener('click', () => { // if a 'play again' button is clicked 
            gameReset(); //game reset function is called
        });
    }
}

//GAME RESET FUNCTION

function gameReset(){ //
    let oldPhrase = document.querySelectorAll('ul li'); //old phrase is selected
    for (let i=0; i<oldPhrase.length; i+=1) { //loop loops through the old phrase and removes all the letters
        ul.removeChild(oldPhrase[i]);
    }
    addPhraseToDisplay(); //the new phrase is added to the display
    for( let i = 0; missed > 0; i++){ //reseting hearts and missed counter
        missed -= 1;
        hearts[missed].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
    };
    for(let i = 0; qwertyLetters.length > i; i++){  //reseting keyboard
        qwertyLetters[i].removeAttribute('class');
        qwertyLetters[i].removeAttribute('disabled')
    }
    startScreen.setAttribute('class', 'start') //start screen gets class 'start'
    startScreen.style.display = 'none'; // if the startButton is clicked it changes the display of startScreen to none
};

// EVENT LISTENER FOR LETTERS PRESSES

keyboard.addEventListener('click', () => { //event listener listens for clicks 
    let click = event.target;
    if(click.tagName === 'BUTTON'){ //if statement checks if click was on the button
        checkLetter(click); //click is passed to check letter function
            if(!letterFound){ //if letter is not found 
                missed += 1; //one point is added to missed variable
                hearts[missed - 1].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">'; //one heart is lost
            }
    }
    setTimeout('checkWin()', 7000); //checkWin function is called with timeout
});

// START BUTTON

startButton.addEventListener('click', () => { // event listener is added to the startButton
    startScreen.style.display = 'none'; // if the startButton is clicked it changes the display of startScreen to none
});
