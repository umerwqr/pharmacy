import { Application } from "express";
/* admin routes */
import adminClinic from "./admin/clinic";

/* member routes */
const baseRouter = (app: Application) => {
  app.use(adminClinic);
};

export default baseRouter;
