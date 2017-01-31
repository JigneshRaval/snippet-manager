const Datastore = require('nedb'),
db = {};

db.snippets = new Datastore({ filename: './data/snippets.json' });

// Load Snippets database
db.snippets.loadDatabase(function (err) {    // Callback is optional
	if(err) {
		console.log("Snippets database error :", err);
	} else {
		console.log("Snippets database loaded successfuly.");
	}
});

const SnippetsModel = (function(){

	function getAll(callback) {
		db.snippets.find({}, function(err, docs){
			if(callback && typeof callback === 'function'){
				callback({"snippets" : docs});
			}
		});
	};

	function addSnippet(data, callback) {
		db.snippets.insert(data, function(err, newDoc){
			if(err) {
				callback({"error": err});
			} else {
				callback({"snippet" : newDoc});
			}
		});
	};

	function getSingleSnippet(id, callback) {
		db.snippets.find({_id : id}, function(err, doc){
			callback({"snippet" : doc})
		});
	};

	return {
		getAll : getAll,
		addSnippet : addSnippet,
		getSingleSnippet: getSingleSnippet
	}
})();

module.exports = SnippetsModel;
