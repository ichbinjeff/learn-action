import { gql } from "graphql-request";
import client from "../../client";
import { ICard, IExtendedTeam, IStrapiMedia } from "../../types";
import { parseStrapiMedia } from "../../utils";

const query = gql`
  {
    companyPage {
      data {
        attributes {
          extendedTeam {
            header
            subheader
            showSection
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
  companyPage: {
    data: {
      attributes: {
        extendedTeam: {
          header: string;
          subheader: string;
          showSection: boolean;
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

export const getData = async (): Promise<IExtendedTeam> => {
  try {
    const data = await client.request<Data>(query);
    const dataCards: IDataCard[] =
      data.companyPage?.data?.attributes?.extendedTeam?.cards;
    const cards = dataCards?.map((card) => parseCards(card));
    const response: IExtendedTeam = {
      header: data.companyPage?.data?.attributes?.extendedTeam?.header,
      showSection:
        data.companyPage?.data?.attributes?.extendedTeam?.showSection,
      subHeader: data.companyPage?.data?.attributes?.extendedTeam?.subheader,
      cards
    };
    return response;
  } catch (e) {
    console.error("Error fetching company page extended team data", e);
    throw e;
  }
};
