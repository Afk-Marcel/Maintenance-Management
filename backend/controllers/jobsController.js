const Job = require("../models/Job");
const mongoose = require("mongoose");

// Create a new job
exports.createJob = async (req, res) => {
  const { description, location, priority } = req.body;
  try {
    // Create a new job instance
    const job = new Job({ description, location, priority });
    // Save the job to the database
    await job.save();
    // Respond with the newly created job and a status of 201 (Created)
    res.status(201).json(job);
  } catch (error) {
    // Handle any errors that occur during job creation
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs with optional status filter
exports.getAllJobs = async (req, res) => {
  const { status } = req.query;
  // Determine the filter based on the status query parameter
  const filter = status && status !== "all" ? { status } : {};
  try {
    // Find jobs that match the filter and are not archived, then sort by priority and creation date
    const jobs = await Job.find({ ...filter, archived: false }).sort({ priority: 1, createdAt: 1 });
    // Respond with the list of jobs
    res.json(jobs);
  } catch (error) {
    // Handle any errors that occur during job retrieval
    res.status(500).json({ error: error.message });
  }
};

// Update information about a single job
exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const { description, location, priority, status } = req.body;

  try {
    // Find and update the job by ID with the new information
    const updatedJob = await Job.findByIdAndUpdate(id, { description, location, priority, status }, { new: true });

    // Check if the job was found and updated
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Respond with the updated job information
    res.json(updatedJob);
  } catch (error) {
    // Handle any errors that occur during job update
    res.status(500).json({ error: error.message });
  }
};

// Archive a job
exports.archiveJob = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the job by ID and mark it as archived
    const result = await Job.findByIdAndUpdate(id, { archived: true }, { new: true });

    // Check if the job was found and updated
    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Respond with a success message
    res.json({ message: "Job archived successfully" });
  } catch (error) {
    // Handle any errors that occur during job archiving
    res.status(500).json({ error: error.message });
  }
};

exports.batchUpdateJobs = async (req, res) => {
  const { jobIds, status } = req.body;

  // Convert jobIds from string to ObjectId
  const objectIds = jobIds.map((id) => new mongoose.Types.ObjectId(id));

  try {
    // Use updateMany to update multiple documents
    const result = await Job.updateMany({ _id: { $in: objectIds } }, { $set: { status } });

    // Check if any documents were matched
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No jobs found with the provided IDs" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error in batchUpdateJobs:", error);
    res.status(500).json({ error: error.message });
  }
};
