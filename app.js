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

function addPhraseToDisplay() {
        const phraseToProcess = getRandomPhraseAsArray()
        let arrayToDisplay = '';
    for(let i = 0; i < phraseToProcess.length; i++)  {
        arrayToDisplay += '<li>' + phraseToProcess[i] + '</li>';
    }
    return arrayToDisplay;
}
const finalPhrase = document.querySelector('#phrase ul')
finalPhrase.innerHTML = addPhraseToDisplay();

// ADDING CLASS

let phraseLi = document.querySelectorAll('ul li');
for (let i = 0; i < phraseLi.length; i ++ ){
    if(phraseLi[i].textContent !== ' '){
        phraseLi[i].className = 'letter';
    } else {
        phraseLi[i].className = 'space';
    };
}
// START BUTTON

const startButton = document.querySelector('#overlay a');
const startScreen = document.getElementById('overlay');
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
