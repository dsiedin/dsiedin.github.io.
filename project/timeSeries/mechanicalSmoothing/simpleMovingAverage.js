const isNumber = (subject) =>
  typeof subject === "number" &&
  // is not NaN: `NaN === NaN` => `false`
  subject === subject;

const isArray = Array.isArray;

const simpleMovingAverage = (data, size) => {
  const length = data.length;

  if (!size) {
    return data.reduce((a, b) => a + b) / length;
  }

  if (size <= 1) {
    return data.slice();
  }

  if (size > length) {
    return Array(length);
  }

  const prepare = size - 1;
  const ret = [];
  let sum = 0;
  let i = 0;
  let counter = 0;
  let datum;

  for (; i < length && counter < prepare; i++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
      counter++;
    }
  }

  for (; i < length; i++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
    }

    if (isNumber(data[i - size])) {
      sum -= data[i - size];
    }

    ret[i] = sum / size;
  }

  return ret;
};

function predictSimpleMovingAverageValues(timeSeries, count, period = 3) {
  const m = timeSeries.mechanicalSmoothing.simpleMovingAverage.values;
  const y = timeSeries.stockPrices;
  const lengthBefore = timeSeries.numberOfTimeSeries;

  let numberPredictedValues = 0;
  let i = timeSeries.numberOfTimeSeries - 1;

  while (numberPredictedValues < count) {
    const newPrice = m[i - 1] + (1 / period) * (y[i] - y[i - 1]);
    timeSeries.predictedFuturePrices.mechanical.push(newPrice);
    y.push(newPrice);
    numberPredictedValues++;

    const newMovingAvg = (y[i - 1] + y[i] + y[i + 1]) / period;
    m.push(newMovingAvg);
    console.log(`m: ${newMovingAvg}\t\ty: ${newPrice}`);
    i++;
  }

  timeSeries.stockPrices = y.slice(0, lengthBefore);
}

export { simpleMovingAverage, predictSimpleMovingAverageValues };

// function predictSimpleMovingAverageValues(
//   timeSeries,
//   count,
//   period = 3,
//   m = timeSeries.mechanicalSmoothing.simpleMovingAverage.values,
//   y = timeSeries.stockPrices
// ) {
//   let numberPredictedValues = 0;

//   for (
//     let i = timeSeries.numberOfTimeSeries - 1;
//     numberPredictedValues < count;
//     i++
//   ) {
//     timeSeries.predictedFuturePrices.mechanical.push(
//       timeSeries.mechanicalSmoothing.simpleMovingAverage.values[i] +
//         (1 / period) *
//           (timeSeries.stockPrices[i] - timeSeries.stockPrices[i - 1])
//     );
//     timeSeries.stockPrices.push(
//       timeSeries.mechanicalSmoothing.simpleMovingAverage.values[i] +
//         (1 / period) *
//           (timeSeries.stockPrices[i] - timeSeries.stockPrices[i - 1])
//     );
//     numberPredictedValues++;

//     timeSeries.mechanicalSmoothing.simpleMovingAverage.values.push(
//       (timeSeries.stockPrices[i - 1] +
//         timeSeries.stockPrices[i] +
//         timeSeries.stockPrices[i + 1]) /
//         period
//     );
//     console.log(
//       `m: ${timeSeries.mechanicalSmoothing.simpleMovingAverage.values[i]}\t\ty: ${timeSeries.stockPrices[i]}`
//     );
//   }
//   timeSeries.stockPrices = timeSeries.stockPrices.slice(0, 120);
// }
