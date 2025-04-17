import { User } from "../models/index.js";

export const authMiddeware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const [username, password] = Buffer.from(token, "base64")
    .toString()
    .split(":");

  const user = await User.findOne({ email: username });

  if (!user) {
    return res.status(404).send("User detail wrong");
  }

  if (
    username &&
    password &&
    user.password === password &&
    user.email === username
  ) {
    next();
    return;
  }
  return res.status(404).send("User detail wrong");
};
