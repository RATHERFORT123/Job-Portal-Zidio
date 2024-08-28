import React, { useEffect } from "react";
import Navbar from "./commen/Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import CategoryCaurousel from "./CategoryCaurousel.jsx";
import LatestJob from "./LatestJob.jsx";
import Footer from "./commen/Footer.jsx";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "employe") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCaurousel />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
