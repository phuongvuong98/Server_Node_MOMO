const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const cryptController = require('../controllers/recommand');

router.get('/', cryptController.getRecommand);

module.exports = router;