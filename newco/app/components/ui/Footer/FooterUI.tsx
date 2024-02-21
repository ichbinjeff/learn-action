"use client";

import IconLink from "@/app/components/common/IconLink";
import { IFooter } from "@/app/services/strapi/types";

export default function Footer({ icons, copyrightNotice }: IFooter) {
  function scrollToHeader() {
    const el = document.getElementById("header");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="relative z-100 bg-primary-default ">
      <div className="flex flex-row m-auto px-4 md:px-11 justify-between py-5 text-neutral-ivory">
        {/* Social media icons */}
        <div className="flex flex-grow gap-1">
          {icons.length > 0 && (
            <div className="cursor-pointer pr-5" onClick={scrollToHeader}>
              <img
                src={icons[0].icon?.url || ""}
                alt={icons[0].icon?.alternativeText || ""}
              />
            </div>
          )}

          {icons.slice(1).map((item, idx) => (
            <IconLink
              key={`icon-${idx + 1}`} // Adjusted index to start from 1 since we're slicing from the second item
              href={item.link || ""}
              img={item.icon?.url || ""}
              alt={item.icon?.alternativeText || ""}
            />
          ))}
        </div>
        {/* Copyright */}
        <div className="text-md leading-[26px]">{copyrightNotice}</div>
      </div>
    </footer>
  );
}
