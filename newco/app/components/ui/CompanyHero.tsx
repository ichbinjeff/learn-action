import Markdown from "markdown-to-jsx";
import getData from "@/app/services/strapi/page/companypage/hero";
import Button from "../common/Button";

export default async function CompanyHero() {
  try {
    const data = await getData();
    return (
      <div className="relative bg-primary-darkBlue overflow-hidden">
        {/* Background image */}
        {data.img.url && (
          <img
            className="companypage-hero-logo absolute z-10 bottom-0"
            src={data.img.url}></img>
        )}
        {/* Gradient effects */}
        <div className="hidden md:block top-left-gradient"></div>
        <div className="md:hidden hero-top-gradient"></div>
        <div className="hidden md:block bottom-right-gradient"></div>
        <div className="md:hidden hero-bottom-gradient"></div>

        <div className="relative z-10 content-container flex justify-end text-white">
          <div className="w-full max-w-[600px] py-9 flex flex-col gap-7">
            <h1>{data.header}</h1>
            <div className="body1">
              <Markdown className="space-y-4">{data.content}</Markdown>
            </div>
            {data.showLink && <Button text="Learn More" />}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
