import React from "react";

import VerticalStack, { IImage } from "./VerticalStackUI";
import { getData } from "@/app/services/strapi/page/homepage/verticalStack";
import { IItem } from "@/app/components/common/Stack/StackMenu";

export default async function index() {
  try {
    const data = await getData();
    const title = data.title;
    const subTitle = data.subTitle;
    const stackImages: IImage[] = data.stackImages as IImage[];
    const items: IItem[] = data.stackItems as IItem[];
    const defaultImage: IImage = data.defaultStackImage as IImage;

    return (
      <VerticalStack
        title={title}
        subTitle={subTitle}
        stackImages={stackImages}
        items={items}
        defaultImage={defaultImage}
      />
    );
  } catch (e) {
    console.error(e);
  }
}
