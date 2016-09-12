var express = require('express');
var app = express();

// 라우트 1
app.get('/teams/:teamName/employees/:employeeId', function (req, res, next) {
	console.log('teamName = ' + req.params.teamName);
	console.log('employeeId = ' + req.params.employeeId);
	res.send('path one');
});

// 라우트 2
app.get('/teams/:teamName/employees', function (req, res, next) {
	console.log('setting content type');
	res.set('Content-type', 'applicaiton/json');
	res.locals.data = 100;
	next();
}, function (req, res, next) {
	console.log('teamName = ' + req.params.teamName);
	console.log(res.locals.data);
	res.send('path two');
});

// 라우트 3
app.get(/^\/groups\/(\w+)\/(\d+)$/, function (req, res, next) {
	console.log('groupname = ' + req.params[0]);
	console.log('groupid = ' + req.params[1]);
	res.send('path three');
});

var server = app.listen(1337, function() {
	console.log('Server started on port 1337');
});