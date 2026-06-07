const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
  total:    { type: Number },          // price × quantity — stored for easy reading in Compass
  category: { type: String, default: 'Food' },
}, { _id: false });                    // _id: false → cleaner array in Compass

const orderSchema = new mongoose.Schema({
  // ── Customer Info ──────────────────────────────
  customerName:   { type: String, required: true, trim: true },
  mobileNumber:   { type: String, required: true, trim: true },
  address:        { type: String, required: true, trim: true },
  landmark:       { type: String, trim: true, default: '' },
  pincode:        { type: String, trim: true, default: '' },

  // ── Delivery ───────────────────────────────────
  distanceKm:     { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },

  // ── Order Items ────────────────────────────────
  items:          [orderItemSchema],
  totalItems:     { type: Number },    // total count of items

  // ── Pricing ────────────────────────────────────
  subtotal:       { type: Number, required: true },
  totalAmount:    { type: Number, required: true },
  paymentMethod:  { type: String, default: 'Cash on Delivery' },

  // ── Meta ───────────────────────────────────────
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  specialInstructions: { type: String, trim: true, default: '' },
  notificationSent:    { type: Boolean, default: false },
  orderDate:           { type: Date,    default: Date.now },
}, {
  timestamps: true,           // adds createdAt & updatedAt
  versionKey: false,          // removes __v field — cleaner in Compass
});

// Pre-save: auto-compute per-item totals and totalItems count
orderSchema.pre('save', function (next) {
  this.items = this.items.map(item => ({
    ...item.toObject ? item.toObject() : item,
    total: item.price * item.quantity,
  }));
  this.totalItems = this.items.reduce((sum, i) => sum + i.quantity, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
