const isNumber = (subject) =>
  typeof subject === "number" &&
  // is not NaN: `NaN === NaN` => `false`
  subject === subject;

const isArray = Array.isArray;

// Dynamic Weighted Moving Average
let dynamicWeightedMovingAverage = (data, alpha, noHead) => {
  const length = data.length;

  if (alpha > 1) {
    return Array(length);
  }

  if (alpha === 1) {
    return data.slice();
  }

  const noArrayWeight = !isArray(alpha);
  const ret = [];

  let datum;

  // period `i`
  let i = 0;

  // `s` is the value of the DWMA at any time period `i`
  let s = 0;

  // Handles head
  for (; i < length; i++) {
    datum = data[i];

    if (isNumber(datum) && (noArrayWeight || isNumber(datum))) {
      ret[i] = noHead ? 0 : datum;

      s = datum;
      i++;

      break;
    }
  }

  // Dynamic weights: an array of weights
  // Ref:
  // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
  // with a dynamic alpha
  if (!noArrayWeight) {
    for (; i < length; i++) {
      datum = data[i];

      isNumber(datum) && isNumber(alpha[i])
        ? (s = ret[i] = alpha[i] * datum + (1 - alpha[i]) * s)
        : (ret[i] = ret[i - 1]);
    }

    return ret;
  }

  const o = 1 - alpha;

  // Fixed alpha
  for (; i < length; i++) {
    datum = data[i];

    isNumber(datum)
      ? (s = ret[i] = alpha * datum + o * s)
      : (ret[i] = ret[i - 1]);
  }

  return ret;
};

// Exponential moving average with 86% total weight
let exponentialSmoothing = (data, size) => {
  return dynamicWeightedMovingAverage(data, 2 / (size + 1));
};

function predictExponentialValues(timeSeries, count, period = 3) {
  const alpha = 2 / (period + 1);
  const lengthBefore = timeSeries.numberOfTimeSeries;
  for (let i = timeSeries.numberOfTimeSeries - 1; count > 0; i++, count--) {
    const stockPrice = timeSeries.stockPrices[i];
    const expMAValue =
      timeSeries.mechanicalSmoothing.exponentialMovingAverage.values[i];
    const predictedPrice = alpha * stockPrice + (1 - alpha) * expMAValue;
    timeSeries.predictedFuturePrices.mechanical.push(predictedPrice);
    timeSeries.stockPrices.push(predictedPrice);
    timeSeries.mechanicalSmoothing.exponentialMovingAverage.values =
      exponentialSmoothing(timeSeries.stockPrices, 4);
    timeSeries.mechanicalSmoothing.exponentialMovingAverage.values.push(
      alpha * stockPrice + (1 - alpha) * expMAValue
    );
  }
  timeSeries.stockPrices = timeSeries.stockPrices.slice(0, lengthBefore);
}

export { exponentialSmoothing, predictExponentialValues };

// function predictExponentialValues(
//   timeSeries,
//   count,
//   period = 3,
//   alpha = 2 / (period + 1)
// ) {
//   let numberPredictedValues = 0;

//   for (
//     let i = timeSeries.numberOfTimeSeries - 1;
//     numberPredictedValues < count;
//     i++
//   ) {
//     timeSeries.predictedFuturePrices.mechanical.push(
//       alpha * timeSeries.stockPrices[i] +
//         (1 - alpha) *
//           timeSeries.mechanicalSmoothing.exponentialMovingAverage.values[i]
//     );
//     timeSeries.stockPrices.push(
//       alpha * timeSeries.stockPrices[i] +
//         (1 - alpha) *
//           timeSeries.mechanicalSmoothing.exponentialMovingAverage.values[i]
//     );

//     timeSeries.mechanicalSmoothing.exponentialMovingAverage.values =
//       exponentialSmoothing(timeSeries.stockPrices, 4);

//     timeSeries.mechanicalSmoothing.exponentialMovingAverage.values.push(
//       alpha * timeSeries.stockPrices[i] +
//         (1 - alpha) *
//           timeSeries.mechanicalSmoothing.exponentialMovingAverage.values[i]
//     );

//     // console.log(
//     //   `u = ${
//     //     this.mechanicalSmoothing.exponentialMovingAverage.values[i + 1]
//     //   }\t\ty = ${this.predictedFuturePrices.mechanical[i - 119]}`
//     // );
//     numberPredictedValues++;
//   }
//   timeSeries.stockPrices = timeSeries.stockPrices.slice(0, 120);
// }
