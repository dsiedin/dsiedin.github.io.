function initializeProperties(timeSeries) {
  timeSeries.mathematicalExpectation = 0;
  timeSeries.dispersion = { biasedEstimate: 0, unbiasedEstimate: 0 };
  timeSeries.orderAutocovariance = [];
  timeSeries.autocorrelationCoefficient = [];
  timeSeries.hasTrend = false;
  timeSeries.hasSeasonalComponent = false;
  timeSeries.isStationary = false;
  timeSeries.hasAbnormalValues = false;
  timeSeries.predictedFuturePrices = {
    analytical: [],
    mechanical: [],
  };
  timeSeries.predictedFutureDates = [];

  const defaultModel = {
    determinationCoefficient: 0,
    values: [],
    predict: null,
  };

  timeSeries.analyticalSmoothing = {
    linearModel: { ...defaultModel, m: 0, c: 0 },
    exponentialModel: { ...defaultModel, a: 0, b: 0 },
    logarithmicModel: { ...defaultModel, a: 0, b: 0 },
    powerModel: { ...defaultModel, a: 0, b: 0 },
    polynomialModel: { ...defaultModel, a: [] },
  };

  timeSeries.mechanicalSmoothing = {
    simpleMovingAverage: { ...defaultModel },
    exponentialMovingAverage: { ...defaultModel },
  };

  timeSeries.smoothedInputData = { analytical: {}, mechanical: {} };
  timeSeries.trend = {
    analytical: {},
    mechanical: {},
    forecastAccuracy: {
      mfe: 0,
      mae: 0,
      mape: 0,
      mpe: 0,
      mse: 0,
    },
  };

  timeSeries.randomComponent = {
    values: [],
    mathematicalExpectation: 0,
    autocorrelationCoefficient: [],
    dispersion: { unbiasedEstimate: 0 },
  };

  timeSeries.seasonalComponent = { values: [] };
}

function fillProperties(timeSeries, oldValues) {
  timeSeries.stockPrices = oldValues.stockPrices;
  timeSeries.dates = oldValues.dates;
  timeSeries.actualFuturePrices = oldValues.actualFuturePrices;
  timeSeries.actualFutureDates = oldValues.actualFutureDates;
  timeSeries.numberOfTimeSeries = oldValues.numberOfTimeSeries;
  timeSeries.confidenceInterval = oldValues.confidenceInterval;
  timeSeries.mathematicalExpectation = oldValues.mathematicalExpectation;
  timeSeries.dispersion = oldValues.dispersion;
  timeSeries.orderAutocovariance = oldValues.orderAutocovariance;
  timeSeries.autocorrelationCoefficient = oldValues.autocorrelationCoefficient;
  timeSeries.hasTrend = oldValues.hasTrend;
  timeSeries.hasSeasonalComponent = oldValues.hasSeasonalComponent;
  timeSeries.isStationary = oldValues.isStationary;
  timeSeries.predictedFuturePrices = oldValues.predictedFuturePrices;
  timeSeries.predictedFutureDates = oldValues.predictedFutureDates;
  timeSeries.analyticalSmoothing = oldValues.analyticalSmoothing;
  timeSeries.mechanicalSmoothing = oldValues.mechanicalSmoothing;
  timeSeries.smoothedInputData = oldValues.smoothedInputData;
  timeSeries.trend = oldValues.trend;
  timeSeries.randomComponent = oldValues.randomComponent;
  timeSeries.seasonalComponent = oldValues.seasonalComponent;
  timeSeries.ARCoeffs = oldValues.ARCoeffs;
}

export { initializeProperties, fillProperties };
