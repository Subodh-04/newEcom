"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const productValidation_1 = require("../validator/productValidation");
const zod_1 = require("zod");
const validateProduct = (req, res, next) => {
    try {
        // For multipart/form-data (images), price may come as string, so convert it
        if (req.body.price) {
            req.body.price = Number(req.body.price);
        }
        // Validate the body using schema
        productValidation_1.productSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        next(error);
    }
};
exports.validateProduct = validateProduct;
