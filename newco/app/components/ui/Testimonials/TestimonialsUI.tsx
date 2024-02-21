"use client";

import { IClientTestimonial } from "@/app/services/strapi/types";
import ClientCarousel from "../../common/Testimonial/TestimonialCarousel";

interface ICTProps {
  testimonials: IClientTestimonial[];
}

export default function ClientTestimonialsUI({ testimonials }: ICTProps) {
  return (
    <div className="bg-secondary-lightBlue py-8 md:py-9 text-neutral-darkGray">
      <div className="content-container ">
        <ClientCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
