import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/jobs/description/${job?._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div className="">
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500 mt-3 mb-2">{job?.description}</p>
      </div>
      <div>
        <Badge className={"font-bold ml-1"}>{job?.position} Position</Badge>
        <Badge className={"font-bold ml-1"}>{job?.jobType}</Badge>
        <Badge className={"font-bold ml-1"}>{job?.salary} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
