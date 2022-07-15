function convert() {
    return [...arguments].map((v) => {
        if (Object.prototype.toString.call(v) === "[object String]") return +v;
        if (Object.prototype.toString.call(v) === "[object Number]") return v.toString();
    });
}

const executeforEach = (arr, func) => {
    for (let el of arr) {
        func(el);
    }
};

const mapArray = (arr, func) => {
    const transformed = [];
    executeforEach(arr, (item) => {
        transformed.push(func(+item));
    });
    return transformed;
};

const filterArray = (arr, func) => {
    const filtered = [];
    executeforEach(arr, (item) => {
        if (func(item)) {
            filtered.push(item);
        }
    });
    return filtered;
};

const flipOver = (str) => {
    return [...str].reverse().join("");
};

const makeListFromRange = (arr) => {
    let [start, end] = arr;
    if (end === undefined) return [start];
    return Array.from({length: end + 1 - start}, (v, k) => k + start);
};

const getArrayOfKeys = (arr, key) => {
    let keys = [];
    executeforEach(arr, (el) => keys.push(el[key]));
    return keys;
};

const substitute = (arr) => {
    return mapArray(arr, (el) => (el < 30 ? "*" : el));
};

const getPastDay = (date, days) => {
    return new Date(date.getTime() - 86400000 * days).getDate();
};

const leadingZeros = (x) => ("0" + x).slice(-2);
const formatDate = (date) => {
    return (
        `${date.getFullYear()}/${leadingZeros(date.getMonth() + 1)}/${leadingZeros(date.getDate())} ` +
        `${leadingZeros(date.getHours())}:${leadingZeros(date.getMinutes())}`
    );
};
module.exports = {
    convert,
    executeforEach,
    mapArray,
    filterArray,
    flipOver,
    makeListFromRange,
    getArrayOfKeys,
    substitute,
    getPastDay,
    formatDate,
};
