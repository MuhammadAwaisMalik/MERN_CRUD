import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT;

connectDB();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-crud-peach.vercel.app",
    credentials: true,
  })
);

app.use("/api/products", ProductRoutes);

app.listen(PORT, () => {
  console.log("server is running on port http://localhost:" + PORT);
});
