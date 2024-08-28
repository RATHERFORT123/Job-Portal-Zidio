import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../commen/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import {  useState } from "react";
import { io } from "socket.io-client";
const PostJob = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    loction: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const socket = useMemo(() => io("http://localhost:8000"), []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // socket.on("connect", () => {
    //   console.log("connected", socket.id);
    // });

    // socket.emit("message", "ok");
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/job/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        socket.on("connect", () => {
          console.log("connected", socket.id);
        });

        socket.emit("message", res.data.job);
        socket.disconnect();
        toast.success(res.data.message);

        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div>
        <h6 className="text-4xl font-bold text-center">Post Jobs</h6>
      </div>
      <div className="flex items-center justify-center w-screen my-5">
        <div>
          {companies.length == 0 && (
            <p className="text-xl text-red-600 font-bold">
              You Cannot Post Job First Register Company
            </p>
          )}
        </div>
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>{" "}
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>{" "}
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>{" "}
            <div>
              <Label>Loction</Label>
              <Input
                type="text"
                name="loction"
                value={input.loction}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>{" "}
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div className="col-span-2">
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select A Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              {loading ? (
                <Button type="submit" className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Post Job
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
