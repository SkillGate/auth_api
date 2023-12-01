const mongoose = require("mongoose");

const userTypes = ["Candidate", "Employer"];

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    companyName: { type: String },
    dateOfBirth: { type: Date },
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
    userType: {
      type: String,
      enum: userTypes,
      default: "Candidate",
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
