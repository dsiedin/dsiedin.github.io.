export default function calculateUnbiasedEstimate(
  timeSeries,
  arr,
  mathExpect,
  isDoubleArr = false
) {
  let sum = 0;
  let unbiasedEstimate = null;
  if (isDoubleArr === false) {
    sum = 0;
    unbiasedEstimate = 0;

    arr.forEach((timeRow) => (sum += Math.pow(timeRow - mathExpect, 2)));

    timeSeries.dispersion.unbiasedEstimate =
      (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;
  } else if (isDoubleArr === true) {
    sum = 0;
    unbiasedEstimate = [];

    arr[0].forEach((value) => (sum += Math.pow(value - mathExpect[0], 2)));
    unbiasedEstimate.push((1 / (arr[0].length - 1)) * sum);

    sum = 0;

    arr[1].forEach((value) => (sum += Math.pow(value - mathExpect[1], 2)));
    unbiasedEstimate.push((1 / (arr[1].length - 1)) * sum);

    return unbiasedEstimate;
  }
}
