import { gql } from "graphql-request";
import client from "../../client";
import {
  IParsedMedia,
  IStrapiMedia,
  IStackItem,
  IVerticalStack
} from "../../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          verticalStack {
            title
            subTitle
            stackItems {
              name
              desc
            }
            defaultStackImage {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            stackImages {
              image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface Data {
  homepage: {
    data: {
      attributes: {
        verticalStack: {
          title: string;
          subTitle: string;
          stackItems: IStackItem[];
          defaultStackImage: IStrapiMedia;
          stackImages: IStackImageItem[];
        };
      };
    };
  };
}

interface IStackImageItem {
  image: IStrapiMedia;
}

export const getData = async (): Promise<IVerticalStack> => {
  try {
    const data = await client.request<Data>(query);
    const verticalStack = ensureExists(
      data.homepage.data.attributes.verticalStack,
      constructErrorMsg("verticalStack", "homepage")
    );

    // Ensure stackItems exists before mapping
    const stackItems: IStackItem[] = ensureExists(
      verticalStack.stackItems,
      constructErrorMsg("stackItems", "verticalStack")
    ).map((item) => ({
      name: item.name,
      desc: item.desc
    }));

    // Ensure stackImages exists before mapping
    const stackImages: IParsedMedia[] = ensureExists(
      verticalStack.stackImages,
      constructErrorMsg("stackImages", "verticalStack")
    ).map((item: IStackImageItem) => parseStrapiMedia(item.image));

    const defaultStackImage: IParsedMedia = parseStrapiMedia(
      ensureExists(
        verticalStack.defaultStackImage,
        constructErrorMsg("defaultStackImage", "verticalStack")
      )
    );

    const response: IVerticalStack = {
      title: verticalStack.title,
      subTitle: verticalStack.subTitle,
      stackItems,
      stackImages,
      defaultStackImage
    };

    return response;
  } catch (e) {
    console.error("Error fetching vertical stack data", e);
    throw e;
  }
};
