import { Category } from "../models/category.model.js";

export const categoryController = {
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name: name });
      if (category) {
        return next(new Error("This category is already exist"));
      }
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json({
        status: "success",
        message: "New category added",
        error: null,
        data: {
          newCategory,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const allCategories = await Category.find();

      res.json({
        status: "success",
        message: "All categories",
        error: null,
        data: {
          allCategories,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return next(new Error("Category with this id is not defined", 404));
      }
      res.json({
        status: "success",
        message: "Category by id",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!category) {
        return next(new Error("Category with this id is not defined", 404));
      }

      res.json({
        status: "success",
        message: "Category updated",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return next(new Error("Category with this id is not defined"));
      }
      await Category.deleteOne({ _id: id });

      res.json({
        status: "success",
        message: "category deleted",
        error: null,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
