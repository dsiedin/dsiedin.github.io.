export default function seriesCriterion(timeSeries) {
  let median = calculateMedian(timeSeries.stockPrices);
  console.log(`median = ${median}`);

  let sequence = formSequence(timeSeries.stockPrices, median);
  console.log(`sequence: ${sequence}`);

  let series = [];
  let numberSeries = 0;
  let largestSeries = 0;
  [series, numberSeries, largestSeries] = calculateNumberSeries(sequence);

  let criticalValueNumberSeries = calculateCriticalValueOfNumberSeries(
    sequence.length
  );

  let criticalValueLargestSeries =
    calculateCriticalValueOfLargestSeries(largestSeries);

  if (
    checkingInequalities(
      timeSeries,
      largestSeries,
      criticalValueLargestSeries,
      numberSeries,
      criticalValueNumberSeries
    )
  ) {
    return true;
  } else {
    return false;
  }
}

//Розрахунок медіани
function calculateMedian(arr) {
  let median = 0;
  arr.forEach((element) => (median += element));

  return median / arr.length;
}

//Формування послідовностей + та -
function formSequence(arr, median) {
  let sequence = [];
  arr.forEach((element) => {
    if (element > median) {
      sequence.push("+");
    } else if (element < median) {
      sequence.push("-");
    }
  });

  return sequence;
}

//Розрахунок кількості серій та довжини найдовшої серії
function calculateNumberSeries(sequence) {
  let numberSeries = 0;
  let series = [];
  let largestSeries = 0;
  let count = 0;
  let prevValue = "+";
  sequence.forEach((element, index) => {
    if (element === prevValue) {
      count++;
      if (index === sequence.length - 1) {
        series.push(count);
      }
    } else if (element !== prevValue) {
      prevValue = element;
      if (count != 0) {
        series.push(count);
      }

      count = 0;
      count++;

      if (index === sequence.length - 1) {
        series.push(count);
      }
    }
  });

  series.forEach((element) => {
    if (element > largestSeries) {
      largestSeries = element;
    }
  });

  numberSeries = series.length;

  return [series, numberSeries, largestSeries];
}

//Розрахунок критичного значення для кількості серій
function calculateCriticalValueOfNumberSeries(numberSeries) {
  let criticalValue = Math.floor(
    (1 / 2) * (numberSeries + 1 - 1.96 * Math.sqrt(numberSeries - 1))
  );

  return criticalValue;
}

//Розрахунок критичного значення для найдовшої серії
function calculateCriticalValueOfLargestSeries(largestSeries) {
  let criticalValue = Math.floor(3.3 * (Math.log10(largestSeries) + 1));

  return criticalValue;
}

//Перевірка нерівностей для перевірки, чи є тренд
//Якщо нерівності виконуються, то тренду немає
function checkingInequalities(
  timeSeries,
  largestSeries,
  criticalValueLargestSeries,
  numberSeries,
  criticalValueNumberSeries
) {
  console.log(
    `largest series = ${largestSeries} < critical value lg series = ${criticalValueLargestSeries} \nnumber series = ${numberSeries} > critical value number series = ${criticalValueNumberSeries}`
  );
  if (
    largestSeries < criticalValueLargestSeries &&
    numberSeries > criticalValueNumberSeries
  ) {
    console.log(`Обидві нерівності виконуються, тренду немає`);
    timeSeries.hasTrend = false;
    return false;
  } else {
    console.log(`Одна або дві з нерівностей не виконується, тренд є`);
    timeSeries.hasTrend = true;
    return true;
  }
}
