import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Create product (Admin only)
router.post("/", protect, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as admin" });
  }

  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update product (Admin only)
router.put("/:id", protect, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as admin" });
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product (Admin only)
router.delete("/:id", protect, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as admin" });
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
