const ts = require('typescript');
const isNil = require('lodash/isNil');
const isArray = require('lodash/isArray');
const get = require('lodash/get');
const os = require('os');
const { tokenize } = require('esprima');

const isNodeObject = (item) => !isNil(get(item, 'kind'));

const mapStatement = ({ statement, fileContent }) =>
  Object.values(statement)
    .map(statementsMapper({ fileContent }))
    .filter((it) => !isNil(it));

const statementsMapper = ({ fileContent }) => (statement) => {
  if (isNodeObject(statement)) {
    try {
      const content = fileContent.substring(statement.pos, statement.end);
      const symbols = tokenize(content).map(({ type }) => type);
      const lines = content.split(os.EOL).map((line) => {
        const symbols = tokenize(line).map(({ type }) => type);

        return {
          symbols,
          complexity: symbols.length
        };
      });

      return {
        pos: statement.pos,
        end: statement.end,
        content,
        symbols,
        complexity: symbols.length,
        kind: ts.SyntaxKind[statement.kind],
        lines
      };
    } catch {
      return null;
    }
  } else if (isArray(statement)) {
    return mapStatement({ statement, fileContent });
  } else {
    return null;
  }
};

const fileToStatisticsMapper = ({ filePath, fileContent }) => {
  const source = ts.createSourceFile(filePath, fileContent);
  const { pos, end } = source;

  return {
    statements:
      pos !== end
        ? source.statements.map(statementsMapper({ fileContent }))
        : [],
    filePath,
    fileContent,
    iteration: 1
  };
};

module.exports = {
  fileToStatisticsMapper
};
