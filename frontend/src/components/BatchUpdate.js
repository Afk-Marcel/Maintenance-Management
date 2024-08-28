import React, { useState } from "react";
import axios from "axios";

// Functional component for batch updating job statuses
const BatchUpdate = ({ onBatchUpdate }) => {
  // State to hold the input job IDs (as a comma-separated string)
  const [jobIds, setJobIds] = useState("");
  // State to hold the selected status for update
  const [status, setStatus] = useState("");

  // Function to handle the batch update action
  const handleBatchUpdate = async () => {
    try {
      // Convert the comma-separated job IDs string into an array of trimmed IDs
      const idsArray = jobIds.split(",").map((id) => id.trim());

      // Send a PUT request to the backend API to update the job statuses
      await axios.put("/api/jobs/batch-update", { jobIds: idsArray, status });

      // Call the onBatchUpdate callback if provided
      if (onBatchUpdate) onBatchUpdate();
    } catch (error) {
      // Log any errors that occur during the batch update process
      console.error("Error batch updating jobs", error);
    }
  };

  return (
    <div className="batch-update-container">
      <h3>Batch Update Job Status</h3>
      <div className="batch-update-form">
        {/* Input field for entering job IDs */}
        <label>
          Job Descriptions (comma-separated):
          <input
            type="text"
            value={jobIds}
            onChange={(e) => setJobIds(e.target.value)}
            placeholder="Enter job IDs separated by commas"
          />
        </label>
        {/* Dropdown to select the job status to be updated */}
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="submitted">Submitted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        {/* Button to trigger the batch update */}
        <button onClick={handleBatchUpdate}>Update Status</button>
      </div>
    </div>
  );
};

export default BatchUpdate;
