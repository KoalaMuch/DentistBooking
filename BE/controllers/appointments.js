const Appointment = require("../models/Appointment");
const Dentist = require("../models/Dentist");

const limit = process.env.APPOINTMENT_LIMIT || 1;

//@desc Get all appointments
//@route GET /api/v1/appointments
//@access Public
exports.getAppointments = async (req, res, next) => {
  let query;
  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user.id }).populate({
      path: "dentist",
      select: "name yearOfExp areaOfExpertise",
    });
  } else {
    query = Appointment.find().populate({
      path: "dentist",
      select: "name yearOfExp areaOfExpertise",
    });
  }
  try {
    const appointments = await query;
    res
      .status(200)
      .json({ success: true, count: appointments.length, data: appointments });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

//@desc Get single appointment
//@route GET /api/v1/appointments/:id
//@access Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "dentist",
      select: "name yearOfExp areaOfExpertise",
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Cannot find Appointment with id ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

//@desc Add appointment
//@route POST /api/v1/dentist/:dentistId/appointments
//@access Private
exports.addAppointment = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for exist appointment
    const existedAppointments = await Appointment.find({ user: req.user.id });

    // If the user is not admin, they can only create 1 appointment.
    if (req.user.role !== "admin" && existedAppointments.length >= limit) {
      return res.status(400).json({
        success: false,
        message:
          "The user with ID " +
          req.user.id +
          `has already booked ${limit} appointments`,
      });
    }

    req.body.dentist = req.params.dentistId;
    const dentist = await Dentist.findById(req.params.dentistId);
    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: `No dentist with the id of ${req.params.dentistId}`,
      });
    }
    const appointment = await Appointment.create(req.body);
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Cannot create Appointment" });
  }
};

//@desc Update appointment
//@route PUT /api/v1/appointments/:id
//@access Private

exports.updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Cannot find Appointment with id ${req.params.id}`,
      });
    }

    // Make sure user is appointment owner
    if (
      appointment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.params.id} is not authorized to update this appointment`,
      });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Cannot update Appointment" });
  }
};

//@desc Delete appointment
//@route DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Cannot find Appointment with id ${req.params.id}`,
      });
    }

    // Make sure user is appointment owner
    if (
      appointment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.params.id} is not authorized to delete this appointment`,
      });
    }

    await appointment.deleteOne();
    res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Cannot delete Appointment" });
  }
};
