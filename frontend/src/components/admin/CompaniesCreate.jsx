import React, { useState } from "react";
import Navbar from "../commen/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompaneyName] = useState();
  const dispach = useDispatch();
  const registerNewCompany = async () => {
    try {
      console.log(companyName);
      const res = await axios.post(
        "/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.company);
      if (res?.data?.success) {
        dispach(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          //   value={companyName.companyName}
          //   name="companyName"
          onChange={(e) => setCompaneyName(e.target.value)}
          placeholder="Google Like ........"
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
