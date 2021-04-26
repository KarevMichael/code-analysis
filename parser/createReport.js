const { fileToStatisticsMapper } = require('./mappers/fileToStatisticsMapper');
const { extractTextFilesFromDirectory } = require('./extractors/extractTextFilesFromDirectory');
const { resolve } = require('path');
const fs = require('fs');

const workingDir = resolve('../training-data');

const extracted = 
    extractTextFilesFromDirectory(workingDir).map(fileToStatisticsMapper);


fs.writeFileSync(`${workingDir}/report`, JSON.stringify(extracted, null, 4));