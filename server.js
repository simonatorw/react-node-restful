const express = require('express');
const app = express();

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.listen(3000, function() {
    console.log('Server running at http://localhost:3000/');
});

function generateResponse(num) {
	let configurations = [];
	
	if (num) {
		for (let i = 0; i < num; i++) {
			configurations.push({
				name: `host${i}`,
				hostname: 'nessus-xml.lab.com',
				port: 3384,
				username: 'admin'
			});
		}
	}
	
	return { configurations }; 
}

app.route('/download/request')
    .get(function(req, res, next) {
		res.json(generateResponse(req.query.host));
    });
	
