const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A spot must have a location"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A spot must have a user connected to it."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
