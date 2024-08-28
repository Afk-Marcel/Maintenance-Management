import React, { useState, useEffect } from "react";
import axios from "axios";
import JobItem from "./JobItem";
import "../styles.css";

const JobList = () => {
  // State to hold the list of jobs
  const [jobs, setJobs] = useState([]);
  // State to manage the current filter for job status
  const [filterStatus, setFilterStatus] = useState("all");

  // useEffect hook to fetch jobs when the component mounts or filterStatus changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch jobs from the API with the current filter status
        const response = await axios.get("/api/jobs", { params: { status: filterStatus } });

        // Sort the jobs by status and creation date
        const sortedJobs = response.data.sort((a, b) => {
          // Define the status priority order
          const statusOrder = ["completed", "in-progress", "submitted"];

          // Compare status first
          const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);

          if (statusComparison === 0) {
            // If status is the same, sort by creation date
            return new Date(a.createdAt) - new Date(b.createdAt);
          }

          return statusComparison;
        });

        // Update the state with the sorted jobs
        setJobs(sortedJobs);
      } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [filterStatus]);

  // Function to handle job archiving
  const handleArchive = (jobId) => {
    // Remove the archived job from the list
    setJobs(jobs.filter((job) => job._id !== jobId));
  };

  // Function to handle job updates
  const handleUpdate = (updatedJob) => {
    // Update the job in the list with the new details
    setJobs(jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job)));
  };

  return (
    <div className="job-list-container">
      {/* Filter dropdown to select job status */}
      <div className="filter-container">
        <select className="filter-select" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
          <option value="all">All</option>
          <option value="submitted">Submitted</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {/* List of jobs */}
      <ul className="job-list">
        {jobs.map((job) => (
          // Render each job as a JobItem component
          <JobItem key={job._id} job={job} onArchive={handleArchive} onUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default JobList;
