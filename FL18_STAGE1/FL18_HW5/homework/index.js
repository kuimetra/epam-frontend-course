function isEquals(a, b) {
    return a === b;
}

function isBigger(a, b) {
    return a > b;
}

function storeNames(...args) {
    return args;
}

function getDifference(a, b) {
    return a > b ? a - b : b - a;
}

function negativeCount(arr) {
    return arr.filter(num => num < 0).length;
}

function letterCount(str, letter) {
    return str.split('').filter(ch => ch === letter).length;
}

function countPoints(arr) {
    const maxPoints = 3;
    let totalPoints = 0;
    for (const points of arr) {
        const [x, y] = points.split(':');
        if (+x > +y) {
            totalPoints += maxPoints;
        } else if (+x === +y) {
            totalPoints++;
        }
    }
    return totalPoints;
}