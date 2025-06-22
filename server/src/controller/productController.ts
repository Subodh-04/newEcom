import { Request, Response } from "express";
import { productService } from "../service/productService";
import { Product } from "../entity/Product";
import path from "path";
import fs from "fs";

//get all the products!
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get the product by id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getbyId(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//add a product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sku, name, price } = req.body;

    const images = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );
    const product = await productService.create({ sku, name, price, images });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { sku, name, price } = req.body;

    let imagesToRemove: string[] = [];
    if (req.body.imagesToRemove) {
      try {
        imagesToRemove = JSON.parse(req.body.imagesToRemove);
      } catch (e) {
        res.status(400).json({ message: "Invalid imagesToRemove format" });
        return;
      }
    }

    const existingProduct = await productService.getbyId(id);
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    let updatedImages = existingProduct.images || [];
    if (imagesToRemove.length > 0) {
      updatedImages = updatedImages.filter(img => !imagesToRemove.includes(img));

      for (const imgPath of imagesToRemove) {
        fs.unlink(path.resolve(imgPath), (err) => {
          if (err) return ;
        });
      }
    }

    if (req.files && Array.isArray(req.files)) {
      const newImages = (req.files as Express.Multer.File[]).map(file => file.path);
      updatedImages = [...updatedImages, ...newImages];
    }

    const updateData: Partial<Product> = {
      ...(sku && { sku }),
      ...(name && { name }),
      ...(price && { price: Number(price) }),
      images: updatedImages,
    };

    const updatedProduct = await productService.update(id, updateData);
    res.status(200).json({ message: "Product updated", product: updatedProduct });

  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const product = await productService.delete(id);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Delete Product" });
  }
};
