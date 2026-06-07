const Review = require('../models/Review');

// Get all approved reviews
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};

// Submit review - auto approved so it shows instantly
exports.submitReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    // isApproved: true → shows instantly without admin action
    const review = new Review({ name, rating, comment, isApproved: true });
    await review.save();
    res.status(201).json({
      success: true,
      message: 'Review posted successfully!',
      review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting review' });
  }
};
