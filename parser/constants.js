const { join } = require('path');

// eslint-disable-next-line no-undef
const workingDir = join(__dirname, '..', '/training-data');

module.exports = {
	workingDir,
	reportLocation: `${workingDir}/report`
};
