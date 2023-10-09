import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import usermodel from "../models/usermodel.js";
import dotenv from "dotenv";
dotenv.config();


// register
export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email is already in use.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    await sendConfirmationEmail(newUser.username, newUser.email, newUser._id);
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// // login

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    // Check if the user is verified
    if (user.isVerified !== "1") {
      return res.status(401).json({ message: "Email not verified" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const sendConfirmationEmail = async (username, email, _id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "For mail verification",
      html: `
        <p>Hello ${username}, 
        please click here to <a href="http://localhost:3000/verify/${_id}">Verify</a> your mail</p>
      `,
    };

    transporter.sendMail(mailoptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Your mail has been sent:-", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

export const verifymail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   

    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isVerified: "1" } },
      { new: true }
    );

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
