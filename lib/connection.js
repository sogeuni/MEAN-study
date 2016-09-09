var mongoose = require('mongoose');
var dbUrl = 'mongodb://sogeuni:bwlrdyd1m@ds019886.mlab.com:19886/l2r2';

mongoose.connect(dbUrl);

// Ctrl+C를 누르면 몽구스 연결 종료
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection disconnected');
		process.exit(0);
	});
});

require('../models/employee');
require('../models/team');