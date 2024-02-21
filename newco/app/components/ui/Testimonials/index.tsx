import getData from "@/app/services/strapi/page/homepage/clientTestimonials";
import ClientTestimonialsUI from "./TestimonialsUI";

export default async function ClientTestimonials() {
  try {
    const data = await getData();
    return <ClientTestimonialsUI testimonials={data} />;
  } catch (e) {
    console.error(e);
  }
}
