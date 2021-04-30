const clamp = require('lodash/clamp');

const updateComplexity = ({oldSymbols, newSymbols}) => {
	const safeOldSymbols = oldSymbols || [];
	const safeNewSymbols = newSymbols || [];
	return {
		complexity: safeOldSymbols
			.filter((symbol, index) => symbol === safeNewSymbols[index]).length
            + clamp(safeNewSymbols.length - safeOldSymbols.length, 0, safeOldSymbols.length)
	};
};

module.exports = {
	updateComplexity
}; 