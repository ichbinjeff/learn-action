import type { Metadata } from "next";
import Header from "./components/ui/Header";
import IndustryApplications from "./components/ui/IndustryApplications";
import Hero from "./components/ui/Hero/Hero";
import ClientTestimonials from "./components/ui/Testimonials";

import Investor from "./components/ui/Investors";
import ContactUs from "./components/ui/ContactUs";
import ValueProp from "./components/ui/ValueProp";
import VerticalStack from "./components/ui/VerticalStack";  
import Footer from "./components/ui/Footer";

export const metadata: Metadata = {
  title: "Articul8 | Solving the World’s Toughest Problems with Generative AI",
  description:
    "Articul8's full-stack GenAI platform helps accelerate digital transformation and unlock lasting business value by rapidly transforming proprietary data into actionable insights.",
};

export default function Page() {
  return (
    <main className="bg-secondary-default">
      <Header current="Discover" />
      <Hero />
      <ClientTestimonials />
      <IndustryApplications />
      <VerticalStack />
      <ValueProp />
      <ContactUs />
      <Investor />
      <Footer />
    </main>
  );
}
