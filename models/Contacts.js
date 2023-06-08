const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
        type: String,
    },
    email: {
      type: String,
      required: true,
    },
    organization: {
        type: String
    },
    phone: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    industry: {
        type: String,
        required: false,
    },
  },
  { timestamps: true }
);
ContactsSchema.index({ 'firstname': 'text', 'email': 'text' });

module.exports = mongoose.model("Contacts", ContactsSchema);
