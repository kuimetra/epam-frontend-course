const validateTitle = (val) => {
    if (Object.prototype.toString.call(val) !== "[object String]")
        return "Incorrect input data";
    return val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90 &&
    val.length > 2 && val.length < 20 ? "VALID" : "INVALID";
};

const sum = (a, b) => {
    if (Object.prototype.toString.call(b) === "[object String]") b = +b;
    if (b % 3 === 0 && b % 5 === 0) b *= -1;
    return +a + b;
};

module.exports = {
    validateTitle,
    sum,
};
