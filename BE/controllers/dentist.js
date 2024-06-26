const Dentist = require("../models/Dentist");
const Review = require("../models/Review");

//@desc Get all dentist
//@route GET /api/v1/dentists
//@access Public
exports.getDentists = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = Dentist.find(JSON.parse(queryStr)).populate("appointments");

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Dentist.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    var dentists = await query;

    for (var i = 0; i < dentists.length; i++) {
      const aggrResult = await Review.aggregate([
        {
          $match: {
            dentist: dentists[i]._id,
          },
        },
        {
          $group: {
            _id: null,
            average: {
              $avg: "$rating",
            },
          },
        },
      ]);
      dentists[i] = {
        ...dentists[i].toObject(),
        avgRating: aggrResult[0]?.average,
      };
    }

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

    pagination.totalPage = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: dentists.length,
      pagination,
      data: dentists,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

//@desc Get single dentist
//@route GET /api/v1/dentists/:id
//@access Public
exports.getDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: dentist });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Create new dentist
//@route POST /api/v1/dentists
//@access Private
exports.createDentist = async (req, res, next) => {
  const dentist = await Dentist.create(req.body);
  res.status(201).json({
    success: true,
    data: dentist,
  });
};

//@desc Update dentist
//@route PUT /api/v1/dentists/:id
//@access Private
exports.updateDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dentist) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: dentist });
  } catch (err) {
    console.log(err);
    res.status(450).json({ success: false });
  }
};

//@desc Delete dentist
//@route DELETE /api/v1/dentists/:id
//@access Private
exports.deleteDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if (!dentist) {
      return res.status(400).json({ success: false });
    }
    await dentist.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
