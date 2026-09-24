import { Router } from "express";
import { createClientController } from "./clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/", createClientController);

export default clientsRouter;
