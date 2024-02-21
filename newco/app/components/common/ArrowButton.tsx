import React from "react";
import RightArrow from "@/app/components/icon/RightArrow";
import LeftArrow from "@/app/components/icon/LeftArrow";

export function LeftArrowButton({
  onClick,
  className
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button className={`button-squared ${className || ""}`} onClick={onClick}>
      <LeftArrow />
    </button>
  );
}
export function RightArrowButton({
  onClick,
  className
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button className={`button-squared ${className || ""}`} onClick={onClick}>
      <RightArrow />
    </button>
  );
}
