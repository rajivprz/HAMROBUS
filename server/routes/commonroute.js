import express from "express";
import { datacount } from "../controllers/commoncontroller.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const app = express();
const router = express.Router();

router.get("/data-count", datacount);

export default router;
