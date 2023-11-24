export default function detectAbnormalValues(timeSeries) {
  let res = [];
  let hasAbnormalValues = false;
  let counter = 0;

  for (let i = 0; i < timeSeries.numberOfTimeSeries - 1; i++) {
    res.push(
      Math.abs(
        (timeSeries.stockPrices[i + 1] - timeSeries.stockPrices[i]) /
          Math.sqrt(timeSeries.dispersion.unbiasedEstimate)
      )
    );
  }

  for (let i = 0; i < res.length; i++) {
    if (res[i] > 1.2) {
      timeSeries.hasAbnormalValues = true;
      counter++;
      if (counter == 2) {
        timeSeries.stockPrices[i] =
          (timeSeries.stockPrices[i - 1] + timeSeries.stockPrices[i + 1]) / 2;
        counter = 0;
      }
      console.log(`Abnormal value i=${i} : ${res[i]}`);
      hasAbnormalValues = true;
    } else if (i === res.length - 1 && hasAbnormalValues === false) {
      console.log(`There are no abnormal values!`);
    }
  }
}
