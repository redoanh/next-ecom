"use client"
import React, { useState } from "react";
import Image from "next/image";

interface CategoryCardProps {
  imageSrc: any;
  title: string;
  bgColor: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageSrc,
  title,
  bgColor,
  onClick,
}) => {

  const [hovered, setHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    borderRadius: "50px",
    backgroundColor: hovered ? "#1abc9c" : bgColor,
    padding: "10px",
    width: "50%",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const imageStyle: React.CSSProperties = {
    borderRadius: "60%",
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={30}
        height={30}
        style={imageStyle}
      />
      <p style={{fontSize:"10px"}}>{title}</p>
    </div>
  );
};

export default CategoryCard;
