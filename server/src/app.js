import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import NodeCache from "node-cache";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

import userRouter from "./routes/user.route.js";
import imageRouter from './routes/image.route.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imageRouter);

export const myCache = new NodeCache();
export { app };
