import calculateMathematicalExpectation from "../utils/mathematicalExpectation.js";
import calculateAutocorrelationCoefficient from "../utils/autocorrelationCoefficient.js";

// export default function calculateRandomComponent(
//   timeSeries,
//   smoothedValues = null
// ) {
//   if (!timeSeries.hasSeasonalComponent && smoothedValues == null) {
//     let randomComponent = [];
//     for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
//       if (!timeSeries.hasSeasonalComponent) {
//         randomComponent.push(
//           timeSeries.stockPrices[i] -
//             timeSeries.trend.mechanical.parameters.values[i]
//         );
//       }
//     }
//     timeSeries.randomComponent.values = randomComponent;

//     timeSeries.randomComponent.mathematicalExpectation =
//       calculateMathematicalExpectation(
//         timeSeries,
//         timeSeries.randomComponent.values
//       );

//     calculateAutocorrelationCoefficient(
//       timeSeries,
//       timeSeries.randomComponent.values,
//       timeSeries.randomComponent.mathematicalExpectation
//     );

//     let sum = 0;

//     timeSeries.randomComponent.values.forEach(
//       (value) =>
//         (sum += Math.pow(
//           value - timeSeries.randomComponent.mathematicalExpectation,
//           2
//         ))
//     );

//     timeSeries.randomComponent.dispersion.unbiasedEstimate =
//       (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;

//     let res = [];
//     let hasAbnormalValues = false;
//     for (let i = 0; i < timeSeries.numberOfTimeSeries - 1; i++) {
//       res.push(
//         Math.abs(
//           (timeSeries.randomComponent.values[i + 1] -
//             timeSeries.randomComponent.values[i]) /
//             Math.sqrt(timeSeries.randomComponent.dispersion.unbiasedEstimate)
//         )
//       );
//     }

//     // for (let i = 0; i < res.length; i++) {
//     //   if (res[i] > 1.02) {
//     //     console.log(`Abnormal value i=${i} : ${res[i]}`);
//     //     hasAbnormalValues = true;
//     //   } else if (i === res.length - 1 && hasAbnormalValues === false) {
//     //     console.log(`There are no abnormal values!`);
//     //   }
//     // }
//   } else if (!timeSeries.hasSeasonalComponent && smoothedValues.length != 0) {
//     let randomComponent = [];

//     for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
//       if (timeSeries.seasonalComponent.values.length == 0) {
//         randomComponent.push(
//           smoothedValues[i] - timeSeries.trend.mechanical.parameters.values[i]
//         );
//       }
//     }
//     timeSeries.randomComponent.values = randomComponent;

//     timeSeries.randomComponent.mathematicalExpectation =
//       calculateMathematicalExpectation(
//         timeSeries,
//         timeSeries.randomComponent.values
//       );

//     calculateAutocorrelationCoefficient(
//       timeSeries,
//       timeSeries.randomComponent.values,
//       timeSeries.randomComponent.mathematicalExpectation
//     );

//     let sum = 0;

//     timeSeries.randomComponent.values.forEach(
//       (value) =>
//         (sum += Math.pow(
//           value - timeSeries.randomComponent.mathematicalExpectation,
//           2
//         ))
//     );

//     timeSeries.randomComponent.dispersion.unbiasedEstimate =
//       (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;

//     let res = [];
//     let hasAbnormalValues = false;
//     for (let i = 0; i < timeSeries.numberOfTimeSeries - 1; i++) {
//       res.push(
//         Math.abs(
//           (timeSeries.randomComponent.values[i + 1] -
//             timeSeries.randomComponent.values[i]) /
//             Math.sqrt(timeSeries.randomComponent.dispersion.unbiasedEstimate)
//         )
//       );
//     }

//     // for (let i = 0; i < res.length; i++) {
//     //   if (res[i] > 1.02) {
//     //     console.log(`Abnormal value in random component i=${i} : ${res[i]}`);
//     //     hasAbnormalValues = true;
//     //   } else if (i === res.length - 1 && hasAbnormalValues === false) {
//     //     console.log(`There are no abnormal values!`);
//     //   }
//     // }
//   } else if (timeSeries.hasSeasonalComponent && smoothedValues == null) {
//     let randomComponent = [];
//     for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
//       if (!timeSeries.hasSeasonalComponent) {
//         randomComponent.push(
//           timeSeries.stockPrices[i] -
//             (timeSeries.seasonalComponent.values[i] -
//               timeSeries.trend.mechanical.parameters.values[i])
//         );
//       }
//     }
//     timeSeries.randomComponent.values = randomComponent;

//     timeSeries.randomComponent.mathematicalExpectation =
//       calculateMathematicalExpectation(
//         timeSeries,
//         timeSeries.randomComponent.values
//       );

//     calculateAutocorrelationCoefficient(
//       timeSeries,
//       timeSeries.randomComponent.values,
//       timeSeries.randomComponent.mathematicalExpectation
//     );

//     let sum = 0;

//     timeSeries.randomComponent.values.forEach(
//       (value) =>
//         (sum += Math.pow(
//           value - timeSeries.randomComponent.mathematicalExpectation,
//           2
//         ))
//     );

//     timeSeries.randomComponent.dispersion.unbiasedEstimate =
//       (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;

//     let res = [];
//     let hasAbnormalValues = false;
//     for (let i = 0; i < timeSeries.numberOfTimeSeries - 1; i++) {
//       res.push(
//         Math.abs(
//           (timeSeries.randomComponent.values[i + 1] -
//             timeSeries.randomComponent.values[i]) /
//             Math.sqrt(timeSeries.randomComponent.dispersion.unbiasedEstimate)
//         )
//       );
//     }
//   } else if (timeSeries.hasSeasonalComponent && smoothedValues.length != 0) {
//     let randomComponent = [];
//     for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
//       if (!timeSeries.hasSeasonalComponent) {
//         randomComponent.push(
//           smoothedValues[i] -
//             (timeSeries.seasonalComponent.values[i] -
//               thtimeSeriesis.trend.mechanical.parameters.values[i])
//         );
//       }
//     }
//     timeSeries.randomComponent.values = randomComponent;

//     timeSeries.randomComponent.mathematicalExpectation =
//       calculateMathematicalExpectation(
//         timeSeries,
//         timeSeries.randomComponent.values
//       );

//     calculateAutocorrelationCoefficient(
//       timeSeries,
//       timeSeries.randomComponent.values,
//       timeSeries.randomComponent.mathematicalExpectation
//     );

//     let sum = 0;

//     timeSeries.randomComponent.values.forEach(
//       (value) =>
//         (sum += Math.pow(
//           value - timeSeries.randomComponent.mathematicalExpectation,
//           2
//         ))
//     );

//     timeSeries.randomComponent.dispersion.unbiasedEstimate =
//       (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;

//     let res = [];
//     let hasAbnormalValues = false;
//     for (let i = 0; i < timeSeries.numberOfTimeSeries - 1; i++) {
//       res.push(
//         Math.abs(
//           (timeSeries.randomComponent.values[i + 1] -
//             timeSeries.randomComponent.values[i]) /
//             Math.sqrt(timeSeries.randomComponent.dispersion.unbiasedEstimate)
//         )
//       );
//     }
//   }
// }

export default function calculateRandomComponent(
  timeSeries,
  smoothedValues = null
) {
  let randomComponent = [];
  let hasAbnormalValues = false;

  for (let i = 0; i < timeSeries.numberOfTimeSeries; i++) {
    let stockPrice = timeSeries.stockPrices[i];
    let smoothValue = smoothedValues ? smoothedValues[i] : null;
    let seasonalComp = timeSeries.seasonalComponent.values[i] || 0;
    let trendComp =
      timeSeries.trend.analytical.parameters.determinationCoefficient <
      timeSeries.trend.mechanical.parameters.determinationCoefficient
        ? timeSeries.trend.mechanical.parameters.values[i]
        : timeSeries.trend.analytical.parameters.values[i];

    if (!timeSeries.hasSeasonalComponent && smoothedValues == null) {
      randomComponent.push(stockPrice - trendComp);
    } else if (!timeSeries.hasSeasonalComponent && smoothValue !== null) {
      randomComponent.push(smoothValue - trendComp);
    } else if (timeSeries.hasSeasonalComponent && smoothedValues == null) {
      randomComponent.push(stockPrice - seasonalComp - trendComp);
    } else if (timeSeries.hasSeasonalComponent && smoothValue !== null) {
      randomComponent.push(smoothValue - seasonalComp - trendComp);
    }
  }

  timeSeries.randomComponent.values = randomComponent;
  timeSeries.randomComponent.mathematicalExpectation =
    calculateMathematicalExpectation(timeSeries, randomComponent);
  calculateAutocorrelationCoefficient(
    timeSeries,
    randomComponent,
    timeSeries.randomComponent.mathematicalExpectation
  );

  let sum = randomComponent.reduce(
    (acc, value) =>
      acc +
      Math.pow(value - timeSeries.randomComponent.mathematicalExpectation, 2),
    0
  );
  timeSeries.randomComponent.dispersion.unbiasedEstimate =
    (1 / (timeSeries.numberOfTimeSeries - 1)) * sum;

  randomComponent.slice(0, -1).forEach((value, i) => {
    let res = Math.abs(
      (randomComponent[i + 1] - value) /
        Math.sqrt(timeSeries.randomComponent.dispersion.unbiasedEstimate)
    );
    if (res > 1.02) {
      // console.log(Abnormal value in random component i=${i} : ${res});
      hasAbnormalValues = true;
    }
  });
  if (!hasAbnormalValues) console.log("There are no abnormal values!");
}
