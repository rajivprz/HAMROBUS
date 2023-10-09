import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    isVerified: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
