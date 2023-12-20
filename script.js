'use strict';

const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');
const playerScore0 = document.querySelector('#score--0');
const playerScore1 = document.querySelector('#score--1');
const playerCurrent0 = document.querySelector('#current--0');
const playerCurrent1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

// current points
let currentScorePL0 = 0;
let currentScorePL1 = 0;

// main points
let scorePL0 = 0;
let scorePL1 = 0;

let round = 0;

// GAME RESET
const gameReset = () => {
  currentScorePL0 = 0;
  currentScorePL1 = 0;
  scorePL0 = 0;
  scorePL1 = 0;
  round = 0;

  // changing the DOM
  playerName0.textContent = 'PLAYER 1';
  playerName1.textContent = 'PLAYER 2';
  playerScore0.textContent = '0';
  playerScore1.textContent = '0';
  playerCurrent0.textContent = '0';
  playerCurrent1.textContent = '0';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  dice.style.display = 'none';
  if (
    document.querySelector('.player--1').classList.contains('player--active')
  ) {
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
  }
  document.querySelector('.btn--roll').style.display = 'block';
  document.querySelector('.btn--hold').style.display = 'block';
};

gameReset();

const handleRoll = () => {
  // rolling and display dice
  dice.style.display = 'block';
  let number = Number((Math.random() * 5 + 1).toFixed());
  dice.src = `dice-${number}.png`;

  if (number === 1) {
    handleSwitch();
  } else {
    if (round === 0) {
      // player 1 turn
      currentScorePL0 += Number(number);
      playerCurrent0.textContent = currentScorePL0;
    } else {
      // player 2 turn
      currentScorePL1 += Number(number);
      playerCurrent1.textContent = currentScorePL1;
    }
  }
};

const handleSwitch = () => {
  if (round === 0) {
    round = 1; // change to player 2
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
  } else {
    round = 0; // change to player 1
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  }

  // reset the values
  currentScorePL0 = 0;
  currentScorePL1 = 0;
  playerCurrent0.textContent = '0';
  playerCurrent1.textContent = '0';
};

const handleHold = () => {
  // change values
  scorePL0 += currentScorePL0;
  scorePL1 += currentScorePL1;

  currentScorePL0 = 0;
  currentScorePL1 = 0;

  // change DOM
  playerCurrent0.textContent = '0';
  playerCurrent1.textContent = '0';
  playerScore0.textContent = scorePL0;
  playerScore1.textContent = scorePL1;

  if (scorePL0 >= 100 || scorePL1 >= 100) {
    handleWin();
  } else {
    // change player
    handleSwitch();
  }
};

// win
const handleWin = () => {
  if (scorePL0 >= 100) {
    // player 1 win
    playerName0.textContent = 'PLAYER 1 WON!';
    document.querySelector('.player--0').classList.add('player--winner');
  } else if (scorePL1 >= 100) {
    // player 2 win
    playerName1.textContent = 'PLAYER 2 WON!';
    document.querySelector('.player--1').classList.add('player--winner');
  }

  document.querySelector('.btn--roll').style.display = 'none';
  document.querySelector('.btn--hold').style.display = 'none';
};

document.querySelector('.btn--new').addEventListener('click', gameReset);
document.querySelector('.btn--roll').addEventListener('click', handleRoll);
document.querySelector('.btn--hold').addEventListener('click', handleHold);
