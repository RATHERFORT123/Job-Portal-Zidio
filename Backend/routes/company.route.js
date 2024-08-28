import express from "express";

import isAuthenticateds from "../middliwares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registeCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middliwares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticateds, registeCompany);
router.route("/get").get(isAuthenticateds, getCompany);
router.route("/get/:id").get(isAuthenticateds, getCompanyById);
router.route("/update/:id").post(isAuthenticateds, singleUpload, updateCompany);

export default router;
