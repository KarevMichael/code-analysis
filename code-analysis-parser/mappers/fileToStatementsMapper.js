const ts = require('typescript');
const isNil = require('lodash/isNil');
const isArray = require('lodash/isArray');
const get = require('lodash/get');
const flatten = require('lodash/flatten');

const isNodeObject = item => !isNil(get(item, 'kind'));
const mapStatement = statement => Object.values(statement).map(recursiveStatementsMapper).filter(it => !isNil(it));

const recursiveStatementsMapper = (statement) => {
	if(isNodeObject(statement)) {
		return ({
			pos: statement.pos,
			end: statement.end,
			kind: ts.SyntaxKind[statement.kind],
			children: flatten(mapStatement(statement))
		});
	} else if(isArray(statement)) {
		return mapStatement(statement);
	}
	else {
		return null;
	}
};

const fileToStatementsMapper = ({filePath, fileContent}) => {
	const { statements } = ts.createSourceFile(filePath, fileContent);
	return ({
		statements: statements.map(recursiveStatementsMapper),
		filePath,
		fileContent
	});
};

module.exports = {
	fileToStatementsMapper
};