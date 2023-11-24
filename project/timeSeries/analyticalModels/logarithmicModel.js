import transformDataForRegression from "./dataTransformer.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

export default function calculateLogarithmicModel(timeSeries, inputData) {
  let data = transformDataForRegression(timeSeries, inputData);

  calculateLogarithmicModelCoefficients(timeSeries, data);

  calculateLogarithmicModelValues(
    timeSeries,
    timeSeries.analyticalSmoothing.logarithmicModel.a,
    timeSeries.analyticalSmoothing.logarithmicModel.b
  );

  if (!isFinite(timeSeries.analyticalSmoothing.logarithmicModel.values[0])) {
    timeSeries.analyticalSmoothing.logarithmicModel.values[0] = 0;
  }

  calculateLogarithmicModelAccuracy(timeSeries, 2);
}

function calculateLogarithmicModelCoefficients(timeSeries, data) {
  let result = regression.logarithmic(data, { precision: 3 });

  timeSeries.analyticalSmoothing.logarithmicModel.a = result.equation[0];
  timeSeries.analyticalSmoothing.logarithmicModel.b = result.equation[1];
  timeSeries.analyticalSmoothing.logarithmicModel.determinationCoefficient =
    result.r2;
  timeSeries.analyticalSmoothing.logarithmicModel.predict = result.predict;
}

function calculateLogarithmicModelValues(timeSeries, a, b) {
  timeSeries.analyticalSmoothing.logarithmicModel.values = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => {
      let i = index + 1;
      return a + b * Math.log(i);
    }
  );
}

function calculateLogarithmicModelAccuracy(timeSeries, number) {
  // let predictedFuturePrices = [];
  // for (let i = 1; i < number + 1; i++) {
  //   predictedFuturePrices.push(
  //     timeSeries.analyticalSmoothing.logarithmicModel.predict(
  //       timeSeries.numberOfTimeSeries + i
  //     )[1]
  //   );
  // }

  calculateForecastAccuracy(
    timeSeries,
    "logarithmic",
    timeSeries.analyticalSmoothing.logarithmicModel.values
  );

  timeSeries.analyticalSmoothing.logarithmicModel.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.analyticalSmoothing.logarithmicModel.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.analyticalSmoothing.logarithmicModel.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.analyticalSmoothing.logarithmicModel.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.analyticalSmoothing.logarithmicModel.mse =
    timeSeries.trend.forecastAccuracy.mse;
}
