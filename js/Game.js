/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor(){
     this.missed =  0;
     this.phrases =  this.createPhrases();
     this.activePhrase =  this.getRandomPhrase();
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
       this.activePhrase.addPhraseToDisplay();
     //});
   };

   /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't
   won
   */
   checkForWin() {
     let gamePhrase = document.querySelector('ul').children;
     for (let i = 0; i < gamePhrase.length; i++){
       if (gamePhrase[i].classList.contains('hide')){
         return false;
       } else {
         return true
       }
     }
   }

   /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
   removeLife() {
     this.missed += 1;
     let lostHearts = this.missed - 1;

     let liveHearts = document.querySelector('ol').children;

     liveHearts[lostHearts].firstElementChild.src = 'images/lostHeart.png';
     if(this.missed == 5){
       console.log('Game Over');
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

     } else if (gameWon == false){
       message.innerHTML = 'GAME OVER';
       overlay.classList.remove('start');
       overlay.classList.add('lose');
     }

   };


}
