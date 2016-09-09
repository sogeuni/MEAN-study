var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
var dbUrl = 'mongodb://sogeuni:bwlrdyd1m@ds019886.mlab.com:19886/l2r2';

var TeamSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

var Team = mongoose.model('Team', TeamSchema);

var EmployeeSchema = new Schema({
	name: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
		}
	},
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Team'
	},
	image: {
		type: String,
		default: 'images/user.png'
	},
	address: {
		lines: {
			type: [String]
		},
		postal: {
			type: String
		}
	}
});

var Employee = mongoose.model('Employee', EmployeeSchema);

function insertTeams (callback) {
	Team.create({
		name: 'Product Development'
	}, {
		name: 'Dev Ops'
	}, {
		name: 'Accounting'
	}, function (error, pd, devops, acct) {
		if (error) {
			return callback(error);
		} else {
			console.info('teams successfully added');
			callback(null, pd, devops, acct);
		}
	});
}

function insertEmployees (pd, devops, acct, callback) {
	Employee.create({
		name: {
			first: 'John',
			last: 'Adams'
		},
		team: pd._id,
		address: {
			lines: ['2 Lincoln Memorial Cir NW'],
			zip: 20037
		}
	}, {
		name: {
			first: 'Thomas',
			last: 'Jefferson'
		},
		team: devops._id,
		address: {
			lines: ['1600 Pennsylvania Avenue', 'White House'],
			zip: 20500
		}
	}, {
		name: {
			first: 'James',
			last: 'Madison'
		},
		team: acct._id,
		address: {
			lines: ['2 15th St NW', 'PO Box 8675309'],
			zip: 20007
		}
	}, {
		name: {
			first: 'James',
			last: 'Monroe'
		},
		team: acct._id,
		address: {
			lines: ['1850 West Basin Dr SW', 'Suite 210'],
			zip: 20242
		}
	}, function (error, johnadams) {
		if (error) {
			return callback(error);
		} else {
			console.info('employees successfully added');
			callback(null, {
				team: pd,
				employee: johnadams
			});
		}
	});
}

function retrieveEmployee(data, callback) {
	Employee.findOne({
		_id: data.employee._id
	}).populate('team').exec(function (error, result) {
		
	})
}

db.on('error', function() {
	console.log('db error');
});

mongoose.connect(dbUrl, function(err) {
	if (err) {
		return console.log('db connect error: ' + err);
	}

	console.log('connected!');

	insertTeams(function(err, pd, devops, acct) {
		if (err) {
			console.error(err);
		}

		insertEmployees(pd, devops, acct, function(err, result) {
			if (err) {
				console.error(err);
			} else {
				console.info('database activity complete');
			}

			db.close();
			process.exit();
		})
	});
})


