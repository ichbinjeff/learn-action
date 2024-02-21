export default function ProgressItem({
  color,
  onClick,
}: {
  color: "orange" | "grey";
  onClick: () => void;
}) {
  const stroke = color === "orange" ? "#FF865D" : "#8BA5B1";

  return (
    <div className="px-[4px] py-[10px] cursor-pointer" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="4"
        viewBox="0 0 29 4"
        fill="none"
      >
        <path
          d="M2 1.66406H27"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
