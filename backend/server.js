import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
connectDB();
app.use(express.json());

app.use("/api/products", ProductRoutes);

app.listen(PORT, () => {
  console.log("server is running on port http://localhost:" + PORT);
});
