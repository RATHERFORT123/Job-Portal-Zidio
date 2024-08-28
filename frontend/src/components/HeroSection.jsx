import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSerchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

import illustration from "../../public/illustration.png";
import { motion } from "framer-motion";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSerchQuery(query));
    navigate("/browser");
  };

  return (
    <div className="bg-container">
      <div className="text-center">
        <div className="container text-gray text-center">
          <div className="row">
            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="col-md-6 d-flex justify-content-center "
            >
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="col-md-6 "
                style={{ paddingTop: "150px" }}
              >
                {/* <h5 style={{ fontSize: "30px", fontWeight: "inherit" }}>
                4536+ Jobs listed
              </h5> */}
                <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
                  Find your dream job
                </h1>
                <p style={{ fontSize: "20px" }}>
                  Join the community of 1000+ professionals and choose the job
                  that suits your profile
                </p>
              </motion.div>
              <div className="flex flex-col gap-5 my-5">
                {/* <h1 className="text-5xl font-bold">Search Apply</h1> */}
                <div className="flex  w-1/2 m-[3%] shadow-lg border pl-3 items-center gap-4 mx-auto">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search job"
                    className="outline-none border-none w-full"
                  />
                  <Button onClick={searchJobHandler} className="">
                    <Search className="'h-5 w-5" />
                  </Button>
                </div>
              </div>
              <img src={illustration} alt="" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
