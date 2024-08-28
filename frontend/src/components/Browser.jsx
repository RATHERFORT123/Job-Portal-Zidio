import React, { useEffect } from "react";
import Navbar from "./commen/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSerchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Helmet } from "react-helmet-async";

// const randomJobs = [1, 2, 3];
const Browser = () => {
  useGetAllJobs();
  const dispach = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispach(setSerchQuery(""));
    };
  });
  return (
    // <Helmet>
    //     <title> Dashboard | Minimal UI </title>
    //   </Helmet>
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="max-w-7xl mx-auto my-10">
          <h1 className="font-bold text-xl my-10">
            Search Result ({allJobs.length})
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job job={job} key={job._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browser;
