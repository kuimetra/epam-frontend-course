const TWO = 2;

function getMaxEvenElement(arr) {
    return arr.map(Number).reduce((acc, cur) => cur % TWO ? acc : Math.max(acc, cur), 0);
}

let a = 3;
let b = 5;
[a, b] = [b, a];

const getValue = (value) => value ?? '-';

const getObjFromArray = (arr) => Object.fromEntries(arr);

function addUniqueId(obj) {
    return {...obj, id: Symbol()};
}

function getRegroupedObject(obj) {
    const {
        name: firstName,
        details: {id, age, university}
    } = obj;
    const user = {age, firstName, id};

    return {university, user};
}

const getArrayWithUniqueElements = (arr) => [...new Set(arr)];

const amountOfNumbersToLeave = 4;
const hideNumber = (num) => num.slice(num.length - amountOfNumbersToLeave).padStart(num.length, '*');

function required(parameter) {
    throw new Error(`${parameter} is required`);
}

const add = (a = required('a'), b = required('b')) => a + b;

function* generateIterableSequence() {
    yield 'I';
    yield 'love';
    yield 'EPAM';
}
