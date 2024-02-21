import RightArrow from "../../icon/RightArrow";
import StackMenuArrowMobile from "../../icon/StackMenuArrowMobile";
import { RightArrowButton } from "../ArrowButton";

interface StackMenuProps {
  handleClick: (idx: number) => void;
  items: IItem[];
}
export interface IItem {
  name: string;
  desc: string;
}

export default function StackMenu({ handleClick, items }: StackMenuProps) {
  const menuItemWidth = "w-[578px]";

  return (
    <>
      {/* Desktop version */}
      <div className={`${menuItemWidth} hidden md:block self-center mt-9`}>
        {items.map((item: any, idx: number) => (
          <div key={idx}>
            <div
              className={`flex justify-between gap-1.5 items-center my-4 cursor-pointer  
              ${idx === 0 && "mt-0"} ${idx === items.length - 1 && "mb-0"}`}
              onClick={() => handleClick(idx)}>
              <div className="body1">{item.name}</div>
              <RightArrowButton />
            </div>
            {idx < items.length - 1 && (
              <hr className="default-border border-dashed" />
            )}
          </div>
        ))}
      </div>
      {/* Mobile version */}
      <div className="flex flex-col gap-y-1.5 md:hidden">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex mx-4 px-1.5 h-9 items-center justify-between default-border rounded-[2px] cursor-pointer"
            onClick={() => handleClick(idx)}>
            <div className="body1">{item.name}</div>
            <div>
              <StackMenuArrowMobile />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
