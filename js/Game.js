/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


  //My Variables
  let overlay = document.getElementById('overlay');
  let message = document.getElementById('game-over-message');
  let keys = document.querySelectorAll('.key');
  let hearts = document.querySelector('ol').children;




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
    if(hideArray.length === 0){
      return true
    } else {
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
     hearts[`${this.missed}`-1].firstElementChild.src = 'images/lostHeart.png';
     if(this.missed === 5){
       game.gameOver(false);
     }
   }

   /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
   gameOver(gameWon) {
     //bring back the overlay
     overlay.style.display = "flex";

     //if the game is won, change the message HTML and the overlay's class to win
     if(gameWon){
       message.innerHTML = 'Ganon is defeated and Zelda is saved!';
       overlay.classList.remove('start');
       overlay.classList.add('win');
       game.reset();
     } else {
       //if the game is lost, change the message HTML and the overlay's class to lose
       message.innerHTML = 'No more heart containers...';
       overlay.classList.remove('start');
       overlay.classList.add('lose');
       game.reset();
     }
   };


   reset(){
     document.getElementById('btn__reset').addEventListener('click', function(){
     let gamePhraseArea = document.querySelector('ul');

     //remove the old phrase from the screen
     gamePhraseArea.innerHTML = '';

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
      for (let i = 0; i < hearts.length; i++){
        if (hearts[i].firstElementChild.src = "images/lostHeart.png"){
          hearts[i].firstElementChild.src = "images/liveHeart.png";
        }
      }

      //reset the this.missed constructor to 0
      this.missed = 0;

      //remove the overlay background color and game message text
      overlay.classList.remove('start');
      overlay.classList.remove('win');
      document.getElementById('game-over-message').innerHTML = " ";

      //initialize a new game
      game.startGame();
    });
  }

   /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
   handleInteraction(button) {

     //call the Phrase class to use its methods
     const phrase = new Phrase(this.activePhrase.phrase);


     //if chosen letter is in active phrase, add the chosen class the onscreen letter and unhide the letter in the phrase and disable it from being used again
     if(phrase.checkLetter(`${button}`)){
       phrase.showMatchedLetter(button);
       for (let i = 0; i < keys.length; i ++){
         if(keys[i].innerText === `${button}`){
           keys[i].classList.add('chosen');
           keys[i].disabled=true;
         }
       }
       //check if the game has been won
       if(game.checkForWin(true)){
         game.gameOver(true);
       };
     }else {
       // remove a heart container
       game.removeLife();

       // add the 'wrong' class to onscreen button
       for (let i = 0; i < keys.length; i ++){
         if(keys[i].innerText === `${button}`){
           keys[i].classList.add('wrong');
           keys[i].disabled=true;
         }
       }
     }
   }
}
