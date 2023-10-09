import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import Bus from "./routes/Bus.js";
import Book from "./routes/book.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.js";
import commonroute from "./routes/commonroute.js";
import cors from "cors";
import paymentroute from "./routes/paymentroute.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middlewares
app.use(cookieParser());
app.use(express.json());
console.log("asdasd");
app.use(cors("*"));
app.use("/api/auth", authRoute);
app.use("/api/bus", Bus);
app.use("/api/book", Book);
app.use("/api/users", usersRoute);
app.use("/api/commonroute", commonroute);
app.use("/api/payment", paymentroute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Database");
});
