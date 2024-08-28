import { setAdminJob } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispach = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get("/api/v1/job/getadminjobs", {
          withCredentials: true,
        });
        // console.log(res.data.jobs);
        // confirm(res.data.jobs);
        if (res.data.success) {
          dispach(setAdminJob(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  });
};

export default useGetAllAdminJobs;
