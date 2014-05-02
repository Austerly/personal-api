var express = require('express'),
	app = express();
	bodyParser = require('body-parser');

//Express Middleware
app.use(bodyParser());

// CORS Middleware
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', "127.0.0.1");
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

//Handlers
app.get('/name', function(req, res){
	res.json({name: "Chris"});
});

app.get('/location', function(req, res){
	res.json({location: "DevMountain"});
});

var hobbies = ['a running', 'b cycling', 'c guitar'];

app.get('/hobbies', function(req, res){
	var hobbiesList = hobbies,
	order = req.query.order; // makes it so it is local
	
	if (order === 'asc') {
		hobbiesList.sort();
	}
	else if (order === 'desc') {
		hobbiesList.sort().reverse();
	}
	
	res.json(hobbiesList);
}); //http://localhost:9880/hobbies?order=desc

var occupations = ['Teacher', 'other stuff'];

//http://localhost:9880/occupations?order=asc
app.get('/occupations', function(req, res){
	var occupationsList = occupations,
	order = req.query.order;

	if (order === 'asc') {
		occupationsList.sort();
	}
	else if (order === 'desc') {
		occupationsList.sort().reverse();
	}
	res.json(occupationsList);
});

app.get('/occupations/latest', function(req, res){
	res.json({occupation: occupations[occupations.length - 1]});
});

// Mentions
var mentions = [];
app.get('/mentions', function (req, res) {
	res.json(mentions);
});

app.post('/mentions', function (req, res) {
	var newMention = {
		date: req.body.date,
		text: req.body.text,
		service: req.body.service		
	};
	
	mentions.push(newMention);

	res.json(newMention);
});

var friends = [];
app.get('/friends', function (req, res) {
	res.json(friends);
});

app.post('/friends', function (req, res) {
	var newFriend = {
		name: req.body.name,
		shoesize: req.body.shoesize
	};
	
	friends.push(newFriend);

	res.json(newFriend);

});

app.listen(9880);