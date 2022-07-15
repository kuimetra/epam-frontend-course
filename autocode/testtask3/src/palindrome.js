const detectPalindrome = (str) => {
    if (Object.prototype.toString.call(str) !== "[object String]")
        return "Passed argument is not a string";
    if (str === "") return "String is empty";
    return [...str.toLowerCase()].reverse().join("") === str.toLowerCase()
        ? "This string is palindrome!"
        : "This string is not a palindrome!";
};

module.exports = detectPalindrome;
