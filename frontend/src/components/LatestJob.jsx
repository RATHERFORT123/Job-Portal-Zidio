import React from "react";
import LatestJobCard from "./LatestJobCard.jsx";
import { useSelector } from "react-redux";
// const rendomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-3xl">Latest Jobs</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {typeof allJobs == "undefined" || allJobs.length <= 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
