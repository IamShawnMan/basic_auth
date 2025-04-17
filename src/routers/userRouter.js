import express from "express";
import { userController } from "../controllers/index.js";
import { authMiddeware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/", authMiddeware, userController.create)
  .get("/", userController.getAll)
  .get("/", userController.getOne);

export { router as userRouter };
