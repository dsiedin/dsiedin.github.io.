export default function analyzeCorelogram(timeSeries, autoCorelCoefValues) {
  let highestValueIndex = 0;
  let isStationary = true;
  //was i < autoCorelCoefValues.length / 3
  for (let i = 0; i < 20; i++) {
    if (
      Math.abs(autoCorelCoefValues[highestValueIndex]) <
      Math.abs(autoCorelCoefValues[i])
    ) {
      highestValueIndex = i;
    }
  }

  for (let i = 0; i < 20; i++) {
    if (
      autoCorelCoefValues[i] < timeSeries.confidenceInterval[0] ||
      autoCorelCoefValues[i] > timeSeries.confidenceInterval[1]
    ) {
      isStationary = false;
      break;
    }
  }
  console.log(`highest index:`, highestValueIndex);

  if (highestValueIndex == 0) {
    timeSeries.hasSeasonalComponent = false;
  } else if (highestValueIndex != 0) {
    timeSeries.hasSeasonalComponent = true;
  }
}
