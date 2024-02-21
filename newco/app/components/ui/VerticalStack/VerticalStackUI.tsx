"use client";

import React, { useState, useEffect } from "react";
import Stack from "@/app/components/common/Stack";
import { IItem } from "@/app/components/common/Stack/StackMenu";
import SectionHeader from "../../common/SectionHeader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export interface IVerticalStackProps {
  title: string;
  subTitle: string;
  items: IItem[];
  stackImages: IImage[];
  defaultImage: IImage;
}

export interface IImage {
  url: string;
  alternativeText: string;
}

export default function VerticalStack({
  title,
  subTitle,
  items,
  stackImages,
  defaultImage
}: IVerticalStackProps) {
  const headerWidth = "max-w-[796px]";
  const fullConfig = resolveConfig(tailwindConfig);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileBreakpoint = fullConfig.theme.screens.sm.replace("px", ""); // Remove 'px' to compare as number
    const mediaQuery = `(max-width: ${mobileBreakpoint}px)`;

    const checkMobile = () => {
      setIsMobile(window.matchMedia(mediaQuery).matches);
    };

    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile); // Add listener for resize events

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative my-11">
      <SectionHeader
        className={`${headerWidth}`}
        alignCenter={!isMobile}
        title={title}
        subtitle={subTitle}
      />
      <div className="mt-7">
        <Stack
          items={items}
          defaultImage={defaultImage.url || ""}
          stackImages={stackImages.map((item, index) => ({
            img: item.url,
            id: index
          }))}
        />
      </div>
    </div>
  );
}
