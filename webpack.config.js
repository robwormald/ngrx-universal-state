const path = require('path');

module.exports = {
	entry: './lib/src/main.js',
	output: {
		path: path.resolve('./public'),
		filename: '[name].js'
	}
}
