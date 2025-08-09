const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  client: {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  service: {
    serviceType: {
      type: String,
      trim: true,
    },
    styleType: {
      type: String,
      trim: true,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  stylist: {
    name: {
      type: String,
      trim: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
