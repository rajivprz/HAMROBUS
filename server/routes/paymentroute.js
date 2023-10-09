import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
const router = express.Router();
dotenv.config();

router.post("/khalti", async (req, res) => {
  const { token, amount } = req.body;
  const khaltiresponse = await axios.post(
    "https://khalti.com/api/v2/payment/verify/",
    {
      token,
      amount,
    },
    {
      headers: {
        Authorization: `Key test_secret_key_3722fd6257b84dab8251b1af3dbecd37`,
      },
    }
  );
  console.log(khaltiresponse);
  if (khaltiresponse) {
    res.json({
      success: true,
      data: khaltiresponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});
export default router;
