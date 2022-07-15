const firstTurn = Math.round(Math.random());
const TWO = 2, THREE = 3, FOUR = 4, FIVE = 5, SIX = 6, SEVEN = 7, EIGHT = 8;

export const game = {
    turnIndex: firstTurn,
    resetTurnIndex: function () {
        this.turnIndex = firstTurn;
    },
    playerSign: firstTurn ? 'x' : 'o',
    computerSign: firstTurn ? 'o' : 'x',
    getPlayerClassName: function () {
        return firstTurn ? 'cross' : 'nought';
    },
    getComputerClassName: function () {
        return firstTurn ? 'nought' : 'cross';
    },
    playerScores: 0,
    computerScores: 0,
    resetScores: function () {
        this.playerScores = 0;
        this.computerScores = 0;
    },
    playerPositions: [],
    computerPositions: [],
    resetPositions: function () {
        this.playerPositions = [];
        this.computerPositions = [];
    }
};

export const winningSequences = [
    [0, 1, TWO],
    [THREE, FOUR, FIVE],
    [SIX, SEVEN, EIGHT],
    [0, THREE, SIX],
    [1, FOUR, SEVEN],
    [TWO, FIVE, EIGHT],
    [0, FOUR, EIGHT],
    [TWO, FOUR, SIX]
];
