import express from "express";
import { userRouter } from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use(errorHandler);

export default app;
