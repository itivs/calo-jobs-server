const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const JOBS_FILE = path.join(__dirname, "../jobs.json");

let jobs = [];

function loadJobs() {
  if (fs.existsSync(JOBS_FILE)) {
    const data = fs.readFileSync(JOBS_FILE, "utf-8");

    jobs = data ? JSON.parse(data) : [];

    jobs.forEach((job) => {
      if (job.status === "pending") {
        executeJob(job);
      }
    });
  }
}

function saveJobs() {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

function createJob() {
  const id = uuidv4();
  const job = {
    id,
    status: "pending",
    result: null,
    createdAt: new Date().toISOString(),
  };
  jobs.push(job);
  saveJobs();
  executeJob(job);
  return id;
}

function getJobs() {
  return jobs;
}

function getJobById(id) {
  return jobs.find((job) => job.id === id);
}

function executeJob(job) {
  const delaySeconds = Math.floor(Math.random() * 60) * 5000 + 5000;

  setTimeout(async () => {
    try {
      const imageUrl = await fetchRandomFoodImage();
      job.status = "resolved";
      job.result = imageUrl;
      console.log(`Job ${job.id} resolved with image ${imageUrl}`);
    } catch (error) {
      job.status = "failed";
      job.result = error.message;
      console.error(`Job ${job.id} failed: ${error.message}`);
    }
    saveJobs();
  }, delaySeconds);
}

async function fetchRandomFoodImage() {
  const response = await axios.get(
    `${process.env.UNSPLASH_API_URL}/photos/random?query=food&client_id=${process.env.UNSPLASH_API_KEY}`
  );

  const imageUrl = response.data.urls.regular;

  return imageUrl;
}

loadJobs();

module.exports = {
  createJob,
  getJobs,
  getJobById,
};
