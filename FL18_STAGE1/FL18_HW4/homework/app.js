function reverseNumber(num) {
    const number = '' + num;
    let reversed = '';
    const start = number < 0 ? 1 : 0;
    for (let i = start; number[i] !== undefined; i++) {
        reversed = number[i] + reversed;
    }
    return number < 0 ? -reversed : +reversed;
}

function forEach(arr, func) {
    for (let el of arr) {
        func(el);
    }
}

function map(arr, func) {
    const transformed = [];
    forEach(arr, (item) => {
        transformed.push(func(item));
    });
    return transformed;
}

function filter(arr, func) {
    const filtered = [];
    forEach(arr, (item) => {
        if (func(item)) {
            filtered.push(item);
        }
    });
    return filtered;
}

function getAdultAppleLovers(data) {
    const targetAge = 18, targetFruit = 'apple';
    return map(filter(data, function (el) {
        return el.age >= targetAge && el.favoriteFruit === targetFruit;
    }), function (el) {
        return el.name;
    });
}

function getKeys(obj) {
    let keys = [];
    for (let key in obj) {
        if (obj) {
            keys.push(key);
        }
    }
    return keys;
}

function getValues(obj) {
    let values = [];
    for (let val in obj) {
        if (obj) {
            values.push(obj[val]);
        }
    }
    return values;
}

function showFormattedDate(dateObj) {
    return `It is ${dateObj.getDate()} of ${dateObj.toLocaleString('en-us', {month: 'short'})}, ` +
        `${dateObj.getFullYear()}`;
}