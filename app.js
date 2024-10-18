require("dotenv").config({ path: `${process.cwd()}/.env` });

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Connection Successfull",
  });
});

// Use the job routes
app.use("/api/jobs", jobRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
