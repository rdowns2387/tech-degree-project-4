/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor(){
     this.missed =  0;
     this.phrases =  this.createPhrases();
     this.activePhrase =  null ;
   }

   /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */

   createPhrases() {
     let phrases = [
       new Phrase('A Link to the Past'),
       new Phrase('Links Awakening'),
       new Phrase('Twilight Princess'),
       new Phrase('Ocarina of Time'),
       new Phrase('Breath of the Wild'),
       new Phrase('Majoras Mask')
     ]

     return phrases;
   }

   /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
   getRandomPhrase() {
     let i = Math.floor(Math.random()*6);
     let randomPhrase = this.phrases[i];
     return randomPhrase;
   };

   /**
   * Begins game by selecting a random phrase and displaying it to user
   */
   startGame() {
     //Listens for click on the start game button
       //hides the overlay
       document.getElementById('overlay').style.display = "none";
       //add the phrase to the display
       this.activePhrase = this.getRandomPhrase();
       this.activePhrase.addPhraseToDisplay();
     //});
   };

   /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't
   won
   */
   checkForWin() {
    let isHide = document.querySelectorAll('.hide');
    let hideArray = [];
    isHide.forEach(hide => hideArray.push(hide));
    console.log(hideArray.length);
    if(hideArray.length === 0){
      return true
      console.log('winner winner chicken dinner')

    } else {
      console.log('something is still hidden')
      return false
    }
   }

   /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
   removeLife() {
     this.missed += 1;

     let liveHearts = document.querySelector('ol').children;

     liveHearts[`${this.missed}`-1].firstElementChild.src = 'images/lostHeart.png';
     console.log(this.missed);
     if(this.missed === 5){
       game.gameOver(false);
     }
   }

   /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
   gameOver(gameWon) {
     let overlay = document.getElementById('overlay');
     let message = document.getElementById('game-over-message');

     overlay.style.display = "flex";


     if(gameWon){
       message.innerHTML = 'You won!';
       overlay.classList.remove('start');
       overlay.classList.add('win');
       game.reset();


     } else {
       message.innerHTML = 'GAME OVER';
       overlay.classList.remove('start');
       overlay.classList.add('lose');
       game.reset();
     }

   };

   reset(){
     document.getElementById('btn__reset').addEventListener('click', function(){
     let gamePhrase = document.querySelector('ul');
     let keys = document.querySelectorAll('.key');
     let resetHearts = document.querySelector('ol').children;
     let overlay = document.getElementById('overlay');
     let message = document.getElementById('game-over-message');

     console.log(resetHearts);



     //get rid of the old phrase
     gamePhrase.innerHTML = '';

     //remove the chosen and wrong classes from the qwerty keyboard and enable all disabled buttons
     for (let i = 0; i < keys.length; i++){
       if (keys[i].classList.contains('chosen')){
         keys[i].classList.remove('chosen');
         keys[i].disabled=false;

       }
       if (keys[i].classList.contains('wrong')){
         keys[i].classList.remove('wrong');
         keys[i].disabled=false;
       }
      }

      //reset the heart images
      for (let i = 0; i < resetHearts.length; i++){
        if (resetHearts[i].firstElementChild.src = "images/lostHeart.png"){
          resetHearts[i].firstElementChild.src = "images/liveHeart.png";
        }
      }

      //reset the this.missed constructor
      this.missed = 0;

      //remove the overlay background color and game message text
      overlay.classList.remove('start');
      overlay.classList.remove('win');
      document.getElementById('game-over-message').innerHTML = " ";



     game.startGame();

    });
  }

   /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
   handleInteraction(button) {
     console.log(button);

     let gamePhrase = document.querySelectorAll('.key');
     const phrase = new Phrase(this.activePhrase.phrase);

     //disable the button

     // letterToBeDisabled.setAttribute('disabled', true);
       console.log(`${button} button is now disabled` );


     //if letter is in active phrase, mark the qwerty letter as correct, show the letter in the phrase
     if(phrase.checkLetter(`${button}`)){
       console.log('this is a correct guess');
       phrase.showMatchedLetter(button);
       for (let i = 0; i < gamePhrase.length; i ++){
         if(gamePhrase[i].innerText === `${button}`){
           gamePhrase[i].classList.add('chosen');
           //disable the button
           gamePhrase[i].disabled=true;
         }
       }
       if(game.checkForWin(true)){
         game.gameOver(true);
       };
     }else {
       console.log('this is an incorrect guess');
       // remove a heart
       game.removeLife();
       // add the wrong class to qwerty button
       for (let i = 0; i < gamePhrase.length; i ++){
         if(gamePhrase[i].innerText === `${button}`){
           gamePhrase[i].classList.add('wrong');
           //disable the button
           gamePhrase[i].disabled=true;
         }
       }
     }

   }
}
