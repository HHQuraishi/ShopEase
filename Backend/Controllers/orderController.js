const asyncHandler = require("../Middleware/asyncHandler.js");
const Order = require("../Models/Order.js");
const Razorpay = require('razorpay');

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

// controllers/orderController.js

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay order
// @route   POST /api/orders/:id/razorpay
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order nahi mila!');
  }

  // Razorpay order create karo
  const options = {
    amount: Math.round(order.totalPrice * 100), // Paise mein convert karo
    currency: 'INR',
    receipt: `order_${order._id}`,
    payment_capture: 1
  };

  const razorpayOrder = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  });
});

// @desc    Verify Razorpay payment
// @route   POST /api/orders/:id/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  } = req.body;

  const crypto = require('crypto');
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error('Payment verify nahi hua!');
  }

  // Order paid mark karo
  const order = await Order.findById(req.params.id);
  order.isPaid = true;
  order.paidAt = Date.now();
  order.orderStatus = 'Processing';
  order.paymentResult = {
    id: razorpay_payment_id,
    status: 'paid'
  };

  await order.save();

  res.json({ success: true, message: 'Payment successful!' });
});

// Routes add karo (orderRoutes.js mein):
// router.post('/:id/razorpay', protect, createRazorpayOrder);
// router.post('/:id/verify', protect, verifyPayment);

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus, getAllOrders, createRazorpayOrder, verifyPayment };