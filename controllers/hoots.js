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
      throw new Error(`Error | Hoot does not exist. Please try again.`);
    }
    res.status(200).json(hoot);
  } catch (error) {
    res.status(500).json(`Could not find the inputted ID. Please try again.`);
  }
});

router.put(`/:hootId`, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot) {
      res.status(404);
      throw new Error(`Error | Hoot does not exist. Please try again.`);
    }

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).json(`Hey, you aren't allowed here!`);
    }

    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    updatedHoot._doc.author = req.user;
    res.status(200).json(updatedHoot);
  } catch (error) {
    res.status(500).json(`Invalid ID. Please make sure your ID is correct.`);
  }
});

router.delete(`/:hootId`, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot) {
      res.status(404);
      throw new Error(`Error | Hoot does not exist. Please try again.`);
    }

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).json(`Hey, you aren't allowed here!`);
    }

    const deletedHoot = await Hoot.findByIdAndDelete(
      req.params.hootId,
      req.body,
      { new: true }
    );
    res.status(200).json(deletedHoot);
  } catch (error) {
    res.status(500).json(`Invalid ID. Please make sure your ID is correct.`);
  }
});

router.post(`/:hootId/comments`, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();

    // Why are we doing a minus one here? or I suppose hyphen 1?
    const newComment = hoot.comments[hoot.comments.length - 1];

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
