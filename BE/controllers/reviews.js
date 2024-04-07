const Review = require("../models/Review");

//@desc Get all reviews of the dentist
//@route GET /api/v1/reviews
//@access Public

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ dentist: req.params.dentistId });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

//@desc Add new review
//@route POST /api/v1/reviews
//@access Private
exports.createReview = async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: review,
  });
};

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: `Cannot find Review with id ${req.params.id}`,
      });
    }
    // Make sure user is review owner
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this review`,
      });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

//@desc Delete review
//@route DELETE /api/v1/reviews/:id
//@access Private
exports.deleteReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: `Cannot find Review with id ${req.params.id}`,
      });
    }
    // Make sure user is review owner
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this review`,
      });
    }
    await review.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
