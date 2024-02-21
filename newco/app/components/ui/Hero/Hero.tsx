import getData from "@/app/services/strapi/page/homepage/hero";
import HeroUI from "./HeroUI";

export default async function Hero() {
  const data = await getData();

  return <HeroUI {...data} />;
}
