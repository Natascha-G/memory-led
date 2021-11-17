const cards = document.querySelectorAll('.memory-card');
//const time = document.getElementById('time');
const plays = document.getElementById('plays');

let lHasflippedCard = false;
let lLockBoard = false;
let lFirstCard, lSecondCard;
let lTimer;
let lButtonStart = document.getElementById("click-to-start");
let lButtonRestart = document.getElementById("click-to-finish");


lButtonStart.addEventListener('click', startGame);
lButtonRestart.addEventListener('click', resetGame);

function startGame() {
  startTimer();
  overlayOff();

}

function startTimer() {
  let startTime = Date.now();

  lTimer = setInterval(function() {
  let elapsedTime = Date.now() - startTime;
     document.getElementById("time").innerHTML = (elapsedTime / 1000).toFixed(3);
 }, 100);
  cards.forEach(card => card.addEventListener('click', flipCard));

}

function overlayOff() {
  document.getElementById("button-container-start").style.display = "none";
  document.getElementById("click-to-start").style.display = "none";
}

function overlayOn() {
  document.getElementById("button-container-start").style.display = "flex";
  document.getElementById("game-finish").style.display = "flex";  
}

function flipCard() {
  if (lLockBoard) return;
  
  if ( this === lFirstCard) return;

  this.classList.add('flip');
  if (!lHasflippedCard) {
      //first click
      lHasflippedCard = true;
      lFirstCard = this;
      return;
  }
      //second click
      lSecondCard = this;

      checkForMatch();

      let iTotalCards = document.querySelectorAll('.memory-card').length;
      let iTotalFlippedCards = document.querySelectorAll('.memory-card.flip').length;
      let playsInt = parseInt(plays.innerHTML);
      playsInt = playsInt + 1;
      plays.innerHTML = playsInt;

      if(iTotalCards == iTotalFlippedCards) {
        stopTimer(0);
        overlayOn();
       let sEndTime = document.getElementById( 'time' ).textContent;
        document.getElementById( 'mce-MMERGE5' ).value = sEndTime;
      }
}

function checkForMatch() {
  let isMatch = lFirstCard.dataset.framework === lSecondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards ();
}


function disableCards() {
  lFirstCard.removeEventListener('click', flipCard);
  lSecondCard.removeEventListener('click', flipCard);

  resetBoard();
}  

function unFlipCards() {
  lLockBoard = true;

  setTimeout(() => {
      lFirstCard.classList.remove('flip');
      lSecondCard.classList.remove('flip');

      resetBoard();
      },1500);
}

function resetBoard() {
  [lHasflippedCard, lLockBoard] = [false, false];
  [lFirstCard, lSecondCard] = [null, null];
}

function stopTimer(reset) {
  clearInterval(lTimer);
  seconds = 0;
  if(reset == 1) { 
    time.innerHTML = 0;
  }
}


function resetPlays() {
  let play = 0;
  document.getElementById('plays').innerHTML = play;
}

function resetGame() {
  cards.forEach(card => card.classList.remove('flip'));
  resetPlays();
  stopTimer(1); 
  startGame();
}

 
(function shuffle() {
  cards.forEach(card => {
      let randomPos = Math.floor(Math.random()* 12);
      card.style.order = randomPos;
  });
})();