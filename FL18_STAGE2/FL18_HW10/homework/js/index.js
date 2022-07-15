import {appendSign, highlightUsername, showMessageBox, hideMessageBox} from './ui';
import {game, winningSequences} from './game';
import '../scss/style.scss';

const username = prompt('Enter your name:').trim() || 'You';
document.getElementById('player-username').innerText = `${username} (${game.playerSign})`;
document.getElementById('computer-username').innerText = `Computer (${game.computerSign})`;
const boardSquares = document.querySelectorAll('.square');
const amountOfSquaresOnBoard = 9;
const TIMER_DELAY = 1000;
let gameOver = false;
let winningSequence;

window.onload = function () {
    startNewGame();
};

const startNewGame = () => {
    game.resetTurnIndex();
    highlightPlayersName();
    if (game.turnIndex === 0) {
        setTimeout(computerTurn, TIMER_DELAY);
    }
};

const getRandomPosition = () => {
    const freePositions = [...Array(amountOfSquaresOnBoard).keys()].filter(
        (pos) => !game.playerPositions.includes(pos) && !game.computerPositions.includes(pos)
    );
    return freePositions[Math.floor(Math.random() * freePositions.length)];
};

const computerTurn = () => {
    const computerPosition = getRandomPosition();
    if (!gameOver && boardSquares[computerPosition].children.length === 0) {
        appendSign(boardSquares[computerPosition], game.getComputerClassName());
        game.computerPositions.push(computerPosition);
        if (checkWinningSequences(game.computerPositions)) {
            game.computerScores++;
            updateScores();
            setTimeout(function () {
                showMessageBox(`Computer won!`)
            }, TIMER_DELAY);
            finishGame();
        } else if (gameIsTied()) {
            finishGameWithTie();
        } else {
            game.turnIndex++;
            highlightPlayersName();
        }
    }
};

const playerTurn = (position, positionIndex) => {
    appendSign(position, game.getPlayerClassName());
    game.playerPositions.push(positionIndex);
    if (checkWinningSequences(game.playerPositions)) {
        game.playerScores++;
        updateScores();
        setTimeout(function () {
            showMessageBox(`${username} won!`)
        }, TIMER_DELAY);
        finishGame();
    } else if (gameIsTied()) {
        finishGameWithTie();
    } else {
        setTimeout(computerTurn, TIMER_DELAY);
        game.turnIndex--;
        highlightPlayersName();
    }
};

const checkWinningSequences = (role) => {
    winningSequences.forEach((sequence) => {
        if (sequence.every((pos) => role.includes(pos))) {
            winningSequence = sequence;
        }
    });
    return !!winningSequence;
};

const gameIsTied = () => game.playerPositions.length + game.computerPositions.length === amountOfSquaresOnBoard;

const finishGameWithTie = () => {
    game.playerScores++;
    game.computerScores++;
    updateScores();
    setTimeout(function () {
        showMessageBox('Draw!')
    }, TIMER_DELAY);
    finishGame();
}

const updateScores = () => {
    document.getElementById('player-score').innerText = game.playerScores.toString();
    document.getElementById('computer-score').innerText = game.computerScores.toString();
};

const finishGame = () => {
    game.resetPositions();
    zoomWinningSequence();
    winningSequence = undefined;
    gameOver = true;
};

const clearBoard = () => {
    boardSquares.forEach((square) => {
        square.innerHTML = '';
    });
    gameOver = false;
};

const highlightPlayersName = () => {
    if (game.turnIndex === 0) {
        highlightUsername('computer-username', 'player-username');
    } else if (game.turnIndex === 1) {
        highlightUsername('player-username', 'computer-username');
    }
};

const zoomWinningSequence = () => {
    if (winningSequence) {
        winningSequence.forEach((i) => {
            boardSquares[i].childNodes[0].classList.add('zoom');
        });
    }
};

boardSquares.forEach((square, i) => {
    square.addEventListener('click', (e) => {
        if (!gameOver && game.turnIndex === 1 && e.currentTarget.children.length === 0) {
            playerTurn(e.currentTarget, i);
        }
    });
});

document.getElementById('continue-btn').addEventListener('click', hideMessageBox);

document.getElementById('new-game-btn').addEventListener('click', () => {
    finishGame();
    clearBoard();
    startNewGame();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    finishGame();
    clearBoard();
    game.resetScores();
    updateScores();
    startNewGame();
});
