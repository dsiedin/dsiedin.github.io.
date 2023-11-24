import checkingAverageLevelDifferences from "./averageLevelDifferences/averageLevelDifferences.js";
import seriesCriterion from "./seriesCriterion/seriesCriterion.js";

export default function checkTrend(timeSeries) {
  checkingAverageLevelDifferences(timeSeries);
  seriesCriterion(timeSeries);
}
