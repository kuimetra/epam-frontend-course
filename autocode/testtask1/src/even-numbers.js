const evenNumbersInArray = (array) => {
    if (!(array instanceof Array) || !array.length) {
        return "Passed argument is not an array or empty";
    }
    let even = array.filter((el) => el % 2 === 0);
    return even.length > 0 ? even : "Passed array does not contain even numbers";
};
module.exports = evenNumbersInArray;
