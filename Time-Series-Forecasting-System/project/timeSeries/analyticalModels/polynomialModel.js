import transformDataForRegression from "./dataTransformer.js";
import calculateForecastAccuracy from "../makingPrediction/forecastAccuracy.js";

export default function calculatePolynomialModel(timeSeries, inputData) {
  let data = transformDataForRegression(timeSeries, inputData);

  calculatePolynomialModelCoefficients(timeSeries, data);

  calculatePolynomialModelValues(
    timeSeries,
    timeSeries.analyticalSmoothing.polynomialModel.a
  );

  calculatePolynomialModelAccuracy(timeSeries, 2);
}

function calculatePolynomialModelCoefficients(timeSeries, data) {
  let result = regression.polynomial(data, { precision: 3 });

  result.equation.forEach((res) => {
    timeSeries.analyticalSmoothing.polynomialModel.a.push(res);
  });
  timeSeries.analyticalSmoothing.polynomialModel.determinationCoefficient =
    result.r2;
  timeSeries.analyticalSmoothing.polynomialModel.predict = result.predict;
}

function calculatePolynomialModelValues(timeSeries, a) {
  timeSeries.analyticalSmoothing.polynomialModel.values = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => {
      let i = index + 1;
      return a[0] * Math.pow(i, 2) + a[1] * i + a[2];
    }
  );
}

function calculatePolynomialModelAccuracy(timeSeries, number) {
  // let predictedFuturePrices = [];
  // for (let i = 1; i < number + 1; i++) {
  //   predictedFuturePrices.push(
  //     timeSeries.analyticalSmoothing.polynomialModel.predict(
  //       timeSeries.numberOfTimeSeries + i
  //     )[1]
  //   );
  // }

  calculateForecastAccuracy(
    timeSeries,
    "polynomial",
    timeSeries.analyticalSmoothing.polynomialModel.values
  );

  timeSeries.analyticalSmoothing.polynomialModel.mape =
    timeSeries.trend.forecastAccuracy.mape;
  timeSeries.analyticalSmoothing.polynomialModel.mpe =
    timeSeries.trend.forecastAccuracy.mpe;
  timeSeries.analyticalSmoothing.polynomialModel.mfe =
    timeSeries.trend.forecastAccuracy.mfe;
  timeSeries.analyticalSmoothing.polynomialModel.mae =
    timeSeries.trend.forecastAccuracy.mae;
  timeSeries.analyticalSmoothing.polynomialModel.mse =
    timeSeries.trend.forecastAccuracy.mse;
}
