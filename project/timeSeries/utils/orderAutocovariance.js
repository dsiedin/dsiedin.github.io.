import calculateMathematicalExpectation from "./mathematicalExpectation.js";

export default function calculateOrderAutocovariance(timeSeries) {
  if (timeSeries.numberOfTimeSeries > 99) {
    //Автоковаріація порядку p0
    timeSeries.orderAutocovariance.push(timeSeries.dispersion.biasedEstimate);

    //Автоковаріація порядку p1
    let sum = 0;
    for (let i = 1; i < timeSeries.numberOfTimeSeries; i++) {
      sum +=
        (timeSeries.stockPrices[i] - timeSeries.mathematicalExpectation) *
        (timeSeries.stockPrices[i - 1] - timeSeries.mathematicalExpectation);
    }
    //Автоковаріація порядку p1, зміщена оцінка
    timeSeries.orderAutocovariance.push(
      (1 / timeSeries.numberOfTimeSeries) * sum
    );
    // console.log(`biased Estimate = ${this.orderAutocovariance[1]}`);

    //Автоковаріація порядку p1, незміщена оцінка
    timeSeries.orderAutocovariance.push(
      (1 / (timeSeries.numberOfTimeSeries - 1)) * sum
    );
  } else if (timeSeries.numberOfTimeSeries < 100) {
    timeSeries.orderAutocovariance.push(timeSeries.dispersion.biasedEstimate);
    let sum = 0;
    let timeLag = 1;

    while (timeSeries.numberOfTimeSeries - timeLag != 1) {
      calculateMathematicalExpectation(
        timeSeries,
        timeSeries.stockPrices,
        true,
        timeLag
      );

      for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
        sum +=
          (timeSeries.stockPrices[i] - timeSeries.mathematicalExpectationY1) *
          (timeSeries.stockPrices[i + timeLag] -
            timeSeries.mathematicalExpectationY2);
      }
      timeSeries.orderAutocovariance.push(
        (1 / (timeSeries.numberOfTimeSeries - timeLag)) * sum
      );

      sum = 0;
      timeLag++;
    }
  }
}
