import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of Apply Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>JobRole</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {typeof allAppliedJobs == "undefined" ||
          allAppliedJobs.length <= 0 ? (
            <span>You have not apply any jobs</span>
          ) : (
            allAppliedJobs.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>

                <TableCell>
                  <Badge
                    className={`rounded-lg font-bold text-slate-100  ${
                      item.status == "accepted"
                        ? "bg-green-600"
                        : item.status == "rejected"
                        ? "bg-red-500"
                        : "bg-blue-600"
                    }`}
                  >
                    {item?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
