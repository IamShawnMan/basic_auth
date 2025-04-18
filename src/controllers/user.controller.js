import { User } from "../models/index.js";

export const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users) {
        return next(new Error("Users not found", 404));
      }
      res.json({
        status: "success",
        message: "Users found succesfully",
        error: null,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        next(new Error("User not found", 404));
      }
      res.json({
        status: "success",
        message: "User found successfully",
        error: null,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  // create: async (req, res, next) => {
  //   try {
  //     const body = req.body;
  //     const user = new User(body);
  //     await user.save();

  //     res.json({
  //       status: "success",
  //       message: "New user created",
  //       error: null,
  //       data: {
  //         user,
  //       },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await User.findById(id);
      if (!user) {
        return next(new Error("User not found", 404));
      }
      await User.updateOne({ _id: id }, body);

      res.json({
        status: "success",
        message: "User updated",
        error: null,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return next(new Error("User not found"));
      }
      await User.deleteOne({ _id: id });

      res.json({
        status: "success",
        message: "User deleted",
        error: null,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
