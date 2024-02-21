import { LeftArrowButton, RightArrowButton } from "../ArrowButton";
interface StackItemsProps {
  items: any;
  selectedItem: number | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
}

export default function StackItems({
  items,
  selectedItem,
  goToNext,
  goToPrevious
}: StackItemsProps) {
  const item = selectedItem !== undefined ? items[selectedItem] : undefined;
  const maxWidth = "max-w-[690px]";
  return (
    <>
      {/* Desktop */}
      <div className={`hidden md:block ${maxWidth}`}>
        {/* Nav Arrows */}
        <div className="flex flex-row gap-5">
          <LeftArrowButton onClick={goToPrevious} />

          <RightArrowButton onClick={goToNext} />
        </div>
        {/* Content */}
        <div className="py-7">
          <h3 className="subtitle1 mb-7 pb-4">{item && item.name}</h3>
          <div className="body1">{item && item.desc}</div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden content-container px-4">
        <div className=" border-black border-b border-dashed flex justify-between h-[78px]">
          <div className="px-1">
            <LeftArrowButton onClick={goToPrevious} />
          </div>
          <h3 className="subtitl1 text-center pb-4">{item && item.name}</h3>
          <div className="px-1">
            <RightArrowButton onClick={goToNext} />
          </div>
        </div>
        <div className="mt-6 body1">{item && item.desc}</div>
      </div>
    </>
  );
}
