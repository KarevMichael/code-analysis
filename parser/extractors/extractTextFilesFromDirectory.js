const { fs, recurseSync } = require('file-system');

const FILE_EXTENSIONS = /^.*[.](js|ts)$/;

const extractTextFilesFromDirectory = (fileCandidate) => {
	const result = [];
	recurseSync(
		fileCandidate,
		(filepath, relative) => {
			if(FILE_EXTENSIONS.test(filepath)) {
				result.push({
					filePath: relative,
					fileContent: fs.readFileSync(filepath).toString()
				});
			}
		}
	);
	return result;
};

module.exports = {
	extractTextFilesFromDirectory
};
