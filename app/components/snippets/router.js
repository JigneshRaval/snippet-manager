const router = require('express').Router();
const app = require('express')();
const SnippetsModel = require('./model');
const path = require('path');

// route middleware that will happen on every request
router.use(function(req, res, next){
	console.log("router.js --> ", req.method, req.url);
	next();
});

router.get('/', function(req, res) {
	SnippetsModel.getAll(function(snippets){
		res.send(snippets);
	});
});

router.get('/all', function(req, res) {
	SnippetsModel.getAll(function(snippets){
		res.send(snippets);
	});
});

router.get('/:id', function(req, res){
	SnippetsModel.getSingleSnippet(req.param.id, function(snippet){
		res.send(snippet);
	});
});

router.post('/addSnippet', function(req, res){
	SnippetsModel.addSnippet(req.body, function(snippet){
		res.send(snippet);
	});
});

module.exports = router;
