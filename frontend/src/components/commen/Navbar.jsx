import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
// import { Button } from "../ui/button.jsx";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button.jsx";
import { Bell, BrickWallIcon, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice.js";
import { toast } from "sonner";
import { ADMIN_LOGOUT } from "@/utils/endpoint.js";
import logo from "../../../public/JobBoard.jpg";
import { io } from "socket.io-client";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge.js";
import { Effect } from "react-notification-badge";
import { setMsgs, removeUser } from "@/redux/jobSlice.js";
// import { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const socket = useMemo(() => io("http://localhost:8000"), []);

  const { jobMsgs } = useSelector((store) => store.job);
  // confirm(jobMsgs.data);
  // console.log("some", jobMsgs);
  // const [msg, setMsg] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("receive-message", (data) => {
      if (data) {
        // console.log("datas", data);
        dispatch(setMsgs(data));
        socket.disconnect();
      }
      // if (!msg.includes(data)) {
      // const indexs = jobMsgs.findIndex((msg) => msg._id === data._id);

      // dispatch(setMsgs([data]));
      // }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   const fatchMsgs = (data) => {
  //     dispatch(removeUser(data));
  //   };
  //   // fatchMsgs();
  // }, []);
  // const del = () => {
  //   // console.log("del");
  //   removeUser();
  // };
  return (
    <div className="bg-white sticky relative fixed">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="text-black mt-10">
          <img className="text-black size-48" src={logo} alt="" />
        </div>
        {/* <Button onClick={() => del()}>vvvvvvvvvvv</Button> */}
        <div className="flex font-medium item-center gap-12">
          <ul className="flex font-medium item-center gap-5">
            {user && user.role == "employe" ? (
              <>
                <li>
                  <Link to="/admin/companies">Company</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/browser">Browse</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {user && user.role !== "employe" ? (
          <div className="flex item-center gap-2">
            <Popover>
              <PopoverTrigger>
                <div>
                  <div className="ml-5 py-0.5">
                    <NotificationBadge
                      count={jobMsgs?.length}
                      effect={Effect.SCALE}
                    />
                  </div>
                  <div>
                    <Bell className="mr-1 mt-0.5" />
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0">
                <div>
                  <h1 className="p-2 font-bold">Job Alert</h1>
                  <hr />
                  <div className="flex flex-col text-gray-600">
                    {jobMsgs?.map((jobMsg) => (
                      <div
                        onClick={() =>
                          navigate(`/jobs/description/${jobMsg?._id}`)
                        }
                        className="flex item-center shadow-xl hover:bg-gray-100 gap-2 cursor-pointer"
                      >
                        <div className="px-3 py-2">
                          <div>
                            <div className="font-bold">{jobMsg?.title}</div>
                          </div>
                          <div className="text-sm text-gray-400">
                            {jobMsg?.description.slice(0, 40)} ....
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <></>
        )}
        {!user ? (
          <div className="flex item-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        ) : (
          <div className="flex font-medium item-center gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <h1 className="font-medium mt-2">
                Wel-Come
                {user && user.role == "employe" ? "  Admin" : "  User"}
              </h1>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <div>
                    <Avatar className="cursor-pointer my-3">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        // src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                  </div>

                  <div>
                    <h1 className="font-medium">Name : {user?.fullname}</h1>
                    <p className="text-sm text-muted-foreground">
                      BIO : {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit item-center gap-2 cursor-pointer">
                    <User2 className="my-2" />
                    <Button variant="link">
                      <Link to="/profile">View-Profile</Link>
                    </Button>
                  </div>

                  <div className="flex w-fit item-center gap-2 cursor-pointer">
                    <LogOut className="my-2" />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
