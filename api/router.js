import { Router } from "express";
import clientsRouter from "./modules/clients/clients.routes.js";

const router = Router();

router.use("/clients", clientsRouter);

export default router;
