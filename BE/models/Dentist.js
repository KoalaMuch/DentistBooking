const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    yearOfExp: {
      type: Number,
      required: [true, "Please add year of experience"],
    },
    areaOfExpertise: {
      type: String,
      required: [true, "Please add area of expertise"],
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
