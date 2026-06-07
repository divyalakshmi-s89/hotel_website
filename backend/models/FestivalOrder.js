const mongoose = require('mongoose');

const festivalOrderSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  mobile:     { type: String, required: true, trim: true },
  email:      { type: String, trim: true, default: '' },
  eventType:  { type: String, required: true },
  eventDate:  { type: Date,   required: true },
  guestCount: { type: Number, required: true },
  message:    { type: String, trim: true, default: '' },
  status: {
    type: String,
    enum: ['New', 'In Discussion', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'New'
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('FestivalOrder', festivalOrderSchema);
