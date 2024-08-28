import React, { useEffect, useState } from "react";
import Navbar from "../commen/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJob } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState();
  const navigate = useNavigate();
  const dispach = useDispatch();
  useEffect(() => {
    dispach(setSearchJob(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name , role"
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
