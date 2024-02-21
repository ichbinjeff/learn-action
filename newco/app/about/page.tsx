import CompanyHero from "@/app/components/ui/CompanyHero";
import Founder from "@/app/components/ui/Founder";
import Philosophy from "@/app/components/ui/Philosophy";
import Team from "@/app/components/ui/Team";
import ExtendedTeam from "@/app/components/ui/ExtendedTeam";
import ContactUs from "@/app/components/ui/ContactUs";
import Footer from "@/app/components/ui/Footer";
import Header from "@/app/components/ui/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articul8 | Solving the World’s Toughest Problems with Generative AI",
  description:
    "Articul8's full-stack GenAI platform helps accelerate digital transformation and unlock lasting business value by rapidly transforming proprietary data into actionable insights.",
};

export default function Page() {
  return (
    <main className="bg-secondary-default">
      <Header current="Company" />
      <CompanyHero />
      <Philosophy />
      <Founder />
      <ExtendedTeam />
      <Team />
      <ContactUs />
      <Footer />
    </main>
  );
}
