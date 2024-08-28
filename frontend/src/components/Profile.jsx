import React, { useState } from "react";
import Navbar from "./commen/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["css", "js", "react", "nodejs"];
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1> {user.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}> {item}</Badge>
              ))
            ) : (
              <h1>NA</h1>
            )}
          </div>
        </div>
        <div>
          <Label>Resume : </Label>
          {isResume ? (
            <a target="blank" href={user?.profile?.resume}>
              {user?.profile?.resumeOriginName}
            </a>
          ) : (
            <p>NA</p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-s-2xl">
        <h1 className="font-bold text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <ProfileUpdateModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
