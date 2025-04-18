import express from "express";
import { registerCompany, singleCompany, userCompanies,updateCompany } from "../controllers/company.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";


const router = express.Router();

router.post("/register", isAuthenticated,singleUpload, registerCompany); // ✅ Remove multer


router.get("/companies",isAuthenticated,userCompanies);

router.get("/singleCompany/:id",isAuthenticated,singleCompany);

router.put("/update/:id",isAuthenticated,singleUpload,updateCompany);

export default router;