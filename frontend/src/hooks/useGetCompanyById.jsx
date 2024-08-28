import { setSingleCompany } from "@/redux/companySlice";

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispach = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`/api/v1/company/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispach(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispach]);
};

export default useGetCompanyById;
