export default function calculateForecastAccuracy(
  timeSeries,
  model,
  predictedFuturePrices
) {
  timeSeries.trend.forecastAccuracy.mfe = meanForecastError(
    timeSeries,
    model,
    predictedFuturePrices
  );
  timeSeries.trend.forecastAccuracy.mae = meanAbsoluteError(
    timeSeries,
    model,
    predictedFuturePrices
  );
  timeSeries.trend.forecastAccuracy.mape = meanAbsolutePercentageError(
    timeSeries,
    model,
    predictedFuturePrices
  );
  timeSeries.trend.forecastAccuracy.mpe = meanPercentageError(
    timeSeries,
    model,
    predictedFuturePrices
  );
  timeSeries.trend.forecastAccuracy.mse = meanSquaredError(
    timeSeries,
    model,
    predictedFuturePrices
  );
}

function meanForecastError(timeSeries, model, predictedFuturePrices) {
  let mfe = 0;
  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    mfe += timeSeries.stockPrices[i] - predictedFuturePrices[i];
  }
  let result = (1 / timeSeries.numberOfTimeSeries) * mfe;

  return result;
}

function meanAbsoluteError(timeSeries, model, predictedFuturePrices) {
  let mae = 0;
  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    mae += Math.abs(timeSeries.stockPrices[i] - predictedFuturePrices[i]);
  }
  let result = (1 / timeSeries.numberOfTimeSeries) * mae;

  return result;
}

function meanAbsolutePercentageError(timeSeries, model, predictedFuturePrices) {
  let mape = 0;
  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    mape += Math.abs(
      (timeSeries.stockPrices[i] - predictedFuturePrices[i]) /
        timeSeries.stockPrices[i]
    );
  }
  let result = (1 / timeSeries.numberOfTimeSeries) * mape * 100;

  return result;
}

function meanPercentageError(timeSeries, model, predictedFuturePrices) {
  let mpe = 0;
  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    mpe +=
      (timeSeries.stockPrices[i] - predictedFuturePrices[i]) /
      timeSeries.stockPrices[i];
  }
  let result = (1 / timeSeries.numberOfTimeSeries) * mpe * 100;

  return result;
}

function meanSquaredError(timeSeries, model, predictedFuturePrices) {
  let mse = 0;
  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    const error = timeSeries.stockPrices[i] - predictedFuturePrices[i];
    mse += Math.pow(error, 2);
  }
  let result = (1 / timeSeries.numberOfTimeSeries) * mse;

  return result;
}
