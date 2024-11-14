const mongoose = require(`mongoose`);

const stringArr = ["News", "Sports", "Games", "Movies", "Music", "Television"];

const HootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: stringArr,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: `User` },
  },
  { timestamps: true }
);

const Hoot = mongoose.model(`Hoot`, HootSchema);

module.exports = Hoot;
