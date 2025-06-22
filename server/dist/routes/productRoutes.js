"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const cloudinary_1 = require("../utils/cloudinary");
const multer_1 = __importDefault(require("multer"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProductById);
router.post("/", upload.array("images"), middleware_1.validateProduct, productController_1.createProduct);
router.put("/:id", upload.array("images"), middleware_1.validateProduct, productController_1.updateProduct);
router.delete("/:id", productController_1.deleteProduct);
exports.default = router;
