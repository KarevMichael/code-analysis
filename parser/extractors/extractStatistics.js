const { readFileSync } = require("fs");
const { workingDir, reportLocation } = require("../../constants");
const { fileToStatisticsMapper } = require("../mappers/fileToStatisticsMapper");
const {
  extractTextFilesFromDirectory,
} = require("./extractTextFilesFromDirectory");

module.exports.extractStatistics = () =>
  extractTextFilesFromDirectory(workingDir).map(fileToStatisticsMapper);
module.exports.getReport = () =>
  JSON.parse(readFileSync(reportLocation).toString());
