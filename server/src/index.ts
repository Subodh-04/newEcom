import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import productRoutes from "./routes/productRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://ecommerce-admin-90945.web.app',
  credentials: true,
}));
app.use(express.json());
0
AppDataSource.initialize().then(() => {
  console.log("Connected to DB ✅");
  app.use("/products", productRoutes);
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("❌ DB connection failed:", err);
});
