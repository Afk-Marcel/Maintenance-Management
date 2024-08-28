# Maintenance Management App

The Maintenance Management App is a web application designed to help manage maintenance jobs efficiently. It allows users to add, update, archive, and batch update job statuses, among other features. The application is built using React for the frontend and Node.js with Express and MongoDB for the backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Jobs Endpoints](#jobs-endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Overview

This app serves as a tool to manage maintenance tasks within an organization. Users can track job descriptions, locations, priorities, and statuses, ensuring that all tasks are handled efficiently.

## Features

- Add new jobs with details such as description, location, and priority.
- Update the status and details of individual jobs.
- Batch update the status of multiple jobs simultaneously.
- Archive jobs that are no longer active.
- View a sortable list of jobs by status and submission date.

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Styling:** CSS

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/maintenance-management-app.git
   cd maintenance-management-app
   ```
2. **Install dependencies for the backend:**
   ```bash
   cd backend
   npm install
   ```
3. **Install dependencies for the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. Set up the environment variables: Create a .env file in the backend directory and include the following:
   ```plaintext
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   ```
2. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
3. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```
4. Access the application at http://localhost:3000.

## API Endpoints

### Jobs Endpoints

- **Create a new job:**

  - **Endpoint:** `POST /api/jobs`
  - **Description:** Adds a new job to the database with specified details such as description, location, and priority.
  - **Request Body:**
    ```json
    {
      "description": "Fix the AC unit",
      "location": "Building A, Room 101",
      "priority": "High"
    }
    ```
  - **Response:**
    - **201 Created**: The job has been successfully created.
    - **500 Internal Server Error**: Failed to create the job.

- **Get all jobs:**

  - **Endpoint:** `GET /api/jobs`
  - **Description:** Fetches all jobs with an optional status filter.
  - **Query Parameters:**
    - `status` (optional): Filter jobs by status (`submitted`, `in-progress`, `completed`).
  - **Response:**
    - **200 OK**: Returns a list of jobs.
    - **500 Internal Server Error**: Failed to fetch jobs.

- **Update a specific job:**

  - **Endpoint:** `PUT /api/jobs/update/:id`
  - **Description:** Updates job details based on the job ID.
  - **Request Body:**
    ```json
    {
      "description": "Repair the door",
      "location": "Building B, Room 202",
      "priority": "Medium",
      "status": "in-progress"
    }
    ```
  - **Response:**
    - **200 OK**: The job has been successfully updated.
    - **404 Not Found**: Job not found.
    - **500 Internal Server Error**: Failed to update the job.

- **Batch update jobs:**

  - **Endpoint:** `PUT /api/jobs/batch-update`
  - **Description:** Updates the status of multiple jobs based on the provided job IDs.
  - **Request Body:**
    ```json
    {
      "jobIds": ["66ca1aab89e3ecb4774fbf36", "66c768376ba283a145298de5"],
      "status": "completed"
    }
    ```
  - **Response:**
    - **200 OK**: Batch update successful.
    - **404 Not Found**: One or more jobs not found.
    - **500 Internal Server Error**: Failed to update jobs.

- **Archive a job:**
  - **Endpoint:** `DELETE /api/jobs/:id/archive`
  - **Description:** Archives a job by its ID.
  - **Response:**
    - **200 OK**: Job archived successfully.
    - **404 Not Found**: Job not found.
    - **500 Internal Server Error**: Failed to archive the job.

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

- `PORT`: Port number for the backend server.
- `MONGODB_URI`: MongoDB connection string.

## Troubleshooting

- **Error batch updating jobs:** Ensure that job IDs are correctly formatted and exist in the database. Verify the request body is structured correctly and matches what the backend expects.
- **Backend server not starting:** Double-check the MongoDB connection string in your `.env` file. Ensure the server is running on the correct port specified in the `.env`.

## License

This project is licensed under the MIT License.
