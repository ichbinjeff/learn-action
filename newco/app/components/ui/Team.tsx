import Markdown from "markdown-to-jsx";
import getData from "@/app/services/strapi/page/companypage/team";

export default async function Team() {
  try {
    const data = await getData();
    const imageHeight = "h-[600px]";
    const imageWidth = "w-[574px]";

    return (
      <div className="bg-secondary-lightBlue text-neutral-darkGray">
        <div className="content-container py-8 md:py-9">
          {/* Desktop */}
          <div className="hidden md:flex gap-8">
            <img
              className={`${imageHeight} ${imageWidth} border-rounded-br-none`}
              src={data.img.url || ""}
              alt="team image"
            />
            <div className="w-full my-auto">
              <h2>{data.header}</h2>
              <div className="mt-6 body1">
                <Markdown className="space-y-4">{data.content}</Markdown>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col md:hidden gap-7">
            <h3>{data.header}</h3>
            <img
              className="w-full border-rounded-br-none"
              src={data.img.url || ""}
              alt="team image"
            />
            <div className="body1">
              <Markdown className="space-y-4">{data.content}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
