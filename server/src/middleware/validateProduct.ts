import { Request, Response, NextFunction } from "express";
import { productSchema } from "../validator/productValidation";
import { ZodError } from "zod";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) :void=> {
  try {
    if (req.body.price) {
      req.body.price = Number(req.body.price);
    }

    productSchema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
       res.status(400).json({
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
