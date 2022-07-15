function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
    try {
        funcs.forEach((item, index) => {
            if (!isFunction(item)) {
                throw new TypeError(index);
            }
            value = item(value);
        });
        return value;
    } catch (e) {
        return `Provided argument at position ${e.message} is not a function!`;
    }
};

const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
const capitalize = (value) =>
    value
        .split(' ')
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ');
const appendGreeting = (value) => `Hello, ${value}!`;