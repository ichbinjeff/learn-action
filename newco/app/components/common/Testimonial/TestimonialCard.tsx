import { ICard } from "./TestimonialCarousel";

export default function ClientCard({
  id,
  personName,
  personRole,
  content,
  logo
}: ICard) {
  const logoWidth = "md:w-[300px]";
  const logoImgHeight = "h-[44px]";
  return (
    <div
      id={id}
      className="mx-8 first:ml-0 last:mr-0 snap-start w-full shrink-0 flex flex-col gap-7 md:flex-row justify-center">
      <div
        className={`my-auto md:shrink-0 pb-7 md:p-5 flex flex-col gap-4 items-start ${logoWidth}`}>
        <img
          className={`${logoImgHeight} object-contain`}
          src={logo.url || ""}
          alt={logo.alternativeText || ""}
        />
        <div className="subtitle2">
          <p>{personName}</p>
          <p>{personRole}</p>
        </div>
      </div>

      <div className="my-auto body1">{content}</div>
    </div>
  );
}
