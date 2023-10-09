import express from "express";
import {
  bookBus,
  deletebook,
  getBook,
  getallBook,
  updateBook,
} from "../controllers/bookingcontroller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";

const app = express();
const router = express.Router();

// console.log("buasd");
//create
router.post("/", bookBus);
router.get("/", getallBook);
router.get("/:id", getBook);
router.delete("/:id", verifyAdmin, deletebook);
router.put("/:id", updateBook);
export default router;
