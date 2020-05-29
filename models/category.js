const mongoose = require("mongoose");
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      unique: true,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Mongoose.model("Category", categorySchema);
