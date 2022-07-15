const snakeArray = (snakeStart) => {
    return [
        [0, 1, 2, 3, 4, 5, 6],
        [21, 22, 23, 24, 25, 26, 7],
        [20, 35, 36, 37, 38, 27, 8],
        [19, 34, 41, 40, 39, 28, 9],
        [18, 33, 32, 31, 30, 29, 10],
        [17, 16, 15, 14, 13, 12, 11],
    ].map((row) => row.map((el) => el + snakeStart));
};
module.exports = snakeArray;
