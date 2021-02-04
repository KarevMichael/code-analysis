const { extractTextFilesFromDirectory } = require('./extractors/extractTextFilesFromDirectory');

const extracted = extractTextFilesFromDirectory('/home/michael/Coding/code-analysis/training-data');



console.log(extracted);