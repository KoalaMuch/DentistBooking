const express = require("express");
const { getClinics } = require("../controllers/clinics");

const router = express.Router();

router.route("/").get(getClinics);
