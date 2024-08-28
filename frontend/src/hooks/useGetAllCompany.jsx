import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/companySlice";
const useGetAllCompany = () => {
  const dispach = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get("/api/v1/company/get", {
          withCredentials: true,
        });
        // confirm(res.data.success);
        if (res.data.success) {
          dispach(setCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, []);
};

export default useGetAllCompany;
