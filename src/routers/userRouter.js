import express from "express";
import { userController } from "../controllers/index.js";
import { authMiddeware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/", authMiddeware, userController.create)
  .get("/", authMiddeware, userController.getAll)
  .get("/:id", userController.getOne)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete);

export { router as userRouter };
