import { gql } from "graphql-request";
import client from "../../client";
import { ICard, IIndustryApplications, IStrapiMedia } from "../../types";
import { constructErrorMsg, ensureExists, parseStrapiMedia } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          industryApplications {
            header
            subheader
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
        industryApplications: {
          header: string;
          subheader: string;
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

export const getData = async (): Promise<IIndustryApplications> => {
  const data = await client.request<Data>(query);
  const industryApplications = ensureExists(
    data.homepage?.data?.attributes?.industryApplications,
    constructErrorMsg("industryApplications", "homepage")
  );
  const dataCards: IDataCard[] = ensureExists(
    industryApplications.cards,
    constructErrorMsg("cards", "industryApplications")
  );
  const cards = dataCards?.map((card) => parseCards(card));

  const response: IIndustryApplications = {
    header: ensureExists(
      industryApplications.header,
      constructErrorMsg("header", "industryApplications")
    ),
    subHeader: ensureExists(
      industryApplications.subheader,
      constructErrorMsg("subheader", "industryApplications")
    ),
    cards
  };
  return response;
};
