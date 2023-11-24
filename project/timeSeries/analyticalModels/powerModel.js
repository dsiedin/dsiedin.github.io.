import transformDataForRegression from "./dataTransformer.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

export default function calculatePowerModel(timeSeries, inputData) {
  let data = transformDataForRegression(timeSeries, inputData);

  calculatePowerModelCoefficients(timeSeries, data);

  calculatePowerModelValues(
    timeSeries,
    timeSeries.analyticalSmoothing.powerModel.a,
    timeSeries.analyticalSmoothing.powerModel.b
  );

  calculatePowerModelAccuracy(timeSeries, 2);
}

function calculatePowerModelCoefficients(timeSeries, data) {
  let result = regression.power(data, { precision: 3 });

  timeSeries.analyticalSmoothing.powerModel.a = result.equation[0];
  timeSeries.analyticalSmoothing.powerModel.b = result.equation[1];
  timeSeries.analyticalSmoothing.powerModel.determinationCoefficient =
    result.r2;
  timeSeries.analyticalSmoothing.powerModel.predict = result.predict;
}

function calculatePowerModelValues(timeSeries, a, b) {
  timeSeries.analyticalSmoothing.powerModel.values = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => {
      let i = index + 1;
      return a * Math.pow(i, b);
    }
  );
}

function calculatePowerModelAccuracy(timeSeries, number) {
  // let predictedFuturePrices = [];
  // for (let i = 1; i < number + 1; i++) {
  //   predictedFuturePrices.push(
  //     timeSeries.analyticalSmoothing.powerModel.predict(
  //       timeSeries.numberOfTimeSeries + i
  //     )[1]
  //   );
  // }

  calculateForecastAccuracy(
    timeSeries,
    "power",
    timeSeries.analyticalSmoothing.powerModel.values
  );

  timeSeries.analyticalSmoothing.powerModel.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.analyticalSmoothing.powerModel.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.analyticalSmoothing.powerModel.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.analyticalSmoothing.powerModel.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.analyticalSmoothing.powerModel.mse =
    timeSeries.trend.forecastAccuracy.mse;
}
