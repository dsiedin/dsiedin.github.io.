export default function compareAnalyticalModels(
  timeSeries,
  isFindingTrend = false
) {
  const models = [
    {
      model: "Лінійна модель",
      parameters: timeSeries.analyticalSmoothing.linearModel,
    },
    {
      model: "Експоненційна модель",
      parameters: timeSeries.analyticalSmoothing.exponentialModel,
    },
    {
      model: "Логаріфмічна модель",
      parameters: timeSeries.analyticalSmoothing.logarithmicModel,
    },
    {
      model: "Степенева модель",
      parameters: timeSeries.analyticalSmoothing.powerModel,
    },
    {
      model: "Поліноміальна модель",
      parameters: timeSeries.analyticalSmoothing.polynomialModel,
    },
  ];

  // const result = models.reduce((best, current) => {
  //   return current.parameters.determinationCoefficient >
  //     best.parameters.determinationCoefficient
  //     ? current
  //     : best;
  // });
  const result = models.reduce((best, current) => {
    if (
      current.parameters.determinationCoefficient >
      best.parameters.determinationCoefficient
    ) {
      return current;
    } else if (
      current.parameters.determinationCoefficient ===
      best.parameters.determinationCoefficient
    ) {
      return current.parameters.mape < best.parameters.mape ? current : best;
    } else {
      return best;
    }
  });

  if (isFindingTrend) {
    timeSeries.trend.analytical = result;
  } else {
    timeSeries.smoothedInputData.analytical = result;
  }
}
