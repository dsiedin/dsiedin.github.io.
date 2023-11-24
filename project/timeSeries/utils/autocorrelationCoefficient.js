import calculateMathematicalExpectation from "./mathematicalExpectation.js";

export default function calculateAutocorrelationCoefficient(
  timeSeries,
  values = [],
  mathExpect = 0
) {
  if (
    timeSeries.numberOfTimeSeries > 99 &&
    values.length == 0 &&
    mathExpect == 0
  ) {
    // Коефіцієнт автокореляції порядку від p1 до p(n-1)
    let numerator = 0;
    let denominator = 0;
    let timeLag = 1;
    while (
      timeSeries.numberOfTimeSeries - timeLag !=
      Math.ceil(timeSeries.numberOfTimeSeries / 1.5) - 1
    ) {
      for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
        numerator +=
          (timeSeries.stockPrices[i] - timeSeries.mathematicalExpectation) *
          (timeSeries.stockPrices[i + timeLag] -
            timeSeries.mathematicalExpectation);
      }
      for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
        denominator += Math.pow(
          timeSeries.stockPrices[i] - timeSeries.mathematicalExpectation,
          2
        );
      }

      timeSeries.autocorrelationCoefficient.push(numerator / denominator);
      timeLag++;
    }
  } else if (timeSeries.numberOfTimeSeries > 99 && values.length != 0) {
    let numerator = 0;
    let denominator = 0;
    let timeLag = 1;
    timeSeries.randomComponent.autocorrelationCoefficient = [];
    while (timeSeries.numberOfTimeSeries - timeLag != 1) {
      for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
        numerator +=
          (values[i] - mathExpect) * (values[i + timeLag] - mathExpect);
      }
      for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
        if (values[i] == 0 && mathExpect == 0) {
          denominator += 0;
        } else {
          denominator += Math.pow(values[i] - mathExpect, 2);
        }
      }

      if (numerator == 0 && denominator == 0) {
        timeSeries.randomComponent.autocorrelationCoefficient.push(0.002);
      } else {
        timeSeries.randomComponent.autocorrelationCoefficient.push(
          numerator / denominator
        );
      }

      timeLag++;
    }
  } else if (timeSeries.numberOfTimeSeries < 100 && values.length == 0) {
    let numerator = 0;
    let denominator = 0;
    let timeLag = 1;
    while (timeSeries.numberOfTimeSeries - timeLag >= 1) {
      console.log(
        timeSeries.numberOfTimeSeries - timeSeries.numberOfTimeSeries + 1
      );
      for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
        numerator +=
          (timeSeries.stockPrices[i] - timeSeries.mathematicalExpectation) *
          (timeSeries.stockPrices[i + timeLag] -
            timeSeries.mathematicalExpectation);
      }
      for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
        denominator += Math.pow(
          timeSeries.stockPrices[i] - timeSeries.mathematicalExpectation,
          2
        );
      }

      timeSeries.autocorrelationCoefficient.push(numerator / denominator);
      timeLag++;
    }
  } else if (timeSeries.numberOfTimeSeries < 100 && values.length != 0) {
    let numerator = 0;
    let denominator = 0;
    let timeLag = 1;
    timeSeries.randomComponent.autocorrelationCoefficient = [];
    while (timeSeries.numberOfTimeSeries - timeLag >= 1) {
      for (let i = 0; i < timeSeries.numberOfTimeSeries - timeLag; i++) {
        numerator +=
          (values[i] - mathExpect) * (values[i + timeLag] - mathExpect);
      }
      for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
        if (values[i] == 0 && mathExpect == 0) {
          denominator += 0;
        } else {
          denominator += Math.pow(values[i] - mathExpect, 2);
        }
      }

      if (numerator == 0 && denominator == 0) {
        timeSeries.randomComponent.autocorrelationCoefficient.push(0.002);
      } else {
        timeSeries.randomComponent.autocorrelationCoefficient.push(
          numerator / denominator
        );
      }

      timeLag++;
    }
  }
}
