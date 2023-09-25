const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: [true, "Please enter a valid URL"],
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: [true, "Please enter a valid URL"],
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const pass = mongoose.model("url", urlSchema);

module.exports = pass;
