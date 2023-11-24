export default function transformDataForRegression(timeSeries, arrayValues) {
  let x = Array.from(
    { length: timeSeries.numberOfTimeSeries },
    (_, index) => index + 1
  );
  let data = [];

  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    data.push([x[i], arrayValues[i]]);
  }

  return data;
}
