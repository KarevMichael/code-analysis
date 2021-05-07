const { join } = require('path');

// eslint-disable-next-line no-undef
const workingDir = join(__dirname, '..', '/ico-dashboard/packages/backend');

module.exports = {
	workingDir,
	reportLocation: join(__dirname, '/dashboard', '/public' ,'/report')
};
