import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispach = useDispatch();
  const { serchQuery } = useSelector((store) => store.job);
  // ?keyword=${serchQuery}
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`api/v1/job/get?keyword=${serchQuery}`, {
          withCredentials: true,
        });
        // console.log("chetan");
        if (res.data.success) {
          dispach(setAllJobs(res.data.jobs));
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
