import Markdown from "markdown-to-jsx";
import getData from "@/app/services/strapi/page/companypage/founder";

export default async function Founder() {
  try {
    const data = await getData();
    return (
      <div className="bg-secondary-lightBlue text-neutral-darkGray">
        <div className="content-container py-8 md:py-9">
          {/* Desktop  */}
          <div className="hidden md:flex gap-8">
            <div className="w-full">
              <h2>{data.header}</h2>
              <div className="mt-6 body1">
                <Markdown className="space-y-4">{data.content}</Markdown>
              </div>
            </div>
            <div className="w-full">
              <img
                className="w-full border-rounded-br-none"
                src={data.img.url || ""}
                alt={data.img.alternativeText || ""}
              />
            </div>
          </div>
          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-7">
            <h3>{data.header}</h3>
            <img
              className="w-full border-rounded-br-none"
              src={data.img.url || ""}
              alt={data.img.alternativeText || ""}
            />
            <div className="body1">
              <Markdown className="space-y-4">{data.content}</Markdown>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
