import express from "express";
import { productController } from "../controllers/index.js";

const router = express.Router();

router
  .get("/", productController.getAll)
  .get("/:id", productController.getOne)
  .post("/", productController.create)
  .put("/:id", productController.update)
  .delete("/:id", productController.delete);

export { router as productRouter };
