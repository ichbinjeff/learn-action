"use client";
import { IParsedMedia } from "@/app/services/strapi/types";
import Button from "../../common/Button";
import scrollToId from "../../utils/scrollToId";

interface HeroUIProps {
  header: string;
  subheader: string;
  img?: IParsedMedia;
}

// This is the client side component for the Home Page Hero section
export default function HeroUI({ header, subheader, img }: HeroUIProps) {
  return (
    <div className="w-full md:h-[600px] bg-primary-darkBlue text-white relative overflow-hidden">
      {/* Gradients */}
      <div className="hero-top-gradient"></div>
      <div className="hero-bottom-gradient"></div>
      {img?.url && (
        <img
          className="homepage-hero-logo absolute right-0"
          src={img.url}
          alt={img.alternativeText || ""}
        />
      )}

      {/* Hero content */}
      <div className="relative z-10 content-container p-9 md:py-10 flex flex-row">
        <div className="flex flex-col gap-7 max-w-[600px]">
          <h2 className="md:text-5xl">{header}</h2>
          <div className="body1">{subheader} </div>
          <Button text="Learn More" onClick={() => scrollToId("contact-us")} />
        </div>
      </div>
    </div>
  );
}
