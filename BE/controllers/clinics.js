const Clinic = require("../models/Clinic");

exports.getClinics = async (req, res, next) => {
  try {
    let query = await Clinic.find();

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await Clinic.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const clinics = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: clinics.length,
      pagination,
      data: clinics,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
