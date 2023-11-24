import transformDataForRegression from "./dataTransformer.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

function calculateLinearModel(timeSeries, inputData) {
  let data = transformDataForRegression(timeSeries, inputData);

  calculateLinearModelCoefficients(timeSeries, data);

  calculateLinearModelValues(
    timeSeries,
    timeSeries.analyticalSmoothing.linearModel.m,
    timeSeries.analyticalSmoothing.linearModel.c
  );

  calculateLinearModelAccuracy(timeSeries, 2);
}

function calculateLinearModelCoefficients(timeSeries, data) {
  let result = regression.linear(data, { precision: 3 });

  timeSeries.analyticalSmoothing.linearModel.m = result.equation[0];
  timeSeries.analyticalSmoothing.linearModel.c = result.equation[1];
  timeSeries.analyticalSmoothing.linearModel.determinationCoefficient =
    result.r2;

  timeSeries.analyticalSmoothing.linearModel.predict = result.predict;
}

function calculateLinearModelValues(timeSeries, m, c) {
  timeSeries.analyticalSmoothing.linearModel.values = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => {
      let i = index + 1;
      return m * i + c;
    }
  );
}

function calculateLinearModelAccuracy(timeSeries, number) {
  // let predictedFuturePrices = [];
  // for (let i = 1; i < number + 1; i++) {
  //   predictedFuturePrices.push(
  //     timeSeries.analyticalSmoothing.linearModel.predict(
  //       timeSeries.numberOfTimeSeries + i
  //     )[1]
  //   );
  // }

  calculateForecastAccuracy(
    timeSeries,
    "linear",
    timeSeries.analyticalSmoothing.linearModel.values
  );

  timeSeries.analyticalSmoothing.linearModel.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.analyticalSmoothing.linearModel.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.analyticalSmoothing.linearModel.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.analyticalSmoothing.linearModel.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.analyticalSmoothing.linearModel.mse =
    timeSeries.trend.forecastAccuracy.mse;
}

export default calculateLinearModel;
