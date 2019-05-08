/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

   let game = '';
   document.getElementById('btn__reset').addEventListener('click', function(){
      game = new Game;
      game.startGame();
   });

  document.querySelector("#qwerty").addEventListener("click", function(e){
    if(e.target && e.target.className === "key"){
      let button = e.target.innerHTML;
      game.handleInteraction(button);
    }
  });

  document.addEventListener("keypress", function(e){
    let keys = document.querySelectorAll('.key');
    let button = `${e.key}`;

    game.handleInteraction(button);


  });
