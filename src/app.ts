import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodbConnection";
import baseRoute from "./router/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ['https://pharmacy-react-khaki.vercel.app', 'http://localhost:3000'],
};

app.use(cors(corsOptions));
app.use(express.json());

baseRoute(app);
app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
  connectDB();
});
