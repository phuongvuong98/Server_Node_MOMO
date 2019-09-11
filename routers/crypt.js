const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const cryptController = require('../controllers/crypt');


router.get('/cryptBlowfish', cryptController.getBlowfish);

router.post('/cryptBlowfish', cryptController.postBlowfish);

router.get('/cryptRSA', cryptController.getRSA);

router.post('/cryptRSA', cryptController.postRSA);

router.get('/cryptAES', cryptController.getAES);

router.post('/cryptAES', cryptController.postAES);

module.exports = router;