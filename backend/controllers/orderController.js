const Order = require('../models/Order');

const calculateDeliveryCharge = (distance) => {
  if (distance <= 1)  return 0;
  if (distance <= 3)  return 20;
  if (distance <= 5)  return 40;
  if (distance <= 10) return 60;
  return 80;
};

const sendWhatsAppNotification = async (order) => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  if (!sid || sid === 'your_twilio_account_sid') {
    console.log('ℹ️  Twilio not configured – skipping WhatsApp notification.');
    return false;
  }
  try {
    const twilio  = require('twilio');
    const client  = twilio(sid, process.env.TWILIO_AUTH_TOKEN);
    const itemsList = order.items
      .map(i => `• ${i.name} ×${i.quantity} = ₹${i.total}`)
      .join('\n');

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to:   process.env.OWNER_WHATSAPP,
      body:
        `🍛 *NEW ORDER – Jeya Hotel*\n\n` +
        `👤 ${order.customerName}  📱 ${order.mobileNumber}\n` +
        `📍 ${order.address}${order.landmark ? ', ' + order.landmark : ''}\n\n` +
        `🛒 *Items:*\n${itemsList}\n\n` +
        `💰 Subtotal : ₹${order.subtotal}\n` +
        `🚚 Delivery : ₹${order.deliveryCharge}\n` +
        `💵 *Total   : ₹${order.totalAmount}*\n` +
        `💳 ${order.paymentMethod}\n` +
        `${order.specialInstructions ? '📝 ' + order.specialInstructions + '\n' : ''}` +
        `🕐 ${new Date(order.orderDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
    });
    console.log('✅ WhatsApp sent to owner');
    return true;
  } catch (err) {
    console.error('⚠️  WhatsApp failed:', err.message);
    return false;
  }
};

// POST /api/orders/place
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, mobileNumber, address, landmark, pincode,
            distance, items, specialInstructions } = req.body;

    if (!customerName || !mobileNumber || !address || !items?.length) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const dist           = parseFloat(distance) || 0;
    const deliveryCharge = calculateDeliveryCharge(dist);
    const subtotal       = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const totalAmount    = subtotal + deliveryCharge;

    // Build clean items array with per-item total
    const cleanItems = items.map(i => ({
      name:     i.name,
      price:    i.price,
      quantity: i.quantity,
      total:    i.price * i.quantity,
      category: i.category || 'Food',
    }));

    const order = new Order({
      customerName, mobileNumber, address,
      landmark:    landmark    || '',
      pincode:     pincode     || '',
      distanceKm:  dist,
      items:       cleanItems,
      subtotal,
      deliveryCharge,
      totalAmount,
      specialInstructions: specialInstructions || '',
    });

    await order.save();
    console.log(`📦 Order saved → ID: ${order._id} | ₹${totalAmount} | ${customerName}`);

    const notified = await sendWhatsAppNotification(order);
    if (notified) { order.notificationSent = true; await order.save(); }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will contact you shortly.',
      orderId: order._id,
      totalAmount,
      deliveryCharge,
    });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ success: false, message: 'Failed to place order. Please try again.' });
  }
};

// GET /api/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch {
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};

// GET /api/orders/delivery/charge?distance=3
exports.getDeliveryCharge = (req, res) => {
  const distance = parseFloat(req.query.distance) || 0;
  res.json({ success: true, deliveryCharge: calculateDeliveryCharge(distance), distance });
};
