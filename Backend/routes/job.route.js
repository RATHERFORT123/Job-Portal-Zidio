import express from "express";

import isAuthenticated from "../middliwares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  JobDeleteById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/del/:id").get(JobDeleteById);

export default router;
