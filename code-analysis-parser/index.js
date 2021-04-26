const { fileToSourceMapper } = require('./mappers/fileToSourceMapper');
const { extractTextFilesFromDirectory } = require('./extractors/extractTextFilesFromDirectory');

const extracted = 
    extractTextFilesFromDirectory('/home/michael/Coding/code-analysis/training-data').map(fileToSourceMapper);



console.log(extracted);