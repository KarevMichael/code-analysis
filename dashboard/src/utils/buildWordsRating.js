import sortBy from 'lodash/sortBy';

export const buildWordsRating = (report) => {
  const acc = new Map();

  report.forEach((file) => {
    file.statements.forEach((statement) => {
      if (!statement) {
        return;
      }
      const currentComplexity = acc.get(statement.kind) || 0;
      acc.set(statement.kind, currentComplexity + statement.complexity);
    });
  });

  return sortBy(
    Array.from(acc.keys()).map((key) => ({
      kind: key,
      complexity: acc.get(key)
    })),
    ['complexity']
  );
};
