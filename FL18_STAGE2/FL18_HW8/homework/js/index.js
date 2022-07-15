import { PAIRINGS, GESTURES, getRandomGestureIndex } from './game';
import { showRoundInfo, showWinnerInfo } from './results';
import '../scss/style.scss';

const gameScore = { computer: 0, player: 0 };
let gameFinished = false;
let round = 0;

const getWinner = () => (Object.keys(gameScore).find((key) => gameScore[key] === 3) === 'player'
  ? 'You' : 'Computer');
const threeWins = () => Object.values(gameScore).some((score) => score === 3);

const startRound = (playerGestureIndex) => {
  const computerGestureIndex = getRandomGestureIndex();
  const playerGesture = GESTURES[playerGestureIndex];
  const computerGesture = GESTURES[computerGestureIndex];
  const roundWinner = PAIRINGS[playerGestureIndex][computerGestureIndex];
  let roundText = `${playerGesture} vs. ${computerGesture}, `;
  switch (roundWinner) {
    case 0:
      roundText += 'DRAW!';
      break;
    case 1:
      roundText += "You've WON!";
      gameScore.player += 1;
      break;
    case 2:
      roundText += "You've LOST!";
      gameScore.computer += 1;
      break;
      // no default
  }
  round += 1;
  showRoundInfo(roundText, round);
  if (threeWins(gameScore)) {
    showWinnerInfo(getWinner(gameScore));
    gameFinished = true;
  }
};

const resetGameResults = () => {
  document.getElementById('gameResults').innerHTML = '';
  gameFinished = false;
  gameScore.computer = 0;
  gameScore.player = 0;
  round = 0;
};

document.getElementById('resetGame').addEventListener('click', resetGameResults);

document.querySelectorAll('.hand-gesture-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    if (gameFinished) resetGameResults();
    startRound(+e.target.value);
  });
});
