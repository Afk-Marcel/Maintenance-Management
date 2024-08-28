import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const JobForm = ({ onAddJob }) => {
  // State to manage the job form input values
  const [job, setJob] = useState({
    description: "",
    location: "",
    priority: "Low",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to create a new job
      const response = await axios.post("/api/jobs", job);
      // Reset the form fields to their initial values
      setJob({ description: "", location: "", priority: "Low" });
      // Notify the parent component about the new job
      if (onAddJob) onAddJob(response.data);
    } catch (error) {
      // Log an error message if the request fails
      console.error("Error submitting the job", error);
    }
  };

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    // Update the job state with the new input value
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      {/* Input field for job description */}
      <input
        type="text"
        name="description"
        value={job.description}
        onChange={handleChange}
        placeholder="Job Description"
        required
        className="job-input"
      />
      {/* Input field for job location */}
      <input
        type="text"
        name="location"
        value={job.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="job-input"
      />
      {/* Dropdown for selecting job priority */}
      <select name="priority" value={job.priority} onChange={handleChange} className="job-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {/* Submit button to add the job */}
      <button type="submit" className="job-submit-button">
        Submit Job
      </button>
    </form>
  );
};

export default JobForm;
