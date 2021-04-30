const fs = require('fs');
const {extractStatistics} = require('./extractors/extractStatistics');

const { reportLocation } = require('./constants');

const extracted = extractStatistics();

fs.writeFileSync(reportLocation, JSON.stringify(extracted, null, 4));