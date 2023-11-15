import FisherCriticalValues from "./tabular_data/FisherCriticalValues.js";

function calculateEmpiricalFisherValue(unbiasedEstimate1, unbiasedEstimate2) {
  let empiricalFisherValue;
  if (unbiasedEstimate1 > unbiasedEstimate2) {
    empiricalFisherValue = unbiasedEstimate1 / unbiasedEstimate2;
  } else {
    empiricalFisherValue = unbiasedEstimate2 / unbiasedEstimate1;
  }
  return empiricalFisherValue;
}

function findFisherCriticalValue(sizeArr1, sizeArr2) {
  let k1Index = 0;
  let k2Index = 0;
  if (sizeArr1 - 1 <= 10) {
    k1Index = sizeArr1 - 2;
  } else if (sizeArr1 - 1 > 10 && sizeArr1 - 1 <= 12) {
    k1Index = 9;
  } else if (sizeArr1 - 1 > 12 && sizeArr1 - 1 <= 15) {
    k1Index = 10;
  } else if (sizeArr1 - 1 > 15 && sizeArr1 - 1 <= 20) {
    k1Index = 11;
  } else if (sizeArr1 - 1 > 20 && sizeArr1 - 1 <= 24) {
    k1Index = 12;
  } else if (sizeArr1 - 1 > 24 && sizeArr1 - 1 <= 30) {
    k1Index = 13;
  } else if (sizeArr1 - 1 > 30 && sizeArr1 - 1 <= 40) {
    k1Index = 14;
  } else if (sizeArr1 - 1 > 40 && sizeArr1 - 1 <= 60) {
    k1Index = 15;
  } else if (sizeArr1 - 1 > 60 && sizeArr1 - 1 <= 120) {
    k1Index = 16;
  } else if (sizeArr1 - 1 > 120 && sizeArr1 - 1 <= 160) {
    k1Index = 17;
  } else {
    k1Index = 18;
  }

  if (sizeArr2 - 1 <= 30) {
    k2Index = sizeArr2 - 2;
  } else if (sizeArr2 - 1 > 30 && sizeArr2 - 1 <= 40) {
    k2Index = 29;
  } else if (sizeArr2 - 1 > 40 && sizeArr2 - 1 <= 60) {
    k2Index = 30;
  } else if (sizeArr2 - 1 > 60 && sizeArr2 - 1 <= 120) {
    k2Index = 31;
  } else if (sizeArr2 - 1 > 120 && sizeArr2 - 1 <= 160) {
    k2Index = 32;
  } else {
    k2Index = 33;
  }

  return FisherCriticalValues[k2Index][k1Index];
}

function compareEmpiricalAndCriticalFisherValue(empirical, critical) {
  /*Якщо Емп >= Крит то гіпотеза про однорідність дисперсій відхиляється
             немає відповіді про наявність тренду*/
  /*Якщо Емп < Крит то гіпотеза про однорідність дисперсій приймається
           і необхідно переходити до наступних розрахунків*/
  if (empirical < critical) {
    console.log(
      `Emp Fisher's value: ${empirical} < Critical Fisher's value: ${critical}\nОднорідність дисперсій приймається`
    );
    return true;
  } else {
    console.log(
      `Emp Fisher's value: ${empirical} > Critical Fisher's value: ${critical}\nОднорідність дисперсій відхиляється`
    );
    return false;
  }
}

export {
  calculateEmpiricalFisherValue,
  findFisherCriticalValue,
  compareEmpiricalAndCriticalFisherValue,
};
