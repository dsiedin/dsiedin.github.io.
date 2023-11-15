import { timeSeries } from "./timeSeries/timeSeries.js";

const charts = document.querySelectorAll(".container");
const staticValues = document.querySelectorAll("[data-type='staticInfo']");

let correlogramAnalysis = document.querySelectorAll(
  "[data-type='correlogramAnalysis']"
);

let msft;

function fillStaticInfo() {
  staticValues[0].textContent =
    msft.randomComponent.mathematicalExpectation.toFixed(2);

  staticValues[1].textContent =
    msft.randomComponent.dispersion.unbiasedEstimate.toFixed(2);

  msft.randomComponent.autocorrelationCoefficient.forEach((coef) => {
    if (
      coef > msft.confidenceInterval[1] ||
      coef < msft.confidenceInterval[0]
    ) {
      correlogramAnalysis[0].innerHTML = `<div class="info__title">Наявність стаціонарності</div>
      <div class="info__status info__status_declined">
      <div class="info__symbol info__symbol_declined">&#10006;</div>
    </div>`;
      correlogramAnalysis[1].innerHTML = `<div class="info__title">
    Випадкова компонента є шумом
    </div>
    <div class="info__status info__status_declined">
    <div class="info__symbol info__symbol_declined">&#10006;</div>
  </div>`;
    }
  });
}

window.addEventListener("beforeunload", () => {
  if (!Object.is(msft, null)) {
    sessionStorage.setItem("state", JSON.stringify(msft));
  }
});

window.addEventListener("load", () => {
  let savedState = sessionStorage.getItem("state");
  if (!Object.is(savedState, null)) {
    charts.forEach((chart) => {
      chart.style.display = "grid";
    });

    let data = JSON.parse(savedState);
    msft = new timeSeries(data);
    console.log(msft);
    msft.createRandomComponentChart();
    msft.createRandomComponentCorrelogram();
    fillStaticInfo();
  }
});
