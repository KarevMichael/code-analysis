const ts = require('typescript');
const isNil = require('lodash/isNil');
const isArray = require('lodash/isArray');
const get = require('lodash/get');
const flatten = require('lodash/flatten');
const { tokenize } = require('esprima');

const isNodeObject = item => !isNil(get(item, 'kind'));
const mapStatement = ({statement, fileContent}) => Object.values(statement).map(recursiveStatementsMapper({fileContent})).filter(it => !isNil(it));
const getOccupiedRange = ({pos, end, content, startLine}) => {
	const occupiedContent = content.substring(pos, end);
	const lines = occupiedContent.split('\n').length - 1;
	return [startLine, startLine + lines];
};

const recursiveStatementsMapper = ({fileContent}) => (statement) => {
	if(isNodeObject(statement)) {
		const content = fileContent.substring(statement.pos, statement.end);
		const symbols = tokenize(content).map(({type}) => type);
		return ({
			pos: statement.pos,
			end: statement.end,
			content,
			symbols,
			complexity: symbols.length,
			kind: ts.SyntaxKind[statement.kind],
			children: flatten(mapStatement({statement, fileContent}))
		});
	} else if(isArray(statement)) {
		return mapStatement({statement, fileContent});
	}
	else {
		return null;
	}
};

const fileToStatisticsMapper = ({filePath, fileContent}) => {
	const source = ts.createSourceFile(filePath, fileContent);
	const { pos, end } = source;
	const occupiedRange = getOccupiedRange({pos, end, content: fileContent, startLine: 0});

	return ({
		statements: pos !== end ? source.statements.map(
			recursiveStatementsMapper({fileContent, parentOccupiedRange: occupiedRange})
		) : [],
		filePath,
		fileContent
	});
};

module.exports = {
	fileToStatisticsMapper
};