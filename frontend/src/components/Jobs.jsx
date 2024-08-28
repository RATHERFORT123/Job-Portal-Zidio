import React, { useEffect, useState } from "react";
import Navbar from "./commen/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, serchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (serchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(serchQuery.toLowerCase()) ||
          job?.description?.toLowerCase().includes(serchQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(serchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, serchQuery]);
  console.log(allJobs);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {typeof filterJobs == "undefined" || filterJobs.length <= 0 ? (
            <span> Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-2/3 lg:grid-cols-3 gap-4">
                {filterJobs?.map((job) => (
                  <div>
                    <Job job={job} key={job?._id} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
