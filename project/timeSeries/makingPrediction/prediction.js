import calculateForecastAccuracy from "./forecastAccuracy.js";

export default function predict(timeSeries, number) {
  if (
    timeSeries.trend.analytical.parameters.determinationCoefficient <
    timeSeries.trend.mechanical.parameters.determinationCoefficient
  ) {
    timeSeries.trend.mechanical.parameters.predict(timeSeries, number);
  } else {
    for (let i = 1; i < number + 1; i++) {
      timeSeries.predictedFuturePrices.analytical.push(
        timeSeries.trend.analytical.parameters.predict(
          timeSeries.numberOfTimeSeries + i
        )[1]
      );
    }
  }

  let modelPrices =
    timeSeries.predictedFuturePrices.analytical.length == 0
      ? timeSeries.trend.mechanical.parameters.values
      : timeSeries.trend.analytical.parameters.values;

  calculateForecastAccuracy(timeSeries, "best", modelPrices);

  // calculateForecastAccuracy(timeSeries, 'best', predictedFuturePrices);
}
