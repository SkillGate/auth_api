const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    role: {
      type: String,
    },
    skills: {
      type: [String],
    },
    portfolio: {
      type: String,
    },
    experience: {
      type: String,
    },
    avatar: {
      type: String,
    },
    hourly_rate: {
      type: Number,
    },
    level: {
      type: String,
    },
    availability: {
      type: String,
    },
    location: {
      type: String,
    },
    num_of_connections: {
      type: Number,
    },
    overview: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
