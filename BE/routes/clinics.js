/**
 * @swagger
 * components:
 *   schemas:
 *    Clinic:
 *     type: object
 *     required:
 *      - name
 *      - address
 *      - district
 *      - province
 *      - postalcode
 *      - region
 *     properties:
 *      id:
 *         type: string
 *         format: uuid
 *         description: The auto-generated id of the clinic
 *         example: 290f1ee-6c54-4b01-90e6-d701748f0851
 *      name:
 *          type: string
 *          description: Clinic name
 *      address:
 *          type: string
 *          description: House No., Street, Road
 *      district:
 *          type: string
 *          description: District
 *      province:
 *          type: string
 *          description: province
 *      postalcode:
 *          type: string
 *          description: 5-digit postal code
 *      tel:
 *          type: string
 *          description: telephone number
 *      region:
 *          type: string
 *          description: region
 *     example:
 *      id: 609bda561452242d88d36e37
 *      name: Happy Clinic
 *      address: 121 ถ.สุขุมวิท
 *      district: บางนา
 *      province: กรุงเทพมหานคร
 *      postalcode: 10110
 *      tel: 02-2187000
 *      region: กรุงเทพมหานคร (Bangkok)
 *
 */

/**
 * @swagger
 * tags:
 *  name: Clinics
 *  description: The clinic managing API
 */

/**
 * @swagger
 * /clinic:
 *  get:
 *    summary: Returns the list of all the clinics
 *    tags: [Clinics]
 *    responses:
 *     200:
 *       description: The list of the clinics
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Clinic'
 */

const express = require("express");
const { getClinics } = require("../controllers/clinics");

const router = express.Router();

router.route("/").get(getClinics);

module.exports = router;
