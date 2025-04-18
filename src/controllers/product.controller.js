import { Product } from "../models/index.js";

export const productController = {
  create: async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = new Product(data);
      await newProduct.save();

      res.status(201).json({
        status: "success",
        message: "New product created",
        error: null,
        data: {
          newProduct,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const allProducts = await Product.find();

      res.json({
        status: "succcess",
        message: "All products",
        error: null,
        data: {
          allProducts,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return next(new Error("Product not found"));
      }

      res.json({
        status: "success",
        message: "Product by id",
        error: null,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await Product.findByIdAndUpdate(id, body, { new: true });

      if (!product) {
        return next(new Error("Product not found"));
      }
      res.json({
        status: "success",
        message: "Product updated",
        error: null,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return next(new Error("Product not found"));
      }
      await Product.deleteOne({ _id: id });

      res.json({
        status: "success",
        message: "Product deleted",
        error: null,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },
};
