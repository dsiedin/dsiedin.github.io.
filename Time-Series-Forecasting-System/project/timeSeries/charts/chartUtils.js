function createChart(chartId, title, labels, datasets) {
  Chart.defaults.color = "#0a0a0a";
  Chart.defaults.font.color = "black";
  Chart.defaults.font.family = "Roboto";
  let chart = document.getElementById(chartId);
  new Chart(chart, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets.map((dataset) => {
        return {
          label: dataset.label,
          data: dataset.data,
          ...dataset.options,
        };
      }),
    },
    options: {
      scales: {
        x: {
          type: "time",
          // time: {
          //   unit: "week",
          // },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (context) => {
              return `${context}$`;
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 20,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}, ${date[1]}`;
            },
            label: (context) => {
              return ` ${context.dataset.data[context.dataIndex].toFixed(2)}$`;
            },
          },
        },
        crosshair: {
          line: {
            color: "#999", // Line color
            width: 2, // Line width
          },
          sync: {
            enabled: false, // Sync tooltip when multiple charts
          },
          zoom: {
            enabled: false, // Disable zooming
          },
          snap: {
            enabled: true, // Snap tooltip to data point
          },
        },
      },
    },
  });
}

function createCorrelogram(chartId, title, labels, datasets) {
  Chart.defaults.color = "#0a0a0a";
  Chart.defaults.font.color = "black";
  Chart.defaults.font.family = "Roboto";
  let chart = document.getElementById(chartId);
  new Chart(chart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets.map((dataset) => {
        return {
          label: dataset.label,
          data: dataset.data,
          ...dataset.options,
        };
      }),
    },
    options: {
      scales: {
        x: {},
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 20,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: (context) => {
              let date = context[0].label.split(", ");
              return `${date[0]}`;
            },
            label: (context) => {
              return ` ${context.dataset.data[context.dataIndex].toFixed(2)}`;
            },
          },
        },
      },
      crosshair: {
        line: {
          color: "#999", // Line color
          width: 2, // Line width
        },
        sync: {
          enabled: true, // Sync tooltip when multiple charts
        },
        zoom: {
          enabled: false, // Disable zooming
        },
        snap: {
          enabled: true, // Snap tooltip to data point
        },
      },
    },
  });
}

function createDataset(label, data, options) {
  let dataset = {
    label: label,
    data: data,
    options: options,
  };
  return dataset;
}

function destroyAllCharts() {
  let charts = document.querySelectorAll("canvas");
  charts.forEach((element) => {
    let chart = Chart.getChart(`${element.id}`);
    if (chart != undefined) {
      chart.destroy();
    }
  });
}

// const dataset = {
//   label: "",
//   data: "data",
//   options: {
//     borderWidth: 3,
//     borderColor: "black",
//     backgroundColor: "red",
//   },
// };

export { createChart, createCorrelogram, createDataset, destroyAllCharts };
