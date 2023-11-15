const path = require("path");

module.exports = {
  mode: "development",
  // entry: "./projectV2/dataUploadPage.js",
  entry: {
    mainPage: "./project/mainPage.js",
    predictionPage: "./project/predictionPage.js",
    preliminaryAnalysisPage: "./project/preliminaryAnalysisPage.js",
    randomComponentAnalysisPage: "./project/randomComponentAnalysisPage.js",
    trendModelsBuildingPage: "./project/trendModelsBuildingPage.js",
    timeSeries: "./project/timeSeries/timeSeries.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "dist"),
    },
  },
};
