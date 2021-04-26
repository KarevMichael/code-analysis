const { fileToSourceMapper } = require('./mappers/fileToSourceMapper');
const { extractTextFilesFromDirectory } = require('./extractors/extractTextFilesFromDirectory');
const { resolve } = require('path');
const fs = require('fs');

const workingDir = resolve('../training-data');

const extracted = 
    extractTextFilesFromDirectory(workingDir).map(fileToSourceMapper);


fs.writeFileSync(`${workingDir}/report`, JSON.stringify(extracted, null, 4));