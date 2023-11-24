export default function calculateMathematicalExpectation(
  timeSeries,
  arr,
  isDoubleArr = false,
  timeLag = 0
) {
  let sum = 0;
  let mathExpect = null;
  if (timeLag === 0 && isDoubleArr === false) {
    sum = 0;
    mathExpect = 0;

    arr.forEach((price) => (sum += price));
    mathExpect = (1 / timeSeries.numberOfTimeSeries) * sum;

    return mathExpect;
  } else if (timeLag === 0 && isDoubleArr === true) {
    sum = 0;
    mathExpect = [];

    arr[0].forEach((price) => (sum += price));
    mathExpect.push((1 / arr[0].length) * sum);

    sum = 0;

    arr[1].forEach((price) => (sum += price));
    mathExpect.push((1 / arr[1].length) * sum);

    return mathExpect;
  } else if (timeLag >= 1 && isDoubleArr === true) {
    sum = 0;
    mathExpect = [];

    for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
      sum += arr[i];
    }
    mathExpect.push((1 / (timeSeries.numberOfTimeSeries - timeLag)) * sum);

    sum = 0;

    for (let i = 0 + timeLag; i < timeSeries.numberOfTimeSeries; i++) {
      sum += arr[i];
    }
    mathExpect.push((1 / (timeSeries.numberOfTimeSeries - timeLag)) * sum);

    timeSeries.mathematicalExpectationY1 = mathExpect[0];
    timeSeries.mathematicalExpectationY2 = mathExpect[1];

    // console.log(`mathExpectY1 = ${timeSeries.mathematicalExpectationY1}`);
    // console.log(`mathExpectY2 = ${timeSeries.mathematicalExpectationY2}`);
  }
}
