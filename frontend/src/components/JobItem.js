import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const JobItem = ({ job, onArchive, onUpdate }) => {
  // State to manage whether the item is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // States to manage the updated values for job properties
  const [newDescription, setNewDescription] = useState(job.description);
  const [newLocation, setNewLocation] = useState(job.location);
  const [newPriority, setNewPriority] = useState(job.priority);
  const [newStatus, setNewStatus] = useState(job.status);

  // Function to handle job update
  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the job details
      const response = await axios.put(`/api/jobs/update/${job._id}`, {
        description: newDescription,
        location: newLocation,
        priority: newPriority,
        status: newStatus,
      });
      // Exit edit mode after successful update
      setIsEditing(false);
      // Notify the parent component with the updated job data
      if (onUpdate) onUpdate(response.data);
    } catch (error) {
      // Log an error message if the request fails
      console.error("Error updating job", error);
    }
  };

  // Function to handle job archiving
  const handleArchive = async () => {
    try {
      // Send a DELETE request to archive the job
      await axios.delete(`/api/jobs/${job._id}/archive`);
      // Notify the parent component about the archived job
      if (onArchive) onArchive(job._id);
    } catch (error) {
      // Log an error message if the request fails
      console.error("Error archiving job", error);
    }
  };

  return (
    <li className="job-item">
      {isEditing ? (
        // Display the edit form when in editing mode
        <div className="job-edit-form">
          {/* Input field for job description */}
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description"
          />
          {/* Input field for job location */}
          <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Location" />
          {/* Dropdown for selecting job priority */}
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {/* Dropdown for selecting job status */}
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="submitted">Submitted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {/* Button to save the updated job details */}
          <button className="update-button" onClick={handleUpdate}>
            Save
          </button>
          {/* Button to cancel editing */}
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        // Display job details when not in editing mode
        <div className="job-details">
          {/* Display job ID */}
          <span className="job-id">ID: {job._id}</span>
          {/* Display job description */}
          <span className="job-description">{job.description}</span>
          {/* Display job location */}
          <span className="job-location">{job.location}</span>
          {/* Display job priority */}
          <span className="job-priority">Priority: {job.priority}</span>
          {/* Display job status with conditional styling */}
          <span className={`job-status ${job.status}`}>Status: {job.status}</span>
          {/* Display job creation date */}
          <span className="job-date">Date Created: {new Date(job.createdAt).toLocaleDateString()}</span>
          <div className="job-actions">
            {/* Button to enter editing mode */}
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            {/* Button to archive the job */}
            <button className="archive-button" onClick={handleArchive}>
              Archive
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default JobItem;
