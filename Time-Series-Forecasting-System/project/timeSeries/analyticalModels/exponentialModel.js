import transformDataForRegression from "./dataTransformer.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

function calculateExponentialModel(timeSeries, inputData) {
  let data = transformDataForRegression(timeSeries, inputData);

  calculateExponentialModelCoefficients(timeSeries, data);

  calculateExponentialModelValues(
    timeSeries,
    timeSeries.analyticalSmoothing.exponentialModel.a,
    timeSeries.analyticalSmoothing.exponentialModel.b
  );

  calculateExponentialModelAccuracy(timeSeries, 2);
}

function calculateExponentialModelCoefficients(timeSeries, data) {
  let result = regression.exponential(data, { precision: 3 });

  timeSeries.analyticalSmoothing.exponentialModel.a = result.equation[0];
  timeSeries.analyticalSmoothing.exponentialModel.b = result.equation[1];
  timeSeries.analyticalSmoothing.exponentialModel.determinationCoefficient =
    result.r2;
  timeSeries.analyticalSmoothing.exponentialModel.predict = result.predict;
}

function calculateExponentialModelValues(timeSeries, a, b) {
  timeSeries.analyticalSmoothing.exponentialModel.values = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => {
      let i = index + 1;
      return a * Math.exp(b * i);
    }
  );
}

function calculateExponentialModelAccuracy(timeSeries, number) {
  // let predictedFuturePrices = [];
  // for (let i = 1; i < number + 1; i++) {
  //   predictedFuturePrices.push(
  //     timeSeries.analyticalSmoothing.exponentialModel.predict(
  //       timeSeries.numberOfTimeSeries + i
  //     )[1]
  //   );
  // }

  calculateForecastAccuracy(
    timeSeries,
    "exponential",
    timeSeries.analyticalSmoothing.exponentialModel.values
  );

  timeSeries.analyticalSmoothing.exponentialModel.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.analyticalSmoothing.exponentialModel.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.analyticalSmoothing.exponentialModel.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.analyticalSmoothing.exponentialModel.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.analyticalSmoothing.exponentialModel.mse =
    timeSeries.trend.forecastAccuracy.mse;
}

export default calculateExponentialModel;
