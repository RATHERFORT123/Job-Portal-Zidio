import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSerchCompany } from "@/redux/companySlice";
import Navbar from "../commen/Navbar";

const Companies = () => {
  useGetAllCompany();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispach = useDispatch();
  useEffect(() => {
    dispach(setSerchCompany(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Companiy
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
