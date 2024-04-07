const express = require("express");

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, authorize("user"), createReview);

router.route("/:dentistId").get(getReviews);

router
  .route("/:id")
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
