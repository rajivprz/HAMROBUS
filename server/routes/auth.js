import express from "express";
import { login, register, verifymail } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:id", verifymail);

export default router;
