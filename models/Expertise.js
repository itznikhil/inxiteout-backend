const mongoose = require("mongoose");

const ExpertiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
        type: String,
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
    offerings: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);
ExpertiseSchema.index({ 'title': 'text', 'desc': 'text' });

module.exports = mongoose.model("Expertise", ExpertiseSchema);
