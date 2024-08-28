import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { Avatar } from "../ui/avatar";
// import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DeleteIcon, Edit2, EyeIcon, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
// import { space } from "postcss/lib/list";

const AdminJobsTable = () => {
  // const { companies, serchComapyByText } = useSelector(
  //   (store) => store.company
  // );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [fileterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredJob =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJob);
  }, [allAdminJobs, searchJobByText]);

  // useEffect(() => {
  const deletes = async (id) => {
    try {
      const res = await axios.get(`/api/v1/job/del/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/admin/jobs/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // }, []);
  return (
    <div>
      <Table>
        <TableCaption>Post Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {fileterJobs?.length <= 0 || fileterJobs?.length == "undefined" ? (
            <span>Not Found</span>
          ) : ( */}
          {fileterJobs?.map((job) => (
            <tr>
              <TableCell>{job.company.name}</TableCell>
              <TableCell>{job.title}</TableCell>

              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent>
                    {/* <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex my-2 font-bold cursor-pointer"
                    >
                      <Edit2 />
                      <span className="ml-5">Edit</span>
                    </div> */}
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex my-2 font-bold cursor-pointer"
                    >
                      <EyeIcon />
                      <span className="ml-5">Applicants Applications</span>
                    </div>
                    <div
                      onClick={() => deletes(job._id)}
                      className="flex my-2 font-bold cursor-pointer"
                    >
                      <DeleteIcon />
                      <span className="ml-5">Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminJobsTable;
