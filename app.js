let missed = 0;
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let letterFound = 'null';
const hearts = document.querySelectorAll('.tries');

// ARRAY OF PHRASES

const phrases = [
    'right out of the gate',
    'raining cats and dogs',
    'shot in the dark',
    'under the weather',
    'go for broke',
    'quick and dirty',
    'everything but the kitchen sink',
    'in a pickle',
    'keep your shirt on',
    'back to square one'
];


//RANDOM PHRASE GENERATOR

function randomPhrase() {
    const highest = (phrases.length); // Const contains the highest number for draw
    const draw = Math.floor( Math.random() * highest); // Math.random draws the random number from 0 to const highest
    return phrases[draw]; // the array item is returned
};

//CREATING ARRAY OF LETTERS

function getRandomPhraseAsArray(){
    const arrayOfLetters = randomPhrase().split('') // the phrase chosen in randomPhrase function is split to array of letters
    return arrayOfLetters; // array of letters is returned
}


//PHRASE TO DISPLAY

function addPhraseToDisplay() {
        const phraseToProcess = getRandomPhraseAsArray() // getRandomPhraseAsArray function is called and assigned to the const
        let arrayToDisplay = ''; // empty variable for li items
    for(let i = 0; i < phraseToProcess.length; i++)  { 
        arrayToDisplay += '<li>' + phraseToProcess[i] + '</li>'; // for loop loops through the array and puts every element in li tag
    }
    return arrayToDisplay;
}
const finalPhrase = document.querySelector('#phrase ul') // ul is selected
finalPhrase.innerHTML = addPhraseToDisplay(); // li items are added to the ul inside the .phrases div

// ADDING CLASS

let phraseLi = document.querySelectorAll('ul li'); // li elements are selected
for (let i = 0; i < phraseLi.length; i ++ ){ // for loop loops through the li elements
    if(phraseLi[i].textContent !== ' '){ // if statement checks if textContent of li elements is not a space
        phraseLi[i].className = 'letter'; // if textContent is not a space it gets the class 'letter'
    } else {
        phraseLi[i].className = 'space'; // if textContent is a space it gets the class space
    };
}

// CHECK LETTER FUNCTION
            
function checkLetter() {
    for (let i = 0; i < phraseLi.length; i ++ ){
        if(phraseLi[i].textContent.toLowerCase() === (event.target.textContent)){
            phraseLi[i].className = 'letter show';
            event.target.setAttribute('class', 'chosen');
            event.target.setAttribute('disabled', '')
            letterFound = event.target.textContent;
        };
        if(phraseLi[i].textContent.toLowerCase() !== (event.target.textContent)){
            event.target.setAttribute('class', 'chosen');
            event.target.setAttribute('disabled', '')
        };
    };
}

// EVENT LISTENER FOR LETTERS PRESSES

keyboard.addEventListener('click', () => {
    let click = event.target;
    if(click.tagName === 'BUTTON'){
        checkLetter();
        console.log(letterFound);
            if(letterFound === 'null'){
                missed += 1;
                hearts[missed - 1].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
            }else{
                letterFound = 'null';
            };
    }
    if(missed === 5){   // if the all hearts are lost the you loose screen is displayed
        startScreen.style.display = ''; 
    }

});


// START BUTTON

const startButton = document.querySelector('#overlay a'); // the start button is selected
const startScreen = document.getElementById('overlay'); // the start screen overlay is selected
startButton.addEventListener('click', () => { // event listener is added to the startButton
    startScreen.style.display = 'none'; // if the startButton is clicked it changes the display of startScreen to none
});
