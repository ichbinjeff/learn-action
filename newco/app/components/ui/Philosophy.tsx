import Button from "../common/Button";
import getData from "@/app/services/strapi/page/companypage/philosophy";

export default async function Philosophy() {
  try {
    const data = await getData();
    const videoWidth = "max-w-[600px]";
    const containerWidth = "max-w-[800px]";
    const height = "max-h-full";

    return (
      <div
        className={`bg-secondary-lightBlueAlt text-neutral-black pt-8 ${height}`}>
        <div className="content-container text-center flex flex-col items-center gap-7">
          <div className={`${containerWidth} `}>
            <h2>{data.header}</h2>
            <div className="body1 mt-7 md:mt-5">{data.content}</div>
          </div>

          {data.videoThumbnail.url && data.link && (
            <a href={data.link} target="_blank" rel="noreferrer">
              <img
                className={`aspect-w-16 aspect-h-9 w-full ${videoWidth}`}
                src={data.videoThumbnail.url}
                alt={data.videoThumbnail.alternativeText || ""}
              />
            </a>
          )}

          {data.video.url && (
            <video className={`aspect-video w-full ${videoWidth}`} controls>
              <source src={data.video.url} />
            </video>
          )}

          <div className="h-[140px]">
            <a href={data.link} target="_blank" rel="noreferrer">
              <Button
                className="default-border text-neutral-black"
                showArrow={true}
                text="watch video"
              />
            </a>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
