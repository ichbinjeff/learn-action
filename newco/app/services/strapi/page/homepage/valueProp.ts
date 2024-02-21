import { gql } from "graphql-request";
import client from "../../client";
import { ICard, IStrapiMedia, IValueProp } from "../../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          valueProp {
            header
            subHeader
            cards {
              header
              description
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

interface IDataCard {
  header: string;
  description: string;
  image: IStrapiMedia;
}

interface Data {
  homepage: {
    data: {
      attributes: {
        valueProp: {
          header: string;
          subHeader: string;
          cards: IDataCard[];
        };
      };
    };
  };
}

const parseCards = (dataCard: IDataCard): ICard => {
  const img = parseStrapiMedia(dataCard.image);
  return {
    header: dataCard.header,
    subHeader: dataCard.description,
    imgUrl: img.url,
    imgAltText: img.alternativeText
  };
};

export const getData = async (): Promise<IValueProp> => {
  try {
    const data = await client.request<Data>(query);
    const valueProp = ensureExists(
      data.homepage?.data?.attributes?.valueProp,
      constructErrorMsg("valueProp", "homepage")
    );

    const dataCards: IDataCard[] = ensureExists(
      valueProp.cards,
      constructErrorMsg("cards", "home page valueProp")
    );
    const cards = dataCards.map(parseCards);

    const response: IValueProp = {
      header: ensureExists(
        valueProp.header,
        constructErrorMsg("header", "home page valueProp")
      ),
      subHeader: ensureExists(
        valueProp.subHeader,
        constructErrorMsg("subHeader", "home page valueProp")
      ),
      cards
    };

    return response;
  } catch (e) {
    console.error("Error fetching value proposition data", e);
    throw e;
  }
};
