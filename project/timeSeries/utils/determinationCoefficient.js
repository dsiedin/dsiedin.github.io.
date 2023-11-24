export default function calculateDeterminationCoefficient(data, results) {
  const predictions = data;
  const observations = results;

  let sum = observations.reduce((a, observation) => a + observation, 0);
  const mean = sum / observations.length;

  const ssyy = observations.reduce((a, observation) => {
    const difference = observation - mean;
    return a + difference * difference;
  }, 0);

  const sse = observations.reduce((accum, observation, index) => {
    const prediction = predictions[index];
    const residual = observation - prediction;
    return accum + residual * residual;
  }, 0);

  return 1 - sse / ssyy;
}
