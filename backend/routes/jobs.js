const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");

// Route to create a new job
router.post("/", jobsController.createJob);

// Route to get all jobs with optional status filter
router.get("/", jobsController.getAllJobs);

// Route to update a specific job
router.put("/update/:id", jobsController.updateJob);

// Route to archive a specific job
router.delete("/:id/archive", jobsController.archiveJob);

// Route to batch-update jobs
router.put("/batch-update", jobsController.batchUpdateJobs);

module.exports = router;
