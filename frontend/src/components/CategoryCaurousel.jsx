import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { Slice } from "lucide-react";
// import { Slice } from "react";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Developer",
  "Full Stack Developer",
];

import { useDispatch } from "react-redux";
import { setSerchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const CategoryCaurousel = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSerchQuery(query));
    navigate("/browser");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-5 justify-content-center">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/4 lg-basis-1/5 basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full"
              >
                {index + 1 + " "}
                {cat.slice(0, 10) + "..."}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCaurousel;
