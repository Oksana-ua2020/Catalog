'use strict'

const amountMoney = parseInt(prompt('Enter the initial amount of money:'));
const numberYears = parseInt(prompt('Enter the number of years:'));
const percentageYear = parseInt(prompt('Enter the percentage of a year:'));
const minAmountMoney = 1000;
const minNumberYears = 1;
const maxPercentageYear = 100;
const percentage100 = 100;
const precisionProfit = 2;

const isNumbers = !!(amountMoney && numberYears && percentageYear);
const isValid = amountMoney >= minAmountMoney && 
  numberYears >= minNumberYears && 
  percentageYear <= maxPercentageYear;

if (isNumbers && isValid) {
  let numberYearsRound = Math.round(numberYears);
  let totalAmount = amountMoney;

  for (let i = 1; i <= numberYearsRound; ++i) {
    const profitYear = totalAmount * percentageYear / percentage100;
    totalAmount += +profitYear.toFixed(precisionProfit);
  }
  alert(`Initial amount: ${amountMoney}
Number of years: ${numberYears}
Percentage of year: ${percentageYear}

Total profit: ${(totalAmount - amountMoney).toFixed(precisionProfit)}
Total amount: ${totalAmount}`);
} else {
  alert('Invalid input data');
}
