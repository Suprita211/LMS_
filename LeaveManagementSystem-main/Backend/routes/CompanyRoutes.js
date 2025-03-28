const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Function to create a new company
router.post("/create-company", async (req, res) => {
    try {
      const { CompanyName, CompanyCode } = req.body;
  
      // Validate input
      if (!CompanyName || !CompanyCode) {
        return res.status(400).json({ message: "Company Name and Code are required" });
      }
  
      if (CompanyCode.length > 5) {
        return res.status(400).json({ message: "Company Code must be at most 5 characters long" });
      }
  
      // Check if company already exists
      const existingCompany = await Company.findOne({ CompanyName });
      if (existingCompany) {
        return res.status(400).json({ message: "Company already exists" });
      }
  
      // Create a new company with EmployeeCounter starting from 1
      const newCompany = new Company({
        CompanyName,
        CompanyCode: CompanyCode.toUpperCase(), // Convert to uppercase for uniformity
        EmployeeCounter: 0, // Will start from 1 when an employee is added
      });
  
      await newCompany.save();
      res.status(201).json({ message: "Company created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  
  router.get("/get-companies", async (req, res) => {
    try {
      const companies = await Company.find({}, "CompanyName CompanyCode"); // Fetch only required fields
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = router;
