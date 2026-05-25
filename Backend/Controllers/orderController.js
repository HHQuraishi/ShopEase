const asyncHandler = require("../Middleware/asyncHandler.js");
const Order = require("../Models/Order.js");

const createOrder = asyncHandler(async (req,res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0){
        res.status(400); throw new Error("No order items!");}
    const order = await Order.create({
        user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice});
    res.status(201).json({ success: true, data: order });
});

const getMyOrders = asyncHandler(async (req,res) => {   
    const orders = (await Order.find({ user: req.user._id})).sort({ createdAt: -1});
    res.status(200).json({ success: true, count: orders.length, data: orders });
});

const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){ res.status(404); throw new Error("Order not found");}
    res.status(200).json({ success: true, data: order });
});

const updateOrderStatus = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    if(!order) {res.status(404); throw new Error("Order not found!");}
    order.orderStatus = req.body.orderStatus || order.orderStatus;
    if(req.body.orderStatus === "Delivered"){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
    }
    const updated = await order.save();
    res.status(200).json({ success: true, data: updated });
});

const getAllOrders = asyncHandler(async (req,res) => {
    const orders = (await Order.find().populate("user","name email")).sort({createdAt: -1});
    res.status(200).json({ success: true, count: orders.length, data: orders });
});

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders };