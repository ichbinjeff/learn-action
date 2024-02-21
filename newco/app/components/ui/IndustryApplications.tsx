import React from "react";
import SectionHeader from "@/app/components/common/SectionHeader";
import Carousel, { ICard } from "@/app/components/common/Carousel";
import { getData } from "@/app/services/strapi/page/homepage/industryApplications";
import { ICard as IAPICard } from "@/app/services/strapi/types";

export default async function IndustryProducts() {
  try {
    const data = await getData();

    // Construct the card list from the API data,
    // mapping over each card and constructing the props for ImageCard component
    const cardsList: ICard[] = data.cards.map((card: IAPICard, index) => {
      const customBorderStyle = "border-rounded-bl-none";
      return {
        ...card,
        imgUrl: card.imgUrl || "",
        imgAltText: card.header || "",
        className: customBorderStyle, // Apply additional styling to the card.
        id: index.toString()
      };
    });
    return (
      <div className="my-9">
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
