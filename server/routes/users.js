import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/usercontroller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifytoken.js";

const router = express.Router();

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
