import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
    boardingPoint: {
      type: String,
    },
    nameOfPassenger: {
      type: String,
    },
    startCity: {
      type: String,
    },
    destinationCity: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    seats: {
      type: [String],
    },
    price: {
      type: Number,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    status: {
      type: String,
    },
    name: {
      type: String,
    },
    boardingPoint: {
      type: String,
    },
    busNumber: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Book", BookSchema);
