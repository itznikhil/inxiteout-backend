const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema(
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
    use_cases: {
      type: Array,
      required: false,
    },
    icon: {
      type:String
    }
  },
  { timestamps: true }
);
SolutionSchema.index({ 'title': 'text', 'desc': 'text' });

module.exports = mongoose.model("Solutions", SolutionSchema);
