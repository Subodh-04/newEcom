"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productService_1 = require("../service/productService");
//get all the products!
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService_1.productService.getAll();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllProducts = getAllProducts;
//get the product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield productService_1.productService.getbyId(id);
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getProductById = getProductById;
//add a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sku, name, price } = req.body;
        const images = req.files.map((file) => file.path);
        const product = yield productService_1.productService.create({ sku, name, price, images });
        res.status(201).json(product); // <-- no return here
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create product" }); // <-- no return here
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { sku, name, price } = req.body;
        const existingProduct = yield productService_1.productService.getbyId(id);
        if (!existingProduct) {
            res.status(404).json({ message: "Product not Found!" });
            return;
        }
        // Handle new images if uploaded
        let updatedImages = existingProduct.images || [];
        if (req.files && Array.isArray(req.files)) {
            const newImages = req.files.map((file) => file.path);
            updatedImages = [...updatedImages, ...newImages];
        }
        const updateData = Object.assign(Object.assign(Object.assign(Object.assign({}, (sku && { sku })), (name && { name })), (price && { price: Number(price) })), { images: updatedImages });
        const updatedProduct = yield productService_1.productService.update(id, updateData);
        res.status(200).json({ product: updatedProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield productService_1.productService.delete(id);
        res.status(200).json({ message: "Product Deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to Delete Product" });
    }
});
exports.deleteProduct = deleteProduct;
