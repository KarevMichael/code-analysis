const intersectionBy = require('lodash/intersectionBy');
const differenceBy = require('lodash/differenceBy');
const fs = require('fs');
const { updateComplexity } = require('./helpers/updateComplexity');
const { reportLocation } = require('../constants');
const {
  extractStatistics,
  getReport
} = require('./extractors/extractStatistics');

const extracted = extractStatistics();
const report = getReport();

const intersectedReport = intersectionBy(report, extracted, 'filePath');

const updatedIntersection = intersectedReport.map((updateCandidate) => {
  const comparable = extracted.find(
    ({ filePath }) => filePath === updateCandidate.filePath
  );
  return {
    ...comparable,
    iteration: updateCandidate.iteration + 1,
    statements: [
      ...updateCandidate.statements.map((statement, index) => {
        const comparableStatement = comparable.statements[index];
        return {
          ...statement,
          symbols: comparableStatement.symbols,
          complexity: updateComplexity({
            oldSymbols: statement.symbols,
            newSymbols: comparableStatement.symbols
          }).complexity,
          lines: [
            statement.lines.map((line, index) => {
              return {
                complexity: updateComplexity({
                  oldSymbols: line.symbols,
                  newSymbols: comparableStatement.lines[index]?.symbols
                }).complexity,
                symbols: comparableStatement.lines[index].symbols
              };
            })
          ]
        };
      }),
      ...comparable.statements.slice(updateCandidate.statements.length)
    ]
  };
});

const differenceReports = [
  ...differenceBy(extracted, report, 'filePath'),
  ...differenceBy(report, extracted, 'filePath')
];

const result = [...differenceReports, ...updatedIntersection];

fs.writeFileSync(`${reportLocation}1`, JSON.stringify(result, null, 4));
