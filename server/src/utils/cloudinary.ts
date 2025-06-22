import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
  const ext = file.mimetype.split("/")[1];
  return {
    folder: "ecommerce_products",
    format: ext === "jpeg" ? "jpg" : ext,
    allowed_formats: ["jpg", "jpeg", "png"],
  };
}
});

export { cloudinary, storage };
