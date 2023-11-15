export default function calculateBiasedEstimate(timeSeries) {
  let sum = 0;

  timeSeries.stockPrices.forEach((timeRow) => {
    sum += Math.pow(timeRow - timeSeries.mathematicalExpectation, 2);
  });

  timeSeries.dispersion.biasedEstimate =
    (1 / timeSeries.numberOfTimeSeries) * sum;
}
