"use client";

import { useState } from "react";
import StackMenu, { IItem } from "@/app/components/common/Stack/StackMenu";
import GlassStack from "@/app/components/common/Stack/GlassStack";
import StackItems from "@/app/components/common/Stack/StackItems";

interface IStack {
  items: IItem[];
  stackImages: { id: number; img: string }[];
  defaultImage: string;
}

export default function Stack({
  items,
  stackImages = [],
  defaultImage = ""
}: IStack) {
  const maxGlassStackMobileWidth = "max-w-[200px]";
  const maxGlassStackWidth = "max-w-[390px]";
  const stackItemWidth = "max-w-[690px]";
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    undefined
  );

  const goToNext = () => {
    if (selectedItem === undefined) {
      setSelectedItem(0);
      return;
    }
    let next: number | undefined = selectedItem + 1;
    if (next >= items.length) next = undefined;
    setSelectedItem(next);
  };

  const goToPrevious = () => {
    let next: number | undefined;
    if (selectedItem == 0 || typeof selectedItem === undefined) {
      next = undefined;
    } else if (typeof selectedItem !== "undefined") {
      next = selectedItem - 1;
    }
    setSelectedItem(next);
  };
  return (
    <>
      {/* Desktop */}
      <div
        className={`content-container hidden md:flex flew-row justify-between ${stackItemWidth}`}>
        <div className="flex flex-col justify-between gap-7">
          {selectedItem === undefined ? (
            <StackMenu
              items={items}
              handleClick={(idx: number) => {
                setSelectedItem(idx);
              }}
            />
          ) : (
            <StackItems
              selectedItem={selectedItem}
              items={items}
              goToNext={goToNext}
              goToPrevious={goToPrevious}
            />
          )}
        </div>
        <div
          className={`w-[50%] ${maxGlassStackWidth} h-[100%] aspect-[1/1] mx-4`}>
          <GlassStack
            selectedItem={selectedItem}
            items={stackImages}
            defaultImage={defaultImage}
          />
        </div>
      </div>
      {/* Mobile */}
      <div className="flex flex-col md:hidden">
        {selectedItem === undefined ? (
          <StackMenu
            items={items}
            handleClick={(idx: number) => {
              setSelectedItem(idx);
            }}
          />
        ) : (
          <StackItems
            selectedItem={selectedItem}
            items={items}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
          />
        )}

        <div
          className={`w-full ${maxGlassStackMobileWidth} aspect-square my-7 mx-auto`}>
          <GlassStack
            selectedItem={selectedItem}
            defaultImage={defaultImage}
            items={stackImages}
          />
        </div>
      </div>
    </>
  );
}
