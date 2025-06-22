import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController";
import { storage } from "../utils/cloudinary";
import multer from "multer";
import { validateProduct } from "../middleware/validateProduct";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getAllProducts);
router.get("/:id",getProductById);
router.post("/", upload.array("images"),validateProduct, createProduct);
router.put("/:id", upload.array("images"),validateProduct, updateProduct);
router.delete("/:id",deleteProduct);

export default router;