import { createChart, createCorrelogram, createDataset } from "./chartUtils.js";

function createDataChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  createChart("dataChart", "Графік часового ряду", timeSeries.dates, [
    initialDataset,
  ]);
}

function createDataCorrelogram(timeSeries) {
  let correlogramLabels = Array.from(
    { length: 20 },
    (_, index) => `${index + 1}`
  );
  let confidenceIntervalValues = [];
  confidenceIntervalValues.push(
    Array.from({ length: 20 }, (_) => timeSeries.confidenceInterval[0])
  );
  confidenceIntervalValues.push(
    Array.from({ length: 20 }, (_) => timeSeries.confidenceInterval[1])
  );
  const lowerConfidenceIntervalDataset = createDataset(
    "Довірчий інтервал",
    confidenceIntervalValues[0],
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f87171",
      pointRadius: 0,
      borderDash: [25, 15],
      borderWidth: 5,
    }
  );
  const higherConfidenceIntervalDataset = createDataset(
    "Довірчий інтервал",
    confidenceIntervalValues[1],
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f87171",
      pointRadius: 0,
      borderDash: [25, 15],
      borderWidth: 5,
    }
  );
  const autocorrelationCoefficientDataset = createDataset(
    "Коефіцієнт автокореляції",
    timeSeries.autocorrelationCoefficient,
    {
      type: "bar",
      categoryPercentage: 0.5,
      backgroundColor: "#60a5fa",
      borderColor: "#3b82f6",
      pointRadius: 5,
    }
  );
  createCorrelogram(
    "dataCorrelogram",
    "Корелограма цін акцій",
    correlogramLabels,
    [
      higherConfidenceIntervalDataset,
      autocorrelationCoefficientDataset,
      lowerConfidenceIntervalDataset,
    ]
  );
}

function createAnalyticalModelsCharts(timeSeries) {
  createLinearModelChart(timeSeries);
  createExponentialModelChart(timeSeries);
  createLogarithmicModelChart(timeSeries);
  createPowerModelChart(timeSeries);
  createPolynomialModelChart(timeSeries);
}

function createMechanicalModelsCharts(timeSeries) {
  createSimpleMovingAverageChart(timeSeries);
  createExponentialSmothing(timeSeries);
}

function createSimpleMovingAverageChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const simpleMovingAverageLabel = `MA`;
  const simpleMovingAverageDataset = createDataset(
    simpleMovingAverageLabel,
    timeSeries.mechanicalSmoothing.simpleMovingAverage.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#a78bfa",
      backgroundColor: "white",
    }
  );
  createChart("simpleMovingAverageChart", "MA", timeSeries.dates, [
    simpleMovingAverageDataset,
    initialDataset,
  ]);
}

function createExponentialSmothing(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const exponentialSmoothingLabel = `EMA`;
  const exponentialSmoothingDataset = createDataset(
    exponentialSmoothingLabel,
    timeSeries.mechanicalSmoothing.exponentialMovingAverage.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#a78bfa",
      backgroundColor: "white",
    }
  );
  createChart("exponentialSmoothingChart", "EMA", timeSeries.dates, [
    exponentialSmoothingDataset,
    initialDataset,
  ]);
}

function createLinearModelChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const linearModelLabel = `y = ${
    timeSeries.analyticalSmoothing.linearModel.m
  }x ${timeSeries.analyticalSmoothing.linearModel.c > 0 ? "+" : "-"} ${Math.abs(
    timeSeries.analyticalSmoothing.linearModel.c
  )}`;
  const linearModelDataset = createDataset(
    linearModelLabel,
    timeSeries.analyticalSmoothing.linearModel.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "white",
    }
  );
  createChart("linearModelChart", "Лінійна модель тренду", timeSeries.dates, [
    linearModelDataset,
    initialDataset,
  ]);
}

function createExponentialModelChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const exponentialModelLabel = `y = ${timeSeries.analyticalSmoothing.exponentialModel.a} * e^${timeSeries.analyticalSmoothing.exponentialModel.b}*x`;
  const exponentialModelDataset = createDataset(
    exponentialModelLabel,
    timeSeries.analyticalSmoothing.exponentialModel.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "white",
    }
  );
  createChart(
    "exponentialModelChart",
    "Експоненційна модель тренду",
    timeSeries.dates,
    [exponentialModelDataset, initialDataset]
  );
}

function createLogarithmicModelChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const logarithmicModelLabel = `y = ${
    timeSeries.analyticalSmoothing.logarithmicModel.a
  } ${
    timeSeries.analyticalSmoothing.logarithmicModel.b > 0 ? "+" : "-"
  } ${Math.abs(timeSeries.analyticalSmoothing.logarithmicModel.b)} * lnx`;
  const logarithmicModelDataset = createDataset(
    logarithmicModelLabel,
    timeSeries.analyticalSmoothing.logarithmicModel.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "white",
    }
  );
  createChart(
    "logarithmicModelChart",
    "Логаріфмічна модель тренду",
    timeSeries.dates,
    [logarithmicModelDataset, initialDataset]
  );
}

function createPowerModelChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const powerModelLabel = `y = ${timeSeries.analyticalSmoothing.powerModel.a} * x^${timeSeries.analyticalSmoothing.powerModel.b}`;
  const powerModelDataset = createDataset(
    powerModelLabel,
    timeSeries.analyticalSmoothing.powerModel.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "white",
    }
  );
  createChart("powerModelChart", "Степенева модель тренду", timeSeries.dates, [
    powerModelDataset,
    initialDataset,
  ]);
}

function createPolynomialModelChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const polynomialModelLabel = "Поліноміальна модель";
  // `y = ${
  //   timeSeries.analyticalSmoothing.polynomialModel.a[0]
  // } * t^2 ${
  //   timeSeries.analyticalSmoothing.polynomialModel.a[1] > 0
  //     ? `+ ${timeSeries.analyticalSmoothing.polynomialModel.a[1]} * t`
  //     : `- ${Math.abs(timeSeries.analyticalSmoothing.polynomialModel.a[1])} * t`
  // } ${
  //   timeSeries.analyticalSmoothing.polynomialModel.a[2] > 0
  //     ? `+ ${timeSeries.analyticalSmoothing.polynomialModel.a[2]}`
  //     : `- ${Math.abs(timeSeries.analyticalSmoothing.polynomialModel.a[2])}`
  // }`;
  const polynomialModelDataset = createDataset(
    polynomialModelLabel,
    timeSeries.analyticalSmoothing.polynomialModel.values,
    {
      type: "line",
      pointRadius: 0,
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "white",

      // borderWidth: 3,
      // borderColor: "#c084fc",
      // backgroundColor: "#c084fc",
      // pointRadius: 2,
    }
  );
  createChart(
    "polynomialModelChart",
    "Поліноміальна модель",
    timeSeries.dates,
    [polynomialModelDataset, initialDataset]
  );
}

function createTrendsComparasionChart(timeSeries) {
  const initialDataset = createDataset("Реальна ціна", timeSeries.stockPrices, {
    borderWidth: 3,
    borderColor: "#60a5fa",
    backgroundColor: "#60a5fa",
    pointRadius: 2,
  });
  const linearModelDataset = createDataset(
    "Лінійна модель",
    timeSeries.analyticalSmoothing.linearModel.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f87171",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const exponentialModelDataset = createDataset(
    "Експоненційна модель",
    timeSeries.analyticalSmoothing.exponentialModel.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#fb923c",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const logarithmicModelDataset = createDataset(
    "Логаріфмічна модель",
    timeSeries.analyticalSmoothing.logarithmicModel.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#facc15",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const powerModelDataset = createDataset(
    "Степенева модель",
    timeSeries.analyticalSmoothing.powerModel.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#34d399",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const polynomialModelDataset = createDataset(
    "Поліноміальна модель",
    timeSeries.analyticalSmoothing.polynomialModel.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#818cf8",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const simpleMovingAverageDataset = createDataset(
    "MA",
    timeSeries.mechanicalSmoothing.simpleMovingAverage.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#c084fc",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  const exponentialSmoothingDataset = createDataset(
    "EMA",
    timeSeries.mechanicalSmoothing.exponentialMovingAverage.values,
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f472b6",
      pointRadius: 0,
      borderWidth: 3,
    }
  );
  createChart(
    "comparasionTrendModels",
    "Порівняння трендових моделей",
    timeSeries.dates,
    [
      linearModelDataset,
      exponentialModelDataset,
      logarithmicModelDataset,
      powerModelDataset,
      polynomialModelDataset,
      simpleMovingAverageDataset,
      exponentialSmoothingDataset,
      initialDataset,
    ]
  );
}

function createRandomComponentChart(timeSeries) {
  // timeSeries.calculateRandomComponent();
  const randomComponentDataset = createDataset(
    "Значення випадкової компоненти",
    timeSeries.randomComponent.values,
    {
      borderWidth: 3,
      borderColor: "#34d399",
      backgroundColor: "#34d399",
      pointRadius: 2,
    }
  );
  createChart(
    "randomComponentChart",
    "Випадкова компонента",
    timeSeries.dates,
    [randomComponentDataset]
  );
}

function createRandomComponentCorrelogram(timeSeries) {
  let correlogramLabels = Array.from(
    { length: 20 },
    (_, index) => `${index + 1}`
  );
  let confidenceIntervalValues = [];
  confidenceIntervalValues.push(
    Array.from({ length: 20 }, (_) => timeSeries.confidenceInterval[0])
  );
  confidenceIntervalValues.push(
    Array.from({ length: 20 }, (_) => timeSeries.confidenceInterval[1])
  );
  const lowerConfidenceIntervalDataset = createDataset(
    "Довірчий інтервал",
    confidenceIntervalValues[0],
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f87171",
      pointRadius: 0,
      borderDash: [25, 15],
      borderWidth: 5,
    }
  );
  const higherConfidenceIntervalDataset = createDataset(
    "Довірчий інтервал",
    confidenceIntervalValues[1],
    {
      type: "line",
      backgroundColor: "white",
      borderColor: "#f87171",
      pointRadius: 0,
      borderDash: [25, 15],
      borderWidth: 5,
    }
  );
  const RandomComponentAutocorrelationCoefficientDataset = createDataset(
    "Коефіцієнт автокореляції",
    timeSeries.randomComponent.autocorrelationCoefficient,
    {
      type: "bar",
      categoryPercentage: 0.5,
      borderColor: "#34d399",
      backgroundColor: "#34d399",
    }
  );
  createCorrelogram(
    "randomComponentCorelogram",
    "Корелограма випадкової компоненти",
    correlogramLabels,
    [
      higherConfidenceIntervalDataset,
      RandomComponentAutocorrelationCoefficientDataset,
      lowerConfidenceIntervalDataset,
    ]
  );
}

function createPredictionChart(timeSeries) {
  let predictedPrices =
    timeSeries.predictedFuturePrices.mechanical.length == 0
      ? timeSeries.predictedFuturePrices.analytical
      : timeSeries.predictedFuturePrices.mechanical;

  const predictionDataset = createDataset(
    "Спрогнозована ціна",
    [
      ...new Array(timeSeries.stockPrices.length - 1).fill(null),
      timeSeries.trend.analytical.parameters.values[
        timeSeries.stockPrices.length - 1
      ],
      ...predictedPrices,
    ],
    {
      borderWidth: 4,
      borderColor: "#f87171",
      backgroundColor: "#f87171",
      pointRadius: 4,
    }
  );
  let predictionModelDataset;
  if (timeSeries.predictedFuturePrices.mechanical.length == 0) {
    predictionModelDataset = createDataset(
      timeSeries.trend.analytical.model,
      [...timeSeries.trend.analytical.parameters.values, predictedPrices[0]],
      {
        borderWidth: 3,
        borderColor: "#c084fc",
        backgroundColor: "#c084fc",
        pointRadius: 2,
      }
    );
  } else {
    console.log(timeSeries.trend.mechanical.parameters.values.length);

    predictionModelDataset = createDataset(
      timeSeries.trend.mechanical.model,
      [
        ...timeSeries.trend.mechanical.parameters.values.slice(
          0,
          timeSeries.dates.length
        ),
        predictedPrices[0],
      ],
      {
        borderWidth: 3,
        borderColor: "#c084fc",
        backgroundColor: "#c084fc",
        pointRadius: 2,
      }
    );
  }

  // console.log([
  //   ...timeSeries.trend.mechanical.parameters.values,
  //   predictedPrices[0],
  // ]);

  console.log(`was`, timeSeries.trend.mechanical.parameters.values);
  console.log(`now`, predictedPrices);

  const actualDataset = createDataset(
    "Реальна ціна",
    [...timeSeries.stockPrices, ...timeSeries.actualFuturePrices],
    {
      borderWidth: 3,
      borderColor: "#60a5fa",
      backgroundColor: "#60a5fa",
      pointRadius: 2,
    }
  );
  createChart(
    "predict",
    "Прогноз",
    [...timeSeries.dates, ...timeSeries.actualFutureDates],
    [predictionDataset, predictionModelDataset, actualDataset]
  );
}

export {
  createDataChart,
  createDataCorrelogram,
  createAnalyticalModelsCharts,
  createMechanicalModelsCharts,
  createTrendsComparasionChart,
  createRandomComponentChart,
  createRandomComponentCorrelogram,
  createPredictionChart,
};
