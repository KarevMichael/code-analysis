import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import isNaN from 'lodash/isNaN';

export const buildFileRating = (report) => {
  const acc = new Map();

  report.forEach((file) => {
    const complexity = sumBy(file.statements, 'complexity');
    const degradationSpeed = complexity / file.iteration;
    if (isNaN(degradationSpeed)) {
      return;
    }
    acc.set(file.filePath, {
      complexity,
      degradationSpeed
    });
  });

  return {
    byComplexity: sortBy(
      Array.from(acc.keys()).map((key) => ({
        name: key,
        complexity: acc.get(key).complexity
      })),
      ['complexity']
    ),
    byDegradationSpeed: sortBy(
      Array.from(acc.keys()).map((key) => ({
        name: key,
        degradationSpeed: acc.get(key).degradationSpeed
      })),
      ['degradationSpeed']
    )
  };
};
