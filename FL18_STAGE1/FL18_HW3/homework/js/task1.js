function calcProfit() {
    const amountOfMoney = parseFloat(prompt('What is the initial amount of money?'));
    const numberOfYears = parseInt(prompt('What number of years?'), 10);
    const percentageOfYear = parseFloat(prompt('What percentage of the year?'));
    const minAmountOfMoney = 1000, minNumberOfYears = 1, maxPercentageOfYear = 100, numbersAfterComma = 2,
        hundredPercent = 100;
    if (!isNaN(amountOfMoney) && !isNaN(numberOfYears) && !isNaN(percentageOfYear) &&
        amountOfMoney >= minAmountOfMoney && numberOfYears >= minNumberOfYears &&
        percentageOfYear <= maxPercentageOfYear) {
        const totalAmount = amountOfMoney * Math.pow(1 + percentageOfYear / hundredPercent, numberOfYears);
        const totalProfit = totalAmount - amountOfMoney;
        alert(`Initial amount: ${amountOfMoney}
Number of years: ${numberOfYears}
Percentage of year: ${percentageOfYear}

Total profit: ${totalProfit.toFixed(numbersAfterComma)}
Total amount: ${totalAmount.toFixed(numbersAfterComma)}`);
    } else {
        alert('Invalid input data');
    }
}

calcProfit();