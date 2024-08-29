"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import React from "react";
import book1 from "../../assets/book1.jpg";
import book2 from "../../assets/book2.jpg";
import book3 from "../../assets/book3.jpg";

function CategoryList() {
  const handleCardClick = () => {
    // Handle the click event here
    console.log("Card clicked!");
  };

  // Create an array of objects with the data for each CategoryCard
  const categoryData = [
    { imageSrc: book1, title: "প্যারাডক্সিকেল সাজিদ", bgColor: "#bbb" },
    { imageSrc: book2, title: "আরজ আলীর সমীপে", bgColor: "#bbb" },
    { imageSrc: book3, title: "নবী জীবনের গল্প", bgColor: "#bbb" },
    { imageSrc: book3, title: "নবী জীবনের গল্প", bgColor: "#bbb" },
  
  ];

  return (
    <>
      <div className="grid grid-cols-3" style={{ padding: "15px" }}>
        <div className="col-span-3" style={{ display: "flex", gap: "10px" }}>
          {categoryData.map((data, index) => (
            <CategoryCard
              key={index}
              imageSrc={data.imageSrc}
              title={data.title}
              bgColor={data.bgColor}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryList;