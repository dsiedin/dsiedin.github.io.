import { timeSeries } from "./timeSeries/timeSeries.js";

const chart = document.querySelector(".container");
const forecastAccuracyValues = document.querySelectorAll(
  "[data-type='forecastAccuracy']"
);

let msft;

function fillValues() {
  forecastAccuracyValues[0].textContent =
    msft.trend.forecastAccuracy.mape.toFixed(2) + "%";
  forecastAccuracyValues[1].textContent =
    msft.trend.forecastAccuracy.mfe.toFixed(2);
  forecastAccuracyValues[2].textContent =
    msft.trend.forecastAccuracy.mae.toFixed(2);
  forecastAccuracyValues[3].textContent =
    msft.trend.forecastAccuracy.mpe.toFixed(2) + "%";
  forecastAccuracyValues[4].textContent =
    msft.trend.forecastAccuracy.mse.toFixed(2);
  if (msft.trend.forecastAccuracy.mape < 10) {
    forecastAccuracyValues[5].textContent = "Точність прогнозу є дуже високою";
  } else if (msft.trend.forecastAccuracy.mape < 21) {
    forecastAccuracyValues[5].textContent = "Точність прогнозу є високою";
  } else if (msft.trend.forecastAccuracy.mape < 51) {
    forecastAccuracyValues[5].textContent = "Точність прогнозу є задовільною";
  } else if (msft.trend.forecastAccuracy.mape > 51) {
    forecastAccuracyValues[5].textContent = "Точність прогнозу є незадовільною";
  }
}

window.addEventListener("beforeunload", () => {
  if (!Object.is(msft, null)) {
    sessionStorage.setItem("state", JSON.stringify(msft));
  }
});

window.addEventListener("load", () => {
  let savedState = sessionStorage.getItem("state");
  if (!Object.is(savedState, null)) {
    chart.style.display = "grid";

    let data = JSON.parse(savedState);
    msft = new timeSeries(data);

    // msft.preliminaryAnalysis();

    // msft.findSeasonalComponent();
    // msft.makeSmoothing();
    // msft.makeTrendModels();
    // msft.calculateRandomComponent();
    // analyzeCorelogram(msft, msft.randomComponent.autocorrelationCoefficient);

    // msft.predict(2);
    console.log(msft);

    msft.createPredictionChart();
    fillValues();
  }
});
