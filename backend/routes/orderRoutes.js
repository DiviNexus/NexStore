import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized as admin");
    }

    const orders = await Order.find({}).populate("user", "id name email");
    res.json(orders);
  })
);

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  })
);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json({ message: "Order marked as paid", order: updatedOrder });
  })
);

// @desc    Update order to delivered (Admin only)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.put(
  "/:id/deliver",
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized as admin");
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json({ message: "Order marked as delivered", order: updatedOrder });
  })
);

export default router;
