import express  from 'express';

import {isAuthenticated} from "../middleware/isAuthenticated.js";
import { applyForJob, changeStatus, getAppliedJobs, getJobApplicants } from '../controllers/application.controller.js';


const router = express.Router();
router.post("/apply/:jobId",isAuthenticated,applyForJob);
router.get("/applied",isAuthenticated,getAppliedJobs);
router.get("/getapplicants/:jobId",isAuthenticated,getJobApplicants);
router.put("/status/:applicationId",isAuthenticated,changeStatus);


export default router;