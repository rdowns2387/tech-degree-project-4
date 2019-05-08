/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

   let game = '';
   document.getElementById('btn__reset').addEventListener('click', function(){
      game = new Game;
      game.startGame();
   });

  //run the handleInteraction function when an onscreen button is clicked
  document.querySelector("#qwerty").addEventListener("click", function(e){
    if(e.target && e.target.className === "key"){
      let button = e.target.innerHTML;
      game.handleInteraction(button);
    }
  });


  //When a key is pressed, check its key value against keysArray textContent values; if the value is included, trigger the click event to run the code on line 11 and start the handleInteraction method
    document.addEventListener("keydown", function(e) {
      let keys = document.querySelectorAll('.key');
      let keysArray = [];
      keys.forEach(key => keysArray.push(key));
      for (let i = 0; i < keysArray.length; i++) {
        if (e.key == $(keysArray[i]).text()) {
          $(keysArray[i]).trigger("click");
        }
      }
    });
