import React, { useEffect, useState } from "react";
import Navbar from "../commen/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const { singleCompany } = useSelector((store) => store.company);
  // confirm(singleCompany.name);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  // const changeFileHandler = (e) => {
  //   const file = e.target.file?.[0];
  //   setInput({ ...input, file });
  // };
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    const fd = new FormData();
    fd.append("name", input.name);
    fd.append("description", input.description);
    fd.append("website", input.website);
    fd.append("location", input.location);
    console.log(input.file);
    if (input.file) {
      fd.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/company/update/${params.id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar />

      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2"
          >
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              accept="image/*"
              type="file"
              // name="file"
              onChange={changeFileHandler}
            />
          </div>
        </div>

        {loading ? (
          <Button type="submit" className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Update
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanySetup;
