const fibonacciNumbers = (num) => {
    if (typeof num !== "number") return "Passed argument is not a number";
    if (num < 2) return num;
    return fibonacciNumbers(num - 1) + fibonacciNumbers(num - 2);
};
module.exports = fibonacciNumbers;
