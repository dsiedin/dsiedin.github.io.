import {
  simpleMovingAverage,
  predictSimpleMovingAverageValues,
} from "./simpleMovingAverage.js";
import {
  exponentialSmoothing,
  predictExponentialValues,
} from "./exponentialSmoothing.js";
import calculateDeterminationCoefficient from "../utils/determinationCoefficient.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

export default function mechanicalSmoothing(
  timeSeries,
  interval,
  data = timeSeries.stockPrices
) {
  let sma = timeSeries.mechanicalSmoothing.simpleMovingAverage;
  let ema = timeSeries.mechanicalSmoothing.exponentialMovingAverage;

  sma.values = simpleMovingAverage(data, interval);
  sma.predict = (timeSeries, period) =>
    predictSimpleMovingAverageValues(timeSeries, period);

  ema.values = exponentialSmoothing(data, interval);
  ema.predict = (timeSeries, period) =>
    predictExponentialValues(timeSeries, period);

  removeEmptyValues(timeSeries, sma.values, interval);
  removeEmptyValues(timeSeries, ema.values, interval);

  sma.determinationCoefficient = round(
    calculateDeterminationCoefficient(data, sma.values),
    3
  );
  ema.determinationCoefficient = round(
    calculateDeterminationCoefficient(data, ema.values),
    3
  );

  calculateMovingAverageModelAccuracy(timeSeries, 2);
  calculateExponentialSmoothingModelAccuracy(timeSeries, 2);
}

function calculateMovingAverageModelAccuracy(timeSeries, number) {
  timeSeries.predictedFuturePrices.mechanical = [];
  timeSeries.mechanicalSmoothing.simpleMovingAverage.predict(
    timeSeries,
    number
  );

  calculateForecastAccuracy(
    timeSeries,
    "ma",
    timeSeries.mechanicalSmoothing.simpleMovingAverage.values
  );

  timeSeries.mechanicalSmoothing.simpleMovingAverage.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.mechanicalSmoothing.simpleMovingAverage.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.mechanicalSmoothing.simpleMovingAverage.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.mechanicalSmoothing.simpleMovingAverage.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.mechanicalSmoothing.simpleMovingAverage.mse =
    timeSeries.trend.forecastAccuracy.mse;

  timeSeries.predictedFuturePrices.mechanical = [];
}

function calculateExponentialSmoothingModelAccuracy(timeSeries, number) {
  timeSeries.predictedFuturePrices.mechanical = [];
  timeSeries.mechanicalSmoothing.exponentialMovingAverage.predict(
    timeSeries,
    number
  );

  calculateForecastAccuracy(
    timeSeries,
    "ema",
    timeSeries.mechanicalSmoothing.exponentialMovingAverage.values
  );

  timeSeries.mechanicalSmoothing.exponentialMovingAverage.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.mechanicalSmoothing.exponentialMovingAverage.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.mechanicalSmoothing.exponentialMovingAverage.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.mechanicalSmoothing.exponentialMovingAverage.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.mechanicalSmoothing.exponentialMovingAverage.mse =
    timeSeries.trend.forecastAccuracy.mse;

  timeSeries.predictedFuturePrices.mechanical = [];
}

function round(number, precision) {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

function removeEmptyValues(timeSeries, data, interval) {
  let values = timeSeries.stockPrices.slice(0, interval);
  for (let i = 0; i < interval; i++) {
    data.shift();
  }

  for (let i = interval - 1; i >= 0; i--) {
    data.unshift(values[i]);
  }
}
