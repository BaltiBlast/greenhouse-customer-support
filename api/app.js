import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./router.js";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

export default app;
