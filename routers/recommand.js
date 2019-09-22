const express = require("express");

// create the mini app express
const router = express.Router();

const rootPath = require("../util/path");

const cryptController = require("../controllers/recommand");

router.post("/", cryptController.postRecommand);

router.get("/", cryptController.getRecommand);

module.exports = router;
