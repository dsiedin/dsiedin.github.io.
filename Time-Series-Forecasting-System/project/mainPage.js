// import regression from "regression";
import { timeSeries } from "./timeSeries/timeSeries.js";

import analyzeCorelogram from "./timeSeries/utils/analyzeCorelogram.js";
import { destroyAllCharts } from "./timeSeries/charts/chartUtils.js";
// import createTable from "./createTable.js";
// import data from "./timeSeries/AR/ar.js";
// import { coeffs1, coeffs2 } from "./timeSeries/AR/ar.js";

// console.log(`c1`, coeffs1);
// console.log(`c2`, coeffs2);

let msft = null;

const inputButton = document.getElementById("file-input");
if (!Object.is(inputButton, null)) {
  inputButton.addEventListener("change", handleFileUpload);
}

const container = document.querySelector(".container");
const table = document.querySelector(".data__table");
console.log(table);

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  document.querySelector(".img").style.display = "none";

  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, {
      type: "binary",
      cellDates: true,
      dateNF: "yyyy-mm-dd",
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const stockPrices = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
    });

    getData(stockPrices);

    event.target.value = "";
  };

  reader.readAsBinaryString(file);
}

const getData = (stockPrices) => {
  // let data = await (await fetch("./stock_history_data/MSFT_10Y.json")).json();

  msft = new timeSeries(stockPrices);
  // console.log(msft);

  // msft.preliminaryAnalysis(); //попередній аналіз
  createTable(msft, table);
  container.style.display = "block";
  // msft.forecastAR(5);
  // msft.calculateAR();
  // msft.findSeasonalComponent();
  // msft.makeSmoothing();
  // msft.makeTrendModels();
  // console.log(msft);
  // msft.calculateRandomComponent();
  // analyzeCorelogram(msft, msft.randomComponent.autocorrelationCoefficient);
  // msft.predict(5);
  // msft.createPredictionChart();
};

function createTable(timeSeries, table) {
  let tbody = `<tbody>`;

  timeSeries.dates.forEach((date, index) => {
    tbody += `<tr><td>${date}</td><td>${
      Object.is(timeSeries.stockPrices[index], null)
        ? "NaN"
        : timeSeries.stockPrices[index].toFixed(2)
    }</td></tr>  `;
  });
  tbody += `</tbody>`;

  table.innerHTML = `
  <table>
  <thead>
  <tr>
  <th>ДАТА</th>
  <th>ЦІНА,$</th>
  </tr>
  </thead>
  ${tbody}
</table>`;

  table.style.display = "block";
}

window.addEventListener("beforeunload", () => {
  if (!Object.is(msft, null)) {
    sessionStorage.setItem("state", JSON.stringify(msft));
    document.querySelector(".img").style.display = "none";
    createTable(msft, table);
    container.style.display = "block";
  }
});

window.addEventListener("load", () => {
  let savedState = sessionStorage.getItem("state");
  if (!Object.is(savedState, null)) {
    // chart.style.display = "grid";
    document.querySelector(".img").style.display = "none";

    let data = JSON.parse(savedState);
    let msft = new timeSeries(data);
    createTable(msft, table);
    container.style.display = "block";
    console.log(msft);
    // msft.createDataChart();
  }
});
