const initialMin = 0, initialMax = 8, initialMaxPrize = 100, initialTotalPrize = 0;
const maxStep = 4, maxPrizeMultiplier = 2, numberOfAttempts = 3, base = 2;

function entryPoint() {
    if (confirm('Do you want to play a game?')) {
        startNewGame(initialMin, initialMax, initialMaxPrize, initialTotalPrize);
    } else {
        alert('You did not become a billionaire, but can.');
    }
}

function playAgain() {
    if (confirm('Do you want to play again?')) {
        startNewGame(initialMin, initialMax, initialMaxPrize, initialTotalPrize);
    } else {
        alert('Thank you for your participation. Goodbye!');
    }
}

function continueGame(min, max, maxPrize, totalPrize) {
    if (confirm('Do you want to continue?')) {
        max += maxStep;
        maxPrize *= maxPrizeMultiplier;
        startNewGame(min, max, maxPrize, totalPrize);
    } else {
        playAgain();
    }
}

function startNewGame(min, max, maxPrize, totalPrize) {
    const currentGamePrize = playGame(min, max, maxPrize, totalPrize);
    totalPrize += currentGamePrize;
    if (currentGamePrize > 0) {
        alert(`Congratulation, you won! Your prize is: ${totalPrize}$.`);
        continueGame(min, max, maxPrize, totalPrize);
    } else {
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$.`);
        playAgain();
    }
}

function playGame(min, max, maxPrize, totalPrize) {
    const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let prize = 0;
    for (let i = 0; i < numberOfAttempts; i++) {
        const possiblePrize = maxPrize / Math.pow(base, i);
        const userAssumption = parseInt(prompt(`Choose a roulette pocket number from ${min} to ${max}
Attempts left: ${numberOfAttempts - i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${possiblePrize}$`), 10);
        if (userAssumption === targetNumber) {
            prize = possiblePrize;
            break;
        }
    }
    return prize;
}

entryPoint();