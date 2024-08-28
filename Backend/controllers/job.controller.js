import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  console.log(req.body);
  const userId = req.id;
  try {
    const {
      title,
      description,
      requirements,
      salary,
      loction,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    // console.log(userId);
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !loction ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Some thing is misssing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      loction,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    // console.log(job);
    return res.status(201).json({
      message: "job created success full",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(201).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = await Job.findById(jobId).populate({
      path: "applictions",
    });
    // console.log("BY ID ", jobs);
    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    // confirm(adminId);
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    // console.log(jobs);
    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const JobDeleteById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = await Job.deleteOne({ _id: jobId });
    if (!jobs) {
      return res.status(404).json({
        message: " not delete",
        success: false,
      });
    }
    return res.status(200).json({
      message: " delete",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
