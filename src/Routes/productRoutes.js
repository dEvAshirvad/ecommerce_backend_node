import express from "express";
import productController from "../Controller/Products/productController.js";
import adminaccess from "../middleware/adminaccess.js";

const productRoutes = express.Router();

productRoutes.post("/category", adminaccess, productController.createCategory);
productRoutes.get("/category", productController.listCategory);
productRoutes.post("/", adminaccess, productController.createProduct);
productRoutes.get("/", productController.getProducts);
productRoutes.put("/", adminaccess, productController.updateProducts);
productRoutes.post("/reviews", productController.createReviews);

export default productRoutes;
