import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import setLoading, { setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

// import store from "../redux/storage.js";

const ProfileUpdateModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileEventHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("fullname", input.fullname);
    fd.append("email", input.email);
    fd.append("phoneNumber", input.phoneNumber);
    fd.append("bio", input.bio);
    fd.append("skills", input.skills);
    if (input.file) {
      fd.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post("api/v1/user/profile/update", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w=[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Updata Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={SubmitHandler}>
            <div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Name : </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3 "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Email : </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Number : </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  className="col-span-3 "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Bio : </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Skills : </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3 "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 my-2">
                <Label className="text-right">Resume : </Label>
                <Input
                  id="file"
                  type="file"
                  value={input.resume}
                  onChange={changeFileEventHandler}
                  accept="image/*"
                  name="file"
                  className="col-span-3 "
                />
              </div>
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileUpdateModal;
