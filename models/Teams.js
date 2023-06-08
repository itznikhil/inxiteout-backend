const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
        type: String,
        required: true,
      },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
TeamsSchema.index({ 'name': 'text', 'desc': 'text' });

module.exports = mongoose.model("Teams", TeamsSchema);
