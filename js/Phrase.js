/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


 class Phrase {
  constructor(phrase){
    this.phrase = phrase.toLowerCase();
  }

  /**
  * Display phrase on game board
  */
  addPhraseToDisplay() {
    let displayBlocks = document.getElementById('phrase').firstElementChild;

    //split the active phrase
    let splitPhrase = this.phrase.split("");

    //iterate over the active phrase and create space and hidden letter blocks
    for (let i = 0; i < splitPhrase.length; i++){
      if (splitPhrase[i] === " "){
        displayBlocks.innerHTML += '<li class="space"> </li>';
      } else{
        displayBlocks.innerHTML += '<li class="hide letter '+splitPhrase[i]+'">'+splitPhrase[i]+'</li>';
      }
    }
  }

  /**
  * Checks if passed letter is in phrase
  * @param (string) letter - Letter to check
  */
  checkLetter(letter) {
    if(this.phrase.includes(letter)){
      return true
    }else{
      return false;
    }
  };

  /**
  * Displays passed letter on screen after a match is found
  * @param (string) letter - Letter to display
  */
  showMatchedLetter(letter) {
    let gamePhrase = document.querySelector('ul').children;
    for (let i = 0; i < gamePhrase.length; i++){
      if (gamePhrase[i].classList.contains(`${letter}`)){
        gamePhrase[i].classList.remove('hide');
        gamePhrase[i].classList.add('show');
      }
    }
};

 }
