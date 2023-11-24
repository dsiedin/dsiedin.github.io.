import calculateMathematicalExpectation from "../../utils/mathematicalExpectation.js";
import calculateUnbiasedEstimate from "../../utils/unbiasedEstimate.js";

import {
  calculateEmpiricalFisherValue,
  findFisherCriticalValue,
  compareEmpiricalAndCriticalFisherValue,
} from "./fisherCriterion.js";

import {
  calculateEmpiricalStudentValue,
  findStudentCriticalValue,
  compareEmpiricalAndCriticalStudentValue,
} from "./studentCriterion.js";

//Метод перевірки різниць середніх рівнів
export default function checkingAverageLevelDifferences(timeSeries) {
  const twoArrays = [];
  const chunkSize = Math.ceil(timeSeries.numberOfTimeSeries / 2);
  let mathExpectY1 = 0;
  let mathExpectY2 = 0;
  let unbiasedEstimateN1 = 0;
  let unbiasedEstimateN2 = 0;
  let empiricalValueF = 0;
  let criticalValueF = 0; //for n1-1, n2-1
  let empiricalValueS = 0;
  let criticalValueS = 0; //for n1+n2-1
  let canFindTrend = false;

  for (let i = 0; i < timeSeries.stockPrices.length; i += chunkSize) {
    const chunk = timeSeries.stockPrices.slice(i, i + chunkSize);
    twoArrays.push(chunk);
  }

  let firstArraySize = twoArrays[0].length;
  let secondArraySize = twoArrays[1].length;

  [mathExpectY1, mathExpectY2] = calculateMathematicalExpectation(
    timeSeries,
    twoArrays,
    true
  );

  [unbiasedEstimateN1, unbiasedEstimateN2] = calculateUnbiasedEstimate(
    timeSeries,
    twoArrays,
    [mathExpectY1, mathExpectY2],
    true
  );

  empiricalValueF = calculateEmpiricalFisherValue(
    unbiasedEstimateN1,
    unbiasedEstimateN2
  );

  criticalValueF = findFisherCriticalValue(firstArraySize, secondArraySize);

  canFindTrend = compareEmpiricalAndCriticalFisherValue(
    empiricalValueF,
    criticalValueF
  );

  if (canFindTrend === true) {
    empiricalValueS = calculateEmpiricalStudentValue(
      [firstArraySize, secondArraySize],
      [unbiasedEstimateN1, unbiasedEstimateN2],
      [mathExpectY1, mathExpectY2]
    );

    criticalValueS = findStudentCriticalValue(firstArraySize + secondArraySize);

    timeSeries.hasTrend = compareEmpiricalAndCriticalStudentValue(
      empiricalValueS,
      criticalValueS
    );
    if (timeSeries.hasTrend) {
      return true;
    }
  }

  timeSeries.hasTrend = false;
  return false;
}
