import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed
import connectDB from "./config/db.js"; // your db connection file

dotenv.config();
connectDB();

const products = [
  {
    name: "High Performance Gaming Laptop",
    price: 80000,
    description: "16GB RAM, 512GB SSD, Intel i7",
    brand: "Dell",
    category: "Electronics",
    countInStock: 10,
    image: "/images/laptop.jpg",
  },
  {
    name: "Smartphone Pro",
    price: 60000,
    description: "Flagship smartphone with amazing camera, 128GB storage, AMOLED display",
    brand: "Samsung",
    category: "Electronics",
    countInStock: 15,
    image: "/images/phone.jpg",
  },
  {
    name: "Wireless Headphones",
    price: 1500,
    description: "Noise-cancelling over-ear headphones, 30hr battery",
    brand: "Sony",
    category: "Audio",
    countInStock: 25,
    image: "/images/headphones.jpg",
  },
  {
    name: "Smartwatch X",
    price: 12000,
    description: "Track fitness and notifications on the go",
    brand: "Apple",
    category: "Wearables",
    countInStock: 8,
    image: "/images/watch.jpg",
  },
  {
    name: "Gaming Mouse",
    price: 2500,
    description: "High precision mouse with RGB lighting",
    brand: "Logitech",
    category: "Accessories",
    countInStock: 20,
    image: "/images/mouse.jpg",
  },
  {
    name: "Mechanical Keyboard",
    price: 4500,
    description: "Durable keyboard with tactile switches",
    brand: "Corsair",
    category: "Accessories",
    countInStock: 12,
    image: "/images/keyboard.jpg",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // clears old products
    await Product.insertMany(products);
    console.log("✅ Sample products imported!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
