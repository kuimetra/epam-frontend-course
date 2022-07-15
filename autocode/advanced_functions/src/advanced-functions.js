//=============================================
// ------------------------------------ TASK №1
//=============================================
const cache = (func) => {
    let cacheObj = {};
    return function (...arr) {
        if (!(arr in cacheObj)) {
            cacheObj[arr] = func(...arr);
        }
        return cacheObj[arr];
    };
};

//=============================================
// ------------------------------------ TASK №2
//=============================================
const forwardBackwardSteps = {
    step: 0,
    forward: function () {
        this.step++;
        return this;
    },
    backward: function () {
        this.step--;
        return this;
    },
    revealStep: function () {
        console.log(this.step);
        return this;
    },
};

//=============================================
// ------------------------------------ TASK №3
//=============================================
const applyAll = (func, ...arr) => {
    return func.call(this, ...arr);
};

const sum = (...arr) => {
    return arr.reduce((a, b) => a + b);
};

const mul = (...arr) => {
    return arr.reduce((a, b) => a * b, 1);
};

//=============================================

module.exports = {cache, forwardBackwardSteps, applyAll, sum, mul};
