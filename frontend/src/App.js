import React, { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import BatchUpdate from "./components/BatchUpdate";
import "./styles.css";

function App() {
  // State to hold the list of jobs
  const [jobs, setJobs] = useState([]);
  // State to trigger re-rendering of job list and batch updates
  const [updateKey, setUpdateKey] = useState(0);

  // Function to fetch jobs from the API
  const fetchJobs = async () => {
    try {
      // Send a GET request to the backend to retrieve jobs
      const response = await axios.get("/api/jobs");
      setJobs(response.data); // Update state with fetched jobs
    } catch (error) {
      // Log an error message if the request fails
      console.error("Error fetching jobs", error);
    }
  };

  // useEffect hook to fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to handle adding a new job, which triggers a re-render
  const handleAddJob = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  // Function to handle job archiving, refreshes the job list
  const handleArchive = () => {
    fetchJobs();
  };

  // Function to handle batch updates, triggers a re-render
  const handleBatchUpdate = () => {
    fetchJobs(); // Refresh the job list after batch update
  };

  // Function to handle sorting, reloads the page
  const handleSortClick = () => {
    window.location.reload();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Main header of the app */}
        <h1>Maintenance Management App</h1>
      </header>
      <main className="app-main">
        {/* Component to handle job addition */}
        <JobForm onAddJob={handleAddJob} />
        {/* Component to display the list of jobs with an archive option */}
        <JobList key={updateKey} jobs={jobs} onArchive={handleArchive} />
        {/* Button to trigger sorting of the job list */}
        <button className="sort-button" onClick={handleSortClick}>
          Sort
        </button>
        <BatchUpdate onBatchUpdate={handleBatchUpdate} />
      </main>
    </div>
  );
}

export default App;
