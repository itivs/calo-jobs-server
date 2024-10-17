const router = require("express").Router();

const {
  createJob,
  getJobs,
  getJobById,
} = require("../controllers/jobController");

router.post("/", createJob);

router.get("/", getJobs);

router.get("/:id", getJobById);

module.exports = router;
