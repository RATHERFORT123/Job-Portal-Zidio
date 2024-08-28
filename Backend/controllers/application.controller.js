import { Application } from "../models/applicaton.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    // console.log("userId ", userId, "jobId ", jobId);

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }
    const existAppliction = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existAppliction) {
      return res.status(400).json({
        message: "You already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    // console.log("???????? ", job);
    /// new application apply.....
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applictions.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const appliction = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        /// nasted populat
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!appliction) {
      return res.status(400).json({
        message: "Application not found ..",
        success: false,
      });
    }
    return res.status(200).json({
      appliction,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applictions",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    // console.log("chetan ", job);
    if (!job) {
      return res.status(404).json({
        message: "Job not found..",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "Status requried ...",
        success: false,
      });
    }
    // console.log(status);
    //find application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    // console.log(application);
    // update status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
