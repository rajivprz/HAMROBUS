import express from "express";
import Bus from "../models/busmodel.js";
import { verifyAdmin } from "../utils/verifytoken.js";
// import { createError } from "../utils/error.js";
import {
  createBus,
  deleteBus,
  getBus,
  getBusesFromTo,
  getCities,
  getallBus,
  updateBus,
} from "../controllers/buscontroller.js";
const app = express();
const router = express.Router();

console.log("buasd");
//create
router.post("/", verifyAdmin, createBus);

//update
// router.put("/:id", verifyAdmin, updateBus);
router.put("/:id", updateBus);
//delete
router.delete("/:id", verifyAdmin, deleteBus);

//Get
router.get("/find/:id", getBus);
//getall
router.get("/", getallBus);
router.get("/buses", getBusesFromTo);
router.get("/cities", getCities);

export default router;
