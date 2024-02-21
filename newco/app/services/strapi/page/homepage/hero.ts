import { gql } from "graphql-request";
import client from "../../client";
import { IHero, IStrapiMedia } from "../../types";
import { constructErrorMsg, ensureExists, parseStrapiMedia } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          hero {
            header
            subheader
            img {
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
`;

interface Data {
  homepage: {
    data: {
      attributes: {
        hero: {
          header: string;
          subheader: string;
          img: IStrapiMedia;
        };
      };
    };
  };
}

const getData = async () => {
  try {
    const data = await client.request<Data>(query);
    const hero = ensureExists(
      data?.homepage?.data?.attributes?.hero,
      constructErrorMsg("hero", "homepage")
    );

    const dataImg = hero.img;
    const img = parseStrapiMedia(dataImg);

    const response: IHero = {
      header: ensureExists(hero.header, constructErrorMsg("header", "hero")),
      subheader: ensureExists(
        hero.subheader,
        constructErrorMsg("subheader", "hero")
      ),
      img
    };
    return response;
  } catch (e) {
    console.error("Error getting homepage hero data: ", e);
    throw e;
  }
};

export default getData;
