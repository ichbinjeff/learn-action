export default function ControlButton({
  isSelected = false,
  onClick
}: {
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-primary-orange"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          fill={isSelected ? "currentColor" : "none"}
          stroke="#1D1D1D"
        />
      </svg>
    </div>
  );
}
