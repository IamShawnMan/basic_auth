import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { config } from "../config/config.js";

export const authMiddeware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, config.jwt_secret);
    console.log(decode);
    const user = await User.findById(decode.sub);
    if (!user) {
      return next(new Error("Authentiocation failed", 400));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// export const authMiddeware = async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const [username, password] = Buffer.from(token, "base64")
//     .toString()
//     .split(":");

//   const user = await User.findOne({ email: username });

//   if (!user) {
//     return res.status(404).send("User detail wrong");
//   }

//   if (
//     username &&
//     password &&
//     user.password === password &&
//     user.email === username
//   ) {
//     next();
//     return;
//   }
//   return res.status(404).send("User detail wrong");
// };
