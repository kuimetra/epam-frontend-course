const minAmountOfArgs = 2, maxAmountOfArgs = 10;

function getBigestNumber() {
    if ([...arguments].some((v) => Object.prototype.toString.call(v) !== '[object Number]')) {
        throw Error('Wrong argument type');
    }
    if (arguments.length < minAmountOfArgs) {
        throw Error('Not enough arguments');
    } else if (arguments.length > maxAmountOfArgs) {
        throw Error('Too many arguments');
    } else {
        return Math.max(...arguments);
    }
}

module.exports = getBigestNumber;
