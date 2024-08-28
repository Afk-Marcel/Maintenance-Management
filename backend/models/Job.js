const mongoose = require("mongoose");

// Define the schema for the Job model
const jobSchema = new mongoose.Schema({
  // Description of the job, required field
  description: { type: String, required: true },

  // Location where the job is to be performed, required field
  location: { type: String, required: true },

  // Priority level of the job, with predefined values: "Low", "Medium", "High", and required
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },

  // Status of the job with predefined values: "submitted", "in-progress", "completed", default is "submitted"
  status: { type: String, enum: ["submitted", "in-progress", "completed"], default: "submitted" },

  // Date when the job was created, defaults to the current date and time
  createdAt: { type: Date, default: Date.now },

  // Flag to indicate if the job is archived, defaults to false
  archived: { type: Boolean, default: false },
});

// Create the Job model using the defined schema
const Job = mongoose.model("Job", jobSchema);

// Export the Job model to be used in other parts of the application
module.exports = Job;
