"use strict";

import calculateUnbiasedEstimate from "./utils/unbiasedEstimate.js";
import calculateBiasedEstimate from "./utils/biasedEstimate.js";
import calculateMathematicalExpectation from "./utils/mathematicalExpectation.js";
import calculateOrderAutocovariance from "./utils/orderAutocovariance.js";
import calculateAutocorrelationCoefficient from "./utils/autocorrelationCoefficient.js";
import detectAbnormalValues from "./utils/abnormalValues.js";
import checkTrend from "./checkingTrend/trend.js";
import analyzeCorelogram from "./utils/analyzeCorelogram.js";
import { initializeProperties, fillProperties } from "./utils/initProperies.js";
import calculateLinearModel from "./analyticalModels/linearModel.js";
import calculateExponentialModel from "./analyticalModels/exponentialModel.js";
import calculateLogarithmicModel from "./analyticalModels/logarithmicModel.js";
import calculatePowerModel from "./analyticalModels/powerModel.js";
import calculatePolynomialModel from "./analyticalModels/polynomialModel.js";
import {
  createDataChart,
  createDataCorrelogram,
  createAnalyticalModelsCharts,
  createMechanicalModelsCharts,
  createTrendsComparasionChart,
  createRandomComponentChart,
  createRandomComponentCorrelogram,
  createPredictionChart,
} from "./charts/charts.js";
import { calculateAR } from "./AR/ar.js";
import mechanicalSmoothing from "./mechanicalSmoothing/mechanicalSmoothing.js";
import compareMechanicalSmoothings from "./mechanicalSmoothing/comparasionSmoothings.js";
import compareAnalyticalModels from "./analyticalModels/comparasionAnalyticalModels.js";
import calculateRandomComponent from "./randomComponent/randomComponent.js";
import predict from "./makingPrediction/prediction.js";

//alpha = 0.05

export class timeSeries {
  constructor(stockPrices) {
    if (stockPrices?.stockPrices) {
      fillProperties(this, stockPrices);
    } else {
      const actualCurrentData = stockPrices.slice(0, stockPrices.length - 2);
      const actualFutureData = stockPrices.slice(stockPrices.length - 2);
      this.stockPrices = actualCurrentData.map((price) => Number(price.Close));
      this.dates = actualCurrentData.map((date) => date.Date);
      this.actualFuturePrices = actualFutureData.map((price) =>
        Number(price.Close)
      );
      this.actualFutureDates = actualFutureData.map((date) => date.Date);

      this.numberOfTimeSeries = this.stockPrices.length;
      this.confidenceInterval = [
        -1.96 * (1 / Math.sqrt(this.numberOfTimeSeries)),
        1.96 * (1 / Math.sqrt(this.numberOfTimeSeries)),
      ];
      this.ARCoeffs = calculateAR(this);

      initializeProperties(this);
    }
  }

  preliminaryAnalysis() {
    this.mathematicalExpectation = calculateMathematicalExpectation(
      this,
      this.stockPrices
    );
    calculateBiasedEstimate(this);
    calculateUnbiasedEstimate(
      this,
      this.stockPrices,
      this.mathematicalExpectation
    );
    calculateOrderAutocovariance(this);
    calculateAutocorrelationCoefficient(this);

    detectAbnormalValues(this);
    checkTrend(this);
    analyzeCorelogram(this, this.autocorrelationCoefficient);
  }

  //Згладжування,
  /*ТРЕБА РОБИТИ МЕХАНІЧНЕ ЗГЛАДЖУВАННЯ КОЛИ Є СЕЗОННА КОМПОНЕНТА
  ПІСЛЯ ЦЬОГО ПОТРІБНО ШУКАТИ АНАЛІТИЧНИМ МЕТОДОМ ТРЕНД*/

  makeSmoothing() {
    mechanicalSmoothing(this, 4);
    compareMechanicalSmoothings(this, false);
  }

  //Відокремлення сезонної компоненти
  findSeasonalComponent() {
    if (this.hasSeasonalComponent) {
      this.makeSmoothing();
      this.calculateSeasonalComponent();
    } else {
      console.log("There is no seasonal component");
    }
  }

  makeTrendModels() {
    // this.makeAnalyticalSmoothing();
    this.calculateTrendModels();
    this.compareTrendModels();
  }

  compareTrendModels() {
    compareAnalyticalModels(this, true);
    compareMechanicalSmoothings(this, true);
  }

  // calculateAR() {
  //   calculateAR(this);
  // }

  predict(number) {
    predict(this, number);
  }

  // forecastAR(period) {
  //   forecastAR(this, period);
  // }

  // makeAnalyticalSmoothing() {
  //   // calculateLinearModel(this, this.stockPrices);
  //   calculateExponentialModel(this, this.stockPrices);
  //   calculateLogarithmicModel(this, this.stockPrices);
  //   calculatePowerModel(this, this.stockPrices);
  //   calculatePolynomialModel(this, this.stockPrices);
  // }

  createDataChart() {
    createDataChart(this);
  }
  createDataCorrelogram() {
    createDataCorrelogram(this);
  }
  createAnalyticalModelsCharts() {
    createAnalyticalModelsCharts(this);
  }
  createMechanicalModelsCharts() {
    createMechanicalModelsCharts(this);
  }
  createTrendsComparasionChart() {
    createTrendsComparasionChart(this);
  }
  createRandomComponentChart() {
    createRandomComponentChart(this);
  }
  createRandomComponentCorrelogram() {
    createRandomComponentCorrelogram(this);
  }
  createPredictionChart() {
    createPredictionChart(this);
  }

  calculateTrendModels() {
    let data = this.hasSeasonalComponent
      ? this.smoothedInputData.mechanical.parameters.values
      : this.stockPrices;
    calculateLinearModel(this, data);
    calculateExponentialModel(this, data);
    calculateLogarithmicModel(this, data);
    calculatePowerModel(this, data);
    calculatePolynomialModel(this, data);
    if (!this.hasSeasonalComponent) {
      mechanicalSmoothing(this, 4, data);
    }
  }

  //якщо немає сезонної компоненти
  calculateRandomComponent() {
    calculateRandomComponent(this, null);
  }

  calculateSeasonalComponent() {
    let seasonalComponent = [];
    for (let i = 0; i < this.numberOfTimeSeries; i++) {
      if (this.hasSeasonalComponent) {
        seasonalComponent.push(
          this.stockPrices[i] - this.trend.mechanical.parameters.values[i]
        );
      }
    }
    this.seasonalComponent.values = seasonalComponent;
  }
}
