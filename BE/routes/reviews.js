/**
 * @swagger
 * components:
 *   schemas:
 *    Review:
 *     type: object
 *     required:
 *      - user
 *      - review
 *      - rating
 *      - comment
 *     properties:
 *      id:
 *         type: string
 *         format: uuid
 *         description: The auto-generated id of the review
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      user:
 *         type: string
 *         format: uuid
 *         description: The auto-generated id of the user
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0852
 *      review:
 *         type: string
 *         format: uuid
 *         description: The auto-generated id of the review
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      rating:
 *          type: number
 *          description: rating score scale from 0 to 5
 *      comment:
 *          type: string
 *          description: comment
 *     example:
 *      id: 609bda561452242d88d36e37
 *      user: 609bda561452242d88d36e38
 *      review: 609bda561452242d88d36e37
 *      rating: 4
 *      comment: Good service
 *    DentistWithAvgRating:
 *     type: object
 *     required:
 *      - name
 *      - yearOfExp
 *      - areaOfExpertise
 *      - clinic
 *     properties:
 *      id:
 *         type: string
 *         format: uuid
 *         description: The auto-generated id of the review
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: review name
 *      yearOfExp:
 *          type: number
 *          description: years of experience
 *      areaOfExpertise:
 *          type: [string]
 *          description: area of expertise
 *      clinic:
 *          type: string
 *          format: uuid
 *          description: ref to clinic id
 *      avgRating:
 *          type: number
 *          description: average rating
 *     example:
 *      id: 609bda561452242d88d36e37
 *      name: Mr. A
 *      yearOfExp: 3
 *      areaOfExpertise: [General]
 *      clinic: 609bda561452242d88d36e37
 *      avgRating: 4.5
 *
 */

/**
 * @swagger
 * tags:
 *  name: Reviews
 *  description: The review managing API
 */

/**
 * @swagger
 * /reviews/{dentistId}:
 *  get:
 *    summary: Returns the list of reviews of a review
 *    tags: [Reviews]
 *    responses:
 *     200:
 *       description: The list of the reviews of a review
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update the review by the id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The review was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Remove the review by id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review was deleted
 *       404:
 *         description: The review was not found
 */

const express = require("express");

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByDentistId,
} = require("../controllers/reviews");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("user"), createReview)
  .get(getReviews);

router.route("/:dentistId").get(getReviewsByDentistId);

router
  .route("/:id")
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
