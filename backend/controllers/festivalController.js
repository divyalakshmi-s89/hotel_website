const FestivalOrder = require('../models/FestivalOrder');

exports.submitFestivalOrder = async (req, res) => {
  try {
    const { name, mobile, email, eventType, eventDate, guestCount, message } = req.body;

    if (!name || !mobile || !eventType || !eventDate || !guestCount) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const order = new FestivalOrder({ name, mobile, email, eventType, eventDate, guestCount, message });
    await order.save();
    console.log(`🎉 Festival order saved: ${order._id} | ${eventType} | ${name}`);

    // WhatsApp notification (skip if Twilio not configured)
    const sid = process.env.TWILIO_ACCOUNT_SID;
    if (sid && sid !== 'your_twilio_account_sid') {
      try {
        const twilio = require('twilio');
        const client = twilio(sid, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to: process.env.OWNER_WHATSAPP,
          body:
            `🎉 *FESTIVAL ORDER ENQUIRY - Jeya Hotel*\n\n` +
            `👤 Name: ${name}\n📱 Mobile: ${mobile}\n` +
            `🎊 Event: ${eventType}\n` +
            `📅 Date: ${new Date(eventDate).toLocaleDateString('en-IN')}\n` +
            `👥 Guests: ${guestCount}\n📝 Message: ${message || 'N/A'}`
        });
      } catch (e) {
        console.error('⚠️  WhatsApp notification failed:', e.message);
      }
    } else {
      console.log('ℹ️  Twilio not configured – skipping WhatsApp for festival order.');
    }

    res.status(201).json({
      success: true,
      message: 'Festival order enquiry submitted! We will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Festival order error:', error);
    res.status(500).json({ success: false, message: 'Error submitting enquiry' });
  }
};
