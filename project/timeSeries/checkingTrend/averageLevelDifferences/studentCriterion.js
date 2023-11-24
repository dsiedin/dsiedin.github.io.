import StudentCriticalValues from "./tabular_data/StudentCriticalValues.js";

function calculateEmpiricalStudentValue(
  arraySizes,
  unbiasedEstimates,
  mathExpectations
) {
  let deviationOfDifferenceOfMeans = Math.sqrt(
    ((arraySizes[0] - 1) * unbiasedEstimates[0] +
      (arraySizes[1] - 1) * unbiasedEstimates[1]) /
      (arraySizes[0] + arraySizes[1] - 2)
  );

  let empiricalStudentValue =
    Math.abs(mathExpectations[0] - mathExpectations[1]) /
    (deviationOfDifferenceOfMeans *
      Math.sqrt(1 / arraySizes[0] + 1 / arraySizes[1]));
  return empiricalStudentValue;
}

function findStudentCriticalValue(sizeArr) {
  let kIndex = 0;
  if (sizeArr - 1 <= 30) {
    kIndex = sizeArr - 2;
  } else if (sizeArr > 30) {
    kIndex = 30;
  } else if (sizeArr > 40) {
    kIndex = 31;
  } else if (sizeArr > 60) {
    kIndex = 32;
  } else if (sizeArr > 120) {
    kIndex = 33;
  }

  return StudentCriticalValues[kIndex];
}

function compareEmpiricalAndCriticalStudentValue(empirical, critical) {
  //Якщо Емп >= Крит то гіпотеза про рівність середніх відхиляється, тренд є
  //Якщо Емп < Крит то гіпотеза про рівність середніх приймається, тренду немає.
  if (empirical >= critical) {
    console.log(
      `Emp Student's value: ${empirical} >= Critical Student's value: ${critical}\nГіпотеза про рівність середніх відхиляється, Тренд є!`
    );
    return true;
  } else {
    console.log(
      `Emp Student's value: ${empirical} < Critical Student's value: ${critical}\nГіпотеза про рівність середніх приймається, Тренду немає!`
    );
    return false;
  }
}

export {
  calculateEmpiricalStudentValue,
  findStudentCriticalValue,
  compareEmpiricalAndCriticalStudentValue,
};
