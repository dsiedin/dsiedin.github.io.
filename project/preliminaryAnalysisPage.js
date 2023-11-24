import { timeSeries } from "./timeSeries/timeSeries.js";
import { destroyAllCharts } from "./timeSeries/charts/chartUtils.js";
import analyzeCorelogram from "./timeSeries/utils/analyzeCorelogram.js";
import detectAbnormalValues from "./timeSeries/utils/abnormalValues.js";
import seriesCriterion from "./timeSeries/checkingTrend/seriesCriterion/seriesCriterion.js";
import checkingAverageLevelDifferences from "./timeSeries/checkingTrend/averageLevelDifferences/averageLevelDifferences.js";

const dataCorrelogram = document.querySelector(".data-correlogram");
const dataChart = document.querySelector(".data-chart");
const staticalAnalysis = document.querySelector(".statical-analysis");
const dataClearing = document.querySelector(".data-clearing");
const staticalInfo = document.querySelector(".statical-info");
const buttons = document.querySelector(".buttons__wrapper");
const additionalChecking = document.querySelector("[data-button-id='5']");

const staticalValues = document.querySelectorAll("[data-type='staticalInfo']");
const dataClearingInfo = document.querySelectorAll(
  "[data-type='dataClearing']"
);

let areEmptyValuesPresent = false;
let areAbnormalValuesPresent = false;

let msft;

buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-button-id") == 1) {
    destroyAllCharts();
    hideInfo();
    clearData();
    console.log(dataClearingInfo);
    if (areEmptyValuesPresent == true) {
      dataClearingInfo[1].innerHTML = ` 
      <div class="info__title">Наявність пропущенних значень</div>
      <div class="info__status info__status_accepted">
      <div class="info__symbol">
        <img src="img/tick.png" alt="tick" />
      </div>
    </div>
      `;

      dataClearingInfo[4].innerHTML = `
      <div class="info__descr">Дані було очищенно!</div>
    `;
    }

    // dataClearingInfo[0].textContent = `working`;
    msft.autocorrelationCoefficient = [];
    msft.orderAutocovariance = [];
    msft.preliminaryAnalysis();

    if (msft.hasAbnormalValues == true) {
      dataClearingInfo[0].innerHTML = `<div class="info__title">Наявність аномальних відхилень</div>
      <div class="info__status info__status_accepted">
      <div class="info__symbol">
        <img src="img/tick.png" alt="tick" />
      </div>`;

      dataClearingInfo[4].innerHTML = `
      <div class="info__descr">Дані було очищенно!</div>
    `;
    }

    msft.hasAbnormalValues == false;

    msft.findSeasonalComponent();
    msft.makeSmoothing();
    msft.makeTrendModels();
    msft.calculateRandomComponent();
    // analyzeCorelogram(msft, msft.randomComponent.autocorrelationCoefficient);
    msft.predict(3);

    staticalInfo.style.display = "grid";
    dataClearing.style.visibility = "visible";
  } else if (e.target.getAttribute("data-button-id") == 2) {
    destroyAllCharts();
    hideInfo();
    fillStaticInfo();
    staticalInfo.style.display = "grid";
    staticalAnalysis.style.visibility = "visible";
  } else if (e.target.getAttribute("data-button-id") == 3) {
    destroyAllCharts();
    hideInfo();
    dataChart.style.display = "block";
    msft.createDataChart();
  } else if (e.target.getAttribute("data-button-id") == 4) {
    destroyAllCharts();
    hideInfo();
    dataCorrelogram.style.display = "grid";
    msft.createDataCorrelogram();
  }
});

additionalChecking.addEventListener("click", (e) => {
  let hiddenInfo = document.querySelectorAll(".info.hidden");
  hiddenInfo.forEach((element) => {
    element.style.visibility = "visible";
  });
  if (!seriesCriterion(msft)) {
    hiddenInfo[0].innerHTML = ` <div class="info__title">
    Наявність тренду за критерієм Серій
  </div>
  <div class="info__status info__status_declined">
  <div class="info__symbol info__symbol_declined">&#10006;</div>
</div>`;
  }
  if (!checkingAverageLevelDifferences(msft)) {
    hiddenInfo[1].innerHTML = ` <div class="info__title">
    Наявність тренду за методом перевірки різниць середніх рівнів
  </div>
  <div class="info__status info__status_declined">
  <div class="info__symbol info__symbol_declined">&#10006;</div>
</div>`;
  }
});

function clearData() {
  clearEmptyDates();
  clearEmptyPrices();
}

function clearEmptyDates() {
  let dates = msft.dates;

  for (let i = 0; i < dates.length - 1; i++) {
    let currentDate = new Date(dates[i]);
    let nextDate = new Date(dates[i + 1]);
    if (nextDate.getMonth() - currentDate.getMonth() == -1) {
      areEmptyValuesPresent = true;
      nextDate = new Date(currentDate);
      nextDate.setMonth(currentDate.getMonth() + 1);
      dates[i + 1] = nextDate.toISOString().slice(0, 10);
    }
  }

  msft.dates = dates;
}

function clearEmptyPrices() {
  let prices = msft.stockPrices;

  for (let i = 0; i < prices.length; i++) {
    if (Object.is(prices[i], null) || isNaN(prices[i])) {
      areEmptyValuesPresent = true;
      prices[i] = (prices[i - 1] + prices[i + 1]) / 2;
    }
  }

  msft.stockPrices = prices;
}

function hideInfo() {
  staticalInfo.style.display = "none";
  dataChart.style.display = "none";
  dataCorrelogram.style.display = "none";
}

function fillStaticInfo() {
  staticalValues[0].textContent = msft.mathematicalExpectation.toFixed(2);
  staticalValues[1].textContent = msft.dispersion.biasedEstimate.toFixed(2);
  staticalValues[2].textContent = msft.dispersion.unbiasedEstimate.toFixed(2);
}

window.addEventListener("beforeunload", () => {
  if (!Object.is(msft, null)) {
    sessionStorage.setItem("state", JSON.stringify(msft));
  }
});

window.addEventListener("load", () => {
  let savedState = sessionStorage.getItem("state");
  if (!Object.is(savedState, null)) {
    // chart.style.display = "grid";

    let data = JSON.parse(savedState);
    msft = new timeSeries(data);

    console.log(msft);
    // msft.createDataCorrelogram();
  }
});
