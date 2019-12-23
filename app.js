let missed = 0;
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

const phrases = [
    'Right Out of the Gate',
    'Raining Cats and Dogs',
    'Shot In the Dark',
    'Under the Weather',
    'Go For Broke',
    'Quick and Dirty',
    'Everything But The Kitchen Sink',
    'In a Pickle',
    'Keep Your Shirt On',
    'Back to Square One'
];


//RANDOM PHRASE GENERATOR

function randomPhrase() {
    const highest = (phrases.length);
    const draw = Math.floor( Math.random() * highest);
    return phrases[draw];
};

//CREATING ARRAY OF LETTERS

function getRandomPhraseAsArray(){
    const arrayOfLetters = randomPhrase().split('')
    
    return arrayOfLetters;
}


//PHRASE TO DISPLAY

/////////////////
//TO NIE DZIAŁA//
/////////////////

// function addPhraseToDisplay() {
    
//     let arrayToDisplay = '';
//     for(let i = 0; i < getRandomPhraseAsArray().length; i++)  {
//     arrayToDisplay += '<li>' + getRandomPhraseAsArray()[i] + '</li>';
//     }
//     return arrayToDisplay;
// }
// const finalPhrase = document.querySelector('#phrase ul')
// finalPhrase.textContent = addPhraseToDisplay();

/////////////////
//TO NIE DZIAŁA//
/////////////////

// START BUTTON

const startButton = document.querySelector('#overlay a');
const startScreen = document.getElementById('overlay');
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
