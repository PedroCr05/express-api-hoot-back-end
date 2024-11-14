const express = require(`express`);
const verifyToken = require(`../middleware/verify-token.js`);
const Hoot = require(`../models/hoot.js`);
const router = express.Router();

router.use(verifyToken);

router.post(`/`, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get(`/`, async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate(`author`)
      .sort({ createdAt: `desc` });
    if (!hoots) {
      res.status(404);
      throw new Error(`Hoots have not been found.`);
    }
    res.status(200).json(hoots);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(`/:hootId`, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate(`author`);
    if (!hoot) {
      res.status(404);
      throw new Error(`Hoot has not been found.`);
    }
    res.status(200).json(hoot);
  } catch (error) {
    res.status(500).json(`Invalid ID. Please try again.`);
  }
});

module.exports = router;
