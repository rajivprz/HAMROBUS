import users from "../models/usermodel.js";
import bus from "../models/busmodel.js";

export const datacount = async (req, res, next) => {
  try {
    const userdata = await users
      .find({
        isAdmin: false,
      })
      .count();
    const busdata = await bus.find().count();
    res.status(200).json({
      users: userdata,
      bus: busdata,
    });
  } catch (err) {
    next(err);
  }
};
