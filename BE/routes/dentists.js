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
 *         description: The auto-generated id of the hospital
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: Hospital name
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
 *         description: The auto-generated id of the hospital
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: Hospital name
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
 *       description: The hospital was not found
 */

/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: The hospital was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /hospitals/{id}:
 *   put:
 *     summary: Update the hospital by the id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       200:
 *         description: The hospital was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: The hospital was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Remove the hospital by id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital id
 *     responses:
 *       200:
 *         description: The hospital was deleted
 *       404:
 *         description: The hospital was not found
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

const router = express.Router();

router.use("/:dentistId/appointments", appointmentRouter);

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
