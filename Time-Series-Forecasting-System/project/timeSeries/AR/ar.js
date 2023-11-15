var timeseries = require("timeseries-analysis");

// let t = new timeseries.main(timeseries.adapter.sin({ cycles: 4 }));
// let coeffs1 = t.ARMaxEntropy({ degree: 2 });
// let coeffs2 = t.ARLeastSquare({ degree: 3 });

function calculateAR(timeSeries) {
  let data = [];
  timeSeries.stockPrices.forEach((element, index) => {
    data.push([timeSeries.dates[index], element]);
  });
  // console.log(data);

  let t = new timeseries.main(data);

  let subArr;
  let coefssArr = [];
  let predictionsArr = [];
  for (let i = 2; i <= timeSeries.stockPrices.length - 1; i++) {
    let t2 = new timeseries.main(data.slice(0, i));
    subArr = data.slice(0, i);
    let values = subArr.map((item) => item[1]);

    let coeff = t2.ARLeastSquare({
      degree: 1,
      data: t.data.slice(0, i),
    });
    coefssArr.push(coeff);

    let t2Length = t2.data.length - 1;
    let forecastValue = 0;
    for (let i = 0; i < 1; i++) {
      forecastValue += t2.data[t2Length - i][1] * coeff;
    }
    predictionsArr.push(forecastValue);

    // console.log(`tDataSlice:`, t.data.slice(0, i));
    // console.log(`t2`, t2);
  }

  console.log(`coefsARRAY`, coefssArr);
  console.log(`predictARRAY`, predictionsArr);

  t.sliding_regression_forecast({
    sample: 3,
    degree: 1,
    method: "ARLeastSquare",
  });
  console.log(`tOrig`, t);
  // console.log(`t`, t);

  let firstDegreeCoeffs = t.ARLeastSquare({
    degree: 1,
    data: data,
  });
  let secondDegreeCoeffs = t.ARLeastSquare({
    degree: 2,
    data: data,
  });
  // console.log(`coeffs`, coeffs);

  // let forecast = 0;
  // let dataLength = t.data.length - 1;
  // for (let i = 0; i < coeffs.length; i++) {
  //   forecast -= t.data[dataLength - i][1] * coeffs[i];
  // }
  // console.log(`forecast`, forecast);
  return { firstDegree: firstDegreeCoeffs, secondDegree: secondDegreeCoeffs };
}

function forecastAR(timeSeries, period) {
  let data = [];
  console.log(timeSeries);
  timeSeries.stockPrices.forEach((element, index) => {
    data.push([timeSeries.dates[index], element]);
  });
  console.log(timeSeries.ARCoeffs);
  let t = new timeseries.main(data);

  let firstDegreeCoeffs = t.ARLeastSquare({
    degree: 1,
    data: data,
  });

  t.sliding_regression_forecast({
    sample: 2,
    degree: 2,
    method: "ARLeastSquare",
  });
  console.log(`t`, t);
  t.sliding_regression_forecast({
    sample: 2,
    degree: 2,
    method: "ARLeastSquare",
  });
  console.log(`t`, t);

  let forecast = [];
  let dataLength = t.data.length - 1;
  for (let i = 0; i < period; i++) {
    let value = 0;
    for (let j = 0; j < timeSeries.ARCoeffs.secondDegree.length; j++) {
      value -=
        t.data[data.length - 1 - j][1] * timeSeries.ARCoeffs.secondDegree[j];
    }
    data.push([timeSeries.actualFutureDates[i], value]);
    forecast.push(value);
  }

  console.log(`forecast`, forecast);
}

export { calculateAR };
