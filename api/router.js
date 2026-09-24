import { Router } from "express";
import clientsRouter from "./modules/clients/clients.routes.js";
import eventsRouter from "./modules/events/events.routes.js";

const router = Router();

router.use("/clients", clientsRouter);
router.use("/events", eventsRouter);

export default router;
