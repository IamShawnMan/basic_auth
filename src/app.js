import express from "express";
import { authRouter, categoryRouter, userRouter } from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);

app.use(errorHandler);

export default app;
