import React from "react";
import Button from "@/app/components/common/Button";
export interface IImgCardProps {
  id: string;
  imgUrl: string;
  imgAltText?: string;
  header: string;
  subHeader: string;
  className?: string;
  cardWidthClass?: string;
  imgHeightClass?: string;
  imgStyleClass?: string;
  descHeightClass?: string;
  paperColor?: string;
  noBorder?: boolean;
  noTextPadding?: boolean;
  linkTo?: string;
  linkText?: string;
}

const ImageCard: React.FC<IImgCardProps> = ({
  id,
  imgUrl,
  imgAltText = "",
  header,
  subHeader,
  className = "",
  cardWidthClass = `w-full md:w-[438px]`,
  imgHeightClass = "md:h-auto md:h-[273px]",
  imgStyleClass,
  descHeightClass = "h-[275px] md:h-[245px]",
  paperColor = "bg-neutral-white",
  noBorder,
  noTextPadding = false,
  linkTo,
  linkText = "View Article"
}) => {
  return (
    <div
      id={id}
      className={`${cardWidthClass} ${!noBorder &&
        "default-border"} mb-4 snap-start shrink-0 overflow-hidden flex flex-col ${className}`}>
      {imgUrl && (
        <div
          className={`relative w-full overflow-hidden ${imgHeightClass} ${imgStyleClass}`}>
          <img src={imgUrl} alt={imgAltText || header} className="w-full" />
        </div>
      )}
      <div
        className={`w-full flex flex-col justify-between ${paperColor} ${descHeightClass}`}>
        <div>
          <div className={`h-9 subtitle1 pt-5 ${!noTextPadding && "px-4"}`}>
            {header}
          </div>
          <p className={`body2 py-5 ${!noTextPadding && "px-4"}`}>
            {subHeader}
          </p>
        </div>
        {linkTo && (
          <div
            className={`w-full flex justify-between items-end pb-4 ${!noTextPadding &&
              "px-4"}`}>
            <Button
              className="default-border"
              text={linkText}
              showArrow={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
