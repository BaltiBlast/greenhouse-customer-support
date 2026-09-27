import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import sessionMiddleware from "./middlewares/session.middleware.js";
import router from "./router.js";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(sessionMiddleware);
app.use("/api", router);
app.use(errorMiddleware);

export default app;
