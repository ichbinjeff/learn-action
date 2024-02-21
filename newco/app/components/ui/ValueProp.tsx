import React from "react";
import SectionHeader from "@/app/components/common/SectionHeader";
import Card, { IImgCardProps } from "@/app/components/common/ImageCard";

import { getData } from "@/app/services/strapi/page/homepage/valueProp";
import { ICard as IAPICard } from "@/app/services/strapi/types";

export default async function ValueProp() {
  const data = await getData();
  const cardWidthClass = "w-full md:w-[350px]";
  return (
    <div className="md:mb-8">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader title={data.header} subtitle={data.subHeader} />
        <div className="content-container flex flex-col flex-wrap items-start mx-4 mt-7 md:flex-row md:mt-8 md:gap-x-7 md:gap-y-8">
          {data.cards.map((card: IAPICard, index: number) => {
            const cardProps: IImgCardProps = {
              ...card,
              imgUrl: card.imgUrl || "",
              imgAltText: card.header || "",
              id: `valuePropCard-${index}`,
              noBorder: true,
              noTextPadding: true,
              paperColor: "bg-secondary-default",
              cardWidthClass,
              // use imgHeightClass to set custom border radius to image
              imgStyleClass: "rounded-2xl"
            };
            return <Card key={cardProps.id} {...cardProps} />;
          })}
        </div>
      </div>
    </div>
  );
}
