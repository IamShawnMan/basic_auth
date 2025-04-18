import express from "express";
import { categoryController } from "../controllers/index.js";

const router = express.Router();

router
  .get("/", categoryController.getAll)
  .get("/:id", categoryController.getOne)
  .post("/", categoryController.create)
  .put("/:id", categoryController.update)
  .delete("/:id", categoryController.delete);

export { router as categoryRouter };
