# calo-jobs-server

A simple job processing system that demonstrates handling asynchronous jobs with a React frontend and Node.js backend.

## Features

- Create new jobs that fetch random food images from Unsplash
- View list of all jobs and their statuses
- Auto-update job status and results
- Persistent storage using file system
- Handles unstable connections with polling and retries

## Setup Instructions

### Backend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. create .env file

3. Add your Unsplash API key and URL to .env

4. Start the server:
   ```bash
   npm start
   ```

## Time Report

Total time spent: Approximately 2 hours

- Backend implementation: 2 hours

## Implementation Notes

### High Load Handling

- File operations are async to prevent blocking
- Jobs are processed independently
- Frontend polls for updates with reasonable intervals

### Unstable Connection Handling

- Frontend implements retry logic
- Regular polling for updates
- Error states are properly handled and displayed

### Persistence

- All job data is stored in a JSON file
- File operations are atomic
- Error handling for file operations
