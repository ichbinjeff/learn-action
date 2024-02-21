import React from "react";
import { getData } from "@/app/services/strapi/page/companypage/extendedTeam";
import { ICard as IAPICard } from "@/app/services/strapi/types";
import Carousel, { ICard } from "@/app/components/common/Carousel";
import SectionHeader from "@/app/components/common/SectionHeader";

export default async function ExtendedTeams() {
  try {
    const data = await getData();
    const cardsList: ICard[] = data.cards?.map((card: IAPICard, index) => {
      const customBorderStyle = "border-rounded-bl-none";
      const descSectionHeight = "h-[330px] md:[h-245px]";
      const cardIdPrefix = "extendedTeam";
      return {
        ...card,
        imgUrl: card.imgUrl || "",
        imgAltText: card.header || "",
        className: customBorderStyle,
        descHeightClass: descSectionHeight,
        id: `${cardIdPrefix}-${index.toString()}`
      };
    });
    if (!data.showSection) {
      return null;
    }

    return (
      <div>
        <div className="mt-9 mb-6">
          <SectionHeader
            title={data.header}
            subtitle={data.subHeader}></SectionHeader>
        </div>
        <Carousel cards={cardsList} />
      </div>
    );
  } catch (e) {
    console.error(e);
  }
}
