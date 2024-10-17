const jobManager = require("../utils/utils");

const createJob = (req, res) => {
  const jobId = jobManager.createJob();
  res.status(201).json({ id: jobId, message: "Job Created Successfully" });
};

const getJobs = (req, res) => {
  const jobs = jobManager.getJobs().map((job) => ({
    id: job.id,
    status: job.status,
    result: job.status === "resolved" ? job.result : undefined,
    createdAt: job.createdAt,
  }));
  res.json(jobs);
};

const getJobById = (req, res) => {
  const job = jobManager.getJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json({
    id: job.id,
    status: job.status,
    result: job.status === "resolved" ? job.result : undefined,
    createdAt: job.createdAt,
  });
};

module.exports = { createJob, getJobs, getJobById };
