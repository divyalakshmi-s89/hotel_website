const Order = require('../models/Order');
const Review = require('../models/Review');
const FestivalOrder = require('../models/FestivalOrder');
const jwt = require('jsonwebtoken');

// Admin login
exports.login = (req, res) => {
  const { secret } = req.body;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ success: true, token });
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, date, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;
    if (date) {
      const d = new Date(date);
      filter.orderDate = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
    }
    const orders = await Order.find(filter)
      .sort({ orderDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Order.countDocuments(filter);
    res.json({ success: true, orders, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order' });
  }
};

// Get daily sales report
exports.getDailySales = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 86400000);

    const orders = await Order.find({
      orderDate: { $gte: today, $lt: tomorrow },
      orderStatus: { $ne: 'Cancelled' }
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
    const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered').length;

    res.json({ success: true, totalRevenue, totalOrders, pendingOrders, deliveredOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching report' });
  }
};

// Review management
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: req.body.approved }, { new: true });
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating review' });
  }
};

// Festival orders
exports.getFestivalOrders = async (req, res) => {
  try {
    const orders = await FestivalOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching festival orders' });
  }
};

exports.updateFestivalStatus = async (req, res) => {
  try {
    const order = await FestivalOrder.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating festival order' });
  }
};
