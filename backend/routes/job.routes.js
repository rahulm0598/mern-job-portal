import express from "express";
import { postJob,getAllJobs,getjob,getAdminJobs } from "../controllers/job.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
// Create a new job


router.post("/post",isAuthenticated,postJob);
router.get("/getall",getAllJobs);
router.get("/getsingle/:id",isAuthenticated,getjob);
router.get("/getAdminJobs",isAuthenticated,getAdminJobs);
// router.patch("/update/:id", isAuthenticated, updateJob);
export default router;


