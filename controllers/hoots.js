const express = require(`express`);
const verifyToken = require(`../middleware/verify-token.js`);
const Hoot = require(`../models/hoot.js`);
const router = express.Router();

router.use(verifyToken);

module.exports = router;
