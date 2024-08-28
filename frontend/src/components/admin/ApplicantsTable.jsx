import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  // console.log(applicants.applictions);
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`/api/v1/application/status/${id}/update`, {
        status,
      });
      if (res.data.success) {
        toast.success(res.data.success);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="mr-10 ml-10">
        <Table>
          <TableCaption>Users applied applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contect</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants &&
              applicants?.applictions?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    <a href={item?.applicant?.profile?.resume}>
                      {item?.applicant?.profile?.resumeOriginName}
                    </a>
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        {shortListingStatus?.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(status, item?._id)}
                              key={index}
                              className="cursor-pointer my-2 font-bold w-fit"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
