import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // must be provided
  },
  email: {
    type: String,
    required: true,
    unique: true,     // no duplicate emails allowed
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,   // normal users by default
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

const User = mongoose.model("User", userSchema);

export default User;
