const express = require('express');
const router = express.Router();
const complexity_controller = require("../controller/complexity-controller");

router.post('/', complexity_controller.processComplexity);

router.post('/addNonLexical', complexity_controller.addNonLexical);

module.exports = router;
