export default function compareMechanicalSmoothings(
  timeSeries,
  isFindingTrend = false
) {
  const [sma, ema] = [
    timeSeries.mechanicalSmoothing.simpleMovingAverage.determinationCoefficient,
    timeSeries.mechanicalSmoothing.exponentialMovingAverage
      .determinationCoefficient,
  ];

  const result =
    sma >= ema
      ? {
          model: "Просте ковзнє середнє",
          parameters: timeSeries.mechanicalSmoothing.simpleMovingAverage,
        }
      : {
          model: "Експоненційне згладжування",
          parameters: timeSeries.mechanicalSmoothing.exponentialMovingAverage,
        };

  if (isFindingTrend) {
    timeSeries.trend.mechanical = result;
  } else {
    timeSeries.smoothedInputData.mechanical = result;
  }
}
