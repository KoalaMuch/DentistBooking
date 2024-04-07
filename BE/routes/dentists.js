/**
 * @swagger
 * components:
 *   schemas:
 *    Dentist:
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
 *         description: The auto-generated id of the dentist
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: dentist name
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
 *     example:
 *      id: 609bda561452242d88d36e37
 *      name: Mr. A
 *      yearOfExp: 3
 *      areaOfExpertise: [General]
 *      clinic: 609bda561452242d88d36e37
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
 *         description: The auto-generated id of the dentist
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: dentist name
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
 *  name: Dentists
 *  description: The dentist managing API
 */

/**
 * @swagger
 * /dentists:
 *  get:
 *    summary: Returns the list of all the dentists and their average rating
 *    tags: [Dentists]
 *    responses:
 *     200:
 *       description: The list of the dentists
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DentistWithAvgRating'
 */

/**
 * @swagger
 * /dentists/{id}:
 *  get:
 *    summary: Get the dentist by id
 *    tags: [Dentists]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The dentist id
 *    responses:
 *     200:
 *       description: The dentist description by id
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dentist'
 *     404:
 *       description: The dentist was not found
 */

/**
 * @swagger
 * /dentists:
 *   post:
 *     summary: Create a new dentist
 *     tags: [Dentists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dentist'
 *     responses:
 *       201:
 *         description: The dentist was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dentist'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /dentists/{id}:
 *   put:
 *     summary: Update the dentist by the id
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dentist'
 *     responses:
 *       200:
 *         description: The dentist was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dentist'
 *       404:
 *         description: The dentist was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /dentists/{id}:
 *   delete:
 *     summary: Remove the dentist by id
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id
 *     responses:
 *       200:
 *         description: The dentist was deleted
 *       404:
 *         description: The dentist was not found
 */

const express = require("express");
const {
  getDentists,
  getDentist,
  createDentist,
  updateDentist,
  deleteDentist,
} = require("../controllers/dentist");
const { protect, authorize } = require("../middleware/auth");

const appointmentRouter = require("./appointments");
const reviewRouter = require("./reviews");

const router = express.Router();

router.use("/:dentistId/appointments", appointmentRouter);
router.use("/:dentistId/reviews", reviewRouter);

router
  .route("/")
  .get(getDentists)
  .post(protect, authorize("admin"), createDentist);
router
  .route("/:id")
  .get(getDentist)
  .put(protect, authorize("admin"), updateDentist)
  .delete(protect, authorize("admin"), deleteDentist);

module.exports = router;
