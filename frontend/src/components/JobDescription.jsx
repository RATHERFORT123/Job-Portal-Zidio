import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { removeUser, setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./commen/Navbar";

const JobDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params.id;
  // confirm(jobId);
  const { singlJob } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.auth);

  const isAppliedIntially =
    singlJob?.applictions?.some(
      (applictions) => applictions.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isAppliedIntially);
  const dispach = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`/api/v1/application/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true); ////////just applied
        const updateSigleJob = {
          ...singlJob,
          applictions: [...singlJob.applictions, { applicant: user?._id }],
        };

        dispach(setSingleJob(updateSigleJob)); // ui updata of applicant total number
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`/api/v1/job/get/${jobId}`, {
          withCredentials: true,
        });
        // confirm(res.data);
        if (res.data.success) {
          dispach(setSingleJob(res.data.jobs));
          setIsApplied(
            res.data.jobs?.applictions?.some(
              (applictions) => applictions.applicant == user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispach, user?._id]);

  useEffect(() => {
    const fatchMsgs = (data) => {
      dispach(removeUser(data));
    };
    fatchMsgs(jobId);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
          <div className="max-w-7xl mx-auto my-10">
            <h1 className="font-bold text-xl my-10">Details About Job</h1>
          </div>
          <div className="">
            <h1 className="font-medium text-lg">
              All About Details of the job
            </h1>
            <div>
              <h1 className="font-medium text-lg my-2">{singlJob?.title}</h1>
            </div>
            <p className="text-sm text-gray-500">
              Location : {singlJob?.loction}
            </p>
            <p className="text-sm text-gray-500">
              Description :{singlJob?.description}.
            </p>{" "}
            <p className="text-sm text-gray-500">
              JobType : {singlJob?.jobType}
            </p>{" "}
            <p className="text-sm text-gray-500">
              Salary : {singlJob?.salary} LPA
            </p>{" "}
            <p className="text-sm text-gray-500">
              Position : {singlJob?.position}
            </p>
            <p className="text-sm text-gray-500">
              Experience Requried year : {singlJob?.experienceLevel}
            </p>
          </div>
          <div>
            <Badge className={"font-bold ml-1"}></Badge>
            <Badge className={"font-bold ml-1"}></Badge>
            <Badge className={"font-bold ml-1"}></Badge>
          </div>
          <div className="my-4">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disable={isApplied}
              className={`rounded-lg ${
                isApplied ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {isApplied ? "Alrady Applied" : "Apply Now"}
            </Button>
          </div>
          <h1>Totle applicants applyed: {singlJob?.applictions?.length}</h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
