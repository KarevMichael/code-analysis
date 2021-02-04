const { fileToStatementsMapper } = require('./mappers/fileToStatementsMapper');
const { extractTextFilesFromDirectory } = require('./extractors/extractTextFilesFromDirectory');

const extracted = 
    extractTextFilesFromDirectory('/home/michael/Coding/code-analysis/training-data').map(fileToStatementsMapper)[2];



console.log(extracted);