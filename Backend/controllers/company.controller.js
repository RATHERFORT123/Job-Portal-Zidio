import { Company } from "../models/company.model.js";
import getDataUri from "../Utils/datauri.js";
import cloudanary from "../Utils/clouddinary.js";
export const registeCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    // console.log(companyName);
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is requrie",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    console.log(company);
    if (company) {
      return res.status(400).json({
        message: "You can't register same Company",
        success: false,
      });
    }
    // console.log(companyName);
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered susscessfull.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);
    const company = await Company.find({ userId });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById({ companyId });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary ...
    // console.log("file", file);
    const fileUri = getDataUri(file);
    const cloudeResponse = await cloudanary.uploader.upload(fileUri.content);

    const logo = cloudeResponse.secure_url;

    // console.log(res.body);
    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Company not update",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company update success",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
