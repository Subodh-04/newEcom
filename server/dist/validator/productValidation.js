"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
// Define your product schema using Zod
exports.productSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, "SKU is required"),
    name: zod_1.z.string().min(1, "Name is required"),
    price: zod_1.z
        .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
        .positive("Price must be greater than 0"),
    images: zod_1.z.array(zod_1.z.string()).optional(),
});
