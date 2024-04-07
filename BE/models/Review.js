const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    dentist: {
      type: mongoose.Schema.ObjectId,
      ref: "Dentist",
      required: true,
    },
    rating: {
      type: Number,
      require: [true, "Please add a rating"],
      min: 0,
      max: 5,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete appointments when a hospital is deleted
HospitalSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Appointments being removed from dentist ${this._id}`);
    await this.model("Appointment").deleteMany({ hospital: this._id });
    next();
  }
);

// Reverse populate with virtuals
DentistSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "dentist",
  justOne: false,
});

module.exports = mongoose.model("Dentist", DentistSchema);
