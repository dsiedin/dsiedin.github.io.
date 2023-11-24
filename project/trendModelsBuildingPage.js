import { timeSeries } from "./timeSeries/timeSeries.js";
import { destroyAllCharts } from "./timeSeries/charts/chartUtils.js";

const charts = document.querySelectorAll(".container");
const buttons = document.querySelector(".buttons__wrapper");
const analyticalSmothing = document.querySelector(".analytical-smothing");
const mechanicalSmothing = document.querySelector(".mechanical-smothing");
const resultComparison = document.querySelector(".result-comparison");
const analyticalValues = document.querySelectorAll(
  "[data-type='analyticalSmoothing']"
);
const mechanicalValues = document.querySelectorAll(
  "[data-type='mechanicalSmoothing']"
);
const comparisonValues = document.querySelectorAll(
  "[data-type='resultComparison']"
);

let wrapper = document.querySelector(".buttons__wrapper");
const table = document.querySelector(".table");
let result = document.querySelector(".table__result");

let msft;

buttons.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-button-id") == 1) {
    console.log(e.target.getAttribute("data-button-id"));
    destroyAllCharts();
    hideInfo();
    fillAnalyticalValues();
    analyticalSmothing.style.display = "block";
    msft.createAnalyticalModelsCharts();

    fillMechanicalValues();
    mechanicalSmothing.style.display = "block";
    msft.createMechanicalModelsCharts();
    console.log(msft.analyticalSmoothing);
  } else if (e.target.getAttribute("data-button-id") == 2) {
    destroyAllCharts();
    hideInfo();
    fillAllValues();
    resultComparison.style.display = "block";
    msft.createTrendsComparasionChart();
    createTable(msft);
    if (
      msft.trend.analytical.parameters.determinationCoefficient <
      msft.trend.mechanical.parameters.determinationCoefficient
    ) {
      result.textContent = `Для прогнозування автоматично обрано найкращу модель - ${msft.trend.mechanical.model}`;
    } else {
      result.textContent = `Для прогнозування автоматично обрано найкращу модель - ${msft.trend.analytical.model}`;
    }
  }
});

function hideInfo() {
  analyticalSmothing.style.display = "none";
  mechanicalSmothing.style.display = "none";
  resultComparison.style.display = "none";
}

function fillAnalyticalValues() {
  analyticalValues[0].textContent =
    msft.analyticalSmoothing.linearModel.determinationCoefficient;
  analyticalValues[1].textContent =
    msft.analyticalSmoothing.exponentialModel.determinationCoefficient;
  analyticalValues[2].textContent =
    msft.analyticalSmoothing.logarithmicModel.determinationCoefficient;
  analyticalValues[3].textContent =
    msft.analyticalSmoothing.powerModel.determinationCoefficient;
  analyticalValues[4].textContent =
    msft.analyticalSmoothing.polynomialModel.determinationCoefficient;
}

function fillMechanicalValues() {
  mechanicalValues[0].textContent =
    msft.mechanicalSmoothing.simpleMovingAverage.determinationCoefficient;
  mechanicalValues[1].textContent =
    msft.mechanicalSmoothing.exponentialMovingAverage.determinationCoefficient;
}

function fillAllValues() {
  comparisonValues[0].textContent =
    msft.analyticalSmoothing.linearModel.determinationCoefficient;
  comparisonValues[1].textContent =
    msft.analyticalSmoothing.exponentialModel.determinationCoefficient;
  comparisonValues[2].textContent =
    msft.analyticalSmoothing.logarithmicModel.determinationCoefficient;
  comparisonValues[3].textContent =
    msft.analyticalSmoothing.powerModel.determinationCoefficient;
  comparisonValues[4].textContent =
    msft.analyticalSmoothing.polynomialModel.determinationCoefficient;
  comparisonValues[5].textContent =
    msft.mechanicalSmoothing.simpleMovingAverage.determinationCoefficient;
  comparisonValues[6].textContent =
    msft.mechanicalSmoothing.exponentialMovingAverage.determinationCoefficient;
}

function createTable(timeSeries) {
  let tbody = `<tbody>`;

  tbody += `<tr>
              <td>Лінійна модель</td>
              <td>y = ${timeSeries.analyticalSmoothing.linearModel.m}x ${
    timeSeries.analyticalSmoothing.linearModel.c > 0 ? "+" : "-"
  } ${Math.abs(timeSeries.analyticalSmoothing.linearModel.c)}</td>
              <td>${timeSeries.analyticalSmoothing.linearModel.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.linearModel.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.linearModel.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.linearModel.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.linearModel.mse.toFixed(
                2
              )}</td> 
            </tr>  
            <tr>
              <td>Експоненційна модель</td>
              <td>y = ${
                timeSeries.analyticalSmoothing.exponentialModel.a
              } * e^${timeSeries.analyticalSmoothing.exponentialModel.b}*x</td>
              <td>${timeSeries.analyticalSmoothing.exponentialModel.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.exponentialModel.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.exponentialModel.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.exponentialModel.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.exponentialModel.mse.toFixed(
                2
              )}</td>   
            </tr>
            <tr>
              <td>Логарифмічна модель</td>
              <td>y = ${timeSeries.analyticalSmoothing.logarithmicModel.a} ${
    timeSeries.analyticalSmoothing.logarithmicModel.b > 0 ? "+" : "-"
  } ${Math.abs(timeSeries.analyticalSmoothing.logarithmicModel.b)} * lnx</td>
              <td>${timeSeries.analyticalSmoothing.logarithmicModel.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.logarithmicModel.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.logarithmicModel.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.logarithmicModel.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.logarithmicModel.mse.toFixed(
                2
              )}</td>   
            </tr>
            <tr>
              <td>Степенева модель</td>
              <td>y = ${timeSeries.analyticalSmoothing.powerModel.a} * x^${
    timeSeries.analyticalSmoothing.powerModel.b
  }</td>
              <td>${timeSeries.analyticalSmoothing.powerModel.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.powerModel.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.powerModel.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.powerModel.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.powerModel.mse.toFixed(
                2
              )}</td>   
            </tr>
            <tr>
              <td>Поліноміальна модель</td>
              <td>y = ${
                timeSeries.analyticalSmoothing.polynomialModel.a[0]
              } * x^2 ${
    timeSeries.analyticalSmoothing.polynomialModel.a[1] > 0
      ? `+ ${timeSeries.analyticalSmoothing.polynomialModel.a[1]} * x`
      : `- ${Math.abs(timeSeries.analyticalSmoothing.polynomialModel.a[1])} * x`
  } ${
    timeSeries.analyticalSmoothing.polynomialModel.a[2] > 0
      ? `+ ${timeSeries.analyticalSmoothing.polynomialModel.a[2]}`
      : `- ${Math.abs(timeSeries.analyticalSmoothing.polynomialModel.a[2])}`
  }</td>
              <td>${timeSeries.analyticalSmoothing.polynomialModel.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.polynomialModel.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.analyticalSmoothing.polynomialModel.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.polynomialModel.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.analyticalSmoothing.polynomialModel.mse.toFixed(
                2
              )}</td>   
            </tr>
            <tr>
              <td>MA</td>
              <td></td>
              <td>${timeSeries.mechanicalSmoothing.simpleMovingAverage.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.mechanicalSmoothing.simpleMovingAverage.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.mechanicalSmoothing.simpleMovingAverage.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.mechanicalSmoothing.simpleMovingAverage.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.mechanicalSmoothing.simpleMovingAverage.mse.toFixed(
                2
              )}</td>   
            </tr>
            <tr>
              <td>EMA</td>
              <td></td>
              <td>${timeSeries.mechanicalSmoothing.exponentialMovingAverage.mape.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.mechanicalSmoothing.exponentialMovingAverage.mpe.toFixed(
                2
              )}%</td>  
              <td>${timeSeries.mechanicalSmoothing.exponentialMovingAverage.mfe.toFixed(
                2
              )}</td>  
              <td>${timeSeries.mechanicalSmoothing.exponentialMovingAverage.mae.toFixed(
                2
              )}</td>  
              <td>${timeSeries.mechanicalSmoothing.exponentialMovingAverage.mse.toFixed(
                2
              )}</td>   
            </tr>`;
  tbody += `</tbody>`;

  table.innerHTML = `
  <table>
  <thead>
  <tr>
  <th>Назва моделі</th>
  <th>Формула моделі</th>
  <th>MAPE</th>
  <th>MPE</th>
  <th>MFE</th>
  <th>MAE</th>
  <th>MSE</th>
  </tr>
  </thead>
  ${tbody}
</table>`;

  table.style.display = "block";
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
    if (msft.isStationary) {
      wrapper.removeChild(wrapper.firstElementChild);
      let element = `<div class="buttons__container">
        <button class="buttons" data-button-id="1">
          Вибір авторегресійної моделі
        </button>
        <div class="checkboxes__container">
          <div class="checkbox">
            <input type="checkbox" name="firstOrderModel" id="firstOrderModel" />
            <label for="firstOrderModel">Модель першого порядку</label>
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              name="secondOrderModel"
              id="secondOrderModel"
            />
            <label for="secondOrderModel">Модель другого порядку</label>
          </div>

        </div>
      </div>`;
      wrapper.insertAdjacentHTML("afterbegin", element);
    }
    console.log(msft);
    // msft.createAnalyticalModelsCharts();
    // msft.createTrendsComparasionChart();
  }
});
