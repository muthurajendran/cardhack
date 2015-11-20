var express = require('express');
var router = express.Router();
var path = require('path');

var Parse = require('parse/node');
Parse.initialize("uQFHO7AAUUbfRrrYsN73QXuFshVLKyQPqBoVGE2n", "QL5TnOsyHvvs8ssUbAHaj0uPOMukkEXLq2e4YtS3");

router.get('/get-cards', function(req, res) {
	var query = new Parse.Query("cards");
	query.find({
	  success: function(cards) {
	  		console.log(cards);

			res.json({
				cards: cards.map(function(card) {
					return {
						id: card.id,
						url: card.get('image_url')
					};
				})
			});
	  },
	  error: function(err){
	  	console.log('Error while retrieving cards.', err)
	  }
	});
});

module.exports = router;
