var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile('index.html',{ root: path.join(__dirname, '../client') }); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
