"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Hero = () => {
  const scrollableDiv = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([]);

  const items = [
    "All courses",
    "Project Management",
    "Business Management",
    "Employability Skills",
    "Life Learning",
    "Hr & Management",
    "SEO",
    "Branding",
  ];

  const scrollAmount = 200;

  // Fetch data from API
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get("api.github.com/users");
    setBlogs(response.data.users);
    console.log(response.data.users);
  };

    fetchCourses();
  }, []);

  const scrollNext = () => {
    if (scrollableDiv.current && currentIndex < items.length - 1) {
      scrollableDiv.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
    }
  };

  const scrollPrev = () => {
    if (scrollableDiv.current && currentIndex > 0) {
      scrollableDiv.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div className="flex flex-col py-5 px-5">
      <div className="flex items-center justify-center my-10">
        {currentIndex > 0 && (
          <div className="mr-2">
            <Image
              src={assets.Previous}
              className="h-6 w-6 cursor-pointer"
              alt="Previous"
              onClick={scrollPrev}
            />
          </div>
        )}

        <div
          ref={scrollableDiv}
          className="flex items-center gap-2 overflow-x-auto w-[60vw] scrollbar-hide whitespace-nowrap"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="border rounded-2xl bg-white py-1 px-4 text-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {currentIndex < items.length - 1 && (
          <div className="ml-2">
            <Image
              src={assets.Next}
              className="h-6 w-6 cursor-pointer"
              alt="Next"
              onClick={scrollNext}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border-none p-6 bg-white rounded-lg lg:h-[594px]">
            <div className="flex flex-col h-full">
              <div className="h-[50%] flex flex-col gap-[20px]">
                <Image
                  src={course.image_url || '/default-image.png'} 
                  className="cursor-pointer"
                  alt={course.course_name || 'Course Image'} 
                  width={400}
                  height={200}
                />
                <p className="font-semibold">{course.course_name}</p>
              </div>
              <div className="h-[50%] justify-between mt-14 flex flex-col">
                <div className="flex flex-row gap-2">
                  {course.tags && course.tags.map((tag, index) => (
                    <div key={index}  className="flex flex-row items-center gap-1 border bg-[#EFF4FF] rounded-xl lg:w-[132px] px-2 ">
                      <Image src={tag.tag_image_url || '/default-tag.png'} className="h-4 w-4" alt={tag.tag_text || 'Tag'} />
                      <p>{tag.tag_text}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className=" text-[#4F4F4F] ">
                    {course.sub_title}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#4F4F4F]">From</p>
                    <p className="font-semibold">£{course.sale_price}</p>
                    <p className="text-[#4F4F4F]">/ month</p>
                  </div>
                  <hr className="w-2/3 mt-2" />
                  <div className=" justify-between flex flex-row">
                    <div className="flex flex-row gap-2">
                      <p className="font-semibold">£{course.regular_price}</p>
                      <span className="text-gray-500 line-through">₹1455</span>
                      <p className="font-semibold">in full</p>
                    </div>
                    <p>View details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
