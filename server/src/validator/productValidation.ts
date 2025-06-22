import { z } from "zod";

export const productSchema = z.object({
  sku: z.string().min(1, "SKU is required").regex(/^[A-Z0-9-]+$/, "SKU must be alphanumeric and uppercase"),
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be a non-negative number"),
});
