"use client";
import ButtonArrow from "../icon/ButtonArrow";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  text,
  onClick,
  disabled,
  type,
  showArrow,
  className
}: ButtonProps) {
  const borderRadius = "rounded-[2px]";
  return (
    <button
      disabled={disabled}
      className={`button-primary p-2.5 border w-fit ${borderRadius} ${className}`}
      type={type}
      onClick={onClick}>
      <div className="flex gap-1.5 items-center">
        <div>{text}</div>
        {showArrow && <ButtonArrow />}
      </div>
    </button>
  );
}
