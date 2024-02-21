import { gql } from "graphql-request";
import client from "../../client";
import { ICompanyHero, IStrapiMedia } from "../../types";
import { parseStrapiMedia, constructErrorMsg, ensureExists } from "../../utils";

const query = gql`
  {
    companyPage {
      data {
        attributes {
          hero {
            header
            content
            showLink
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
  companyPage: {
    data: {
      attributes: {
        hero: {
          header: string;
          content: string;
          img: IStrapiMedia;
          showLink: boolean;
        };
      };
    };
  };
}

const getData = async () => {
  try {
    const data = await client.request<Data>(query);

    const ENSURE_HERO_EXISTS = constructErrorMsg("hero", "companyPage");
    const ENSURE_HERO_IMG_EXISTS = constructErrorMsg("img", "hero");
    const ENSURE_HERO_HEADER_EXISTS = constructErrorMsg("header", "hero");
    const ENSURE_HERO_CONTENT_EXISTS = constructErrorMsg("content", "hero");
    const ENSURE_HERO_SHOWLINK_EXISTS = constructErrorMsg("showLink", "hero");

    const { hero } = data.companyPage.data.attributes;
    ensureExists(hero, ENSURE_HERO_EXISTS);
    const { img: dataImg, header, content, showLink } = hero;

    ensureExists(dataImg, ENSURE_HERO_IMG_EXISTS);
    ensureExists(header, ENSURE_HERO_HEADER_EXISTS);
    ensureExists(content, ENSURE_HERO_CONTENT_EXISTS);
    ensureExists(showLink, ENSURE_HERO_SHOWLINK_EXISTS);

    const img = parseStrapiMedia(dataImg);

    return {
      header,
      content,
      showLink,
      img
    };
  } catch (e) {
    console.error("error fetching company page hero data", e);
    throw e;
  }
};

export default getData;
