const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    CompanyCode: {
      type: String,
      required: true,
      unique: true,
      maxlength: 3, // Restricting company code to 3 characters
    },
    EmployeeCounter: {
      type: Number,
      default: 0, // Each company starts employee numbering from 1
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
