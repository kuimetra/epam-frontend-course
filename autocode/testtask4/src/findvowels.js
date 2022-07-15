const findVowels = (str) => {
    if (Object.prototype.toString.call(str) !== "[object String]")
        return "Passed argument is not a string";
    if (str === "") return "String is empty";
    let countVowel = str.match(/[aeiou]/gi)?.length || 0;
    return countVowel > 0 ? countVowel : "String does not contain vowels";
};

module.exports = findVowels;
