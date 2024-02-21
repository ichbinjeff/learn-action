import { gql } from "graphql-request";
import client from "../../client";
import { IFounder, IStrapiMedia } from "../../types";
import { ensureExists, constructErrorMsg, parseStrapiMedia } from "../../utils";

const query = gql`
  {
    companyPage {
      data {
        attributes {
          founder {
            header
            content
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
        founder: {
          header: string;
          content: string;
          img: IStrapiMedia;
        };
      };
    };
  };
}

const getData = async (): Promise<IFounder> => {
  try {
    const data = await client.request<Data>(query);
    const ENSURE_FOUNDER_EXISTS = constructErrorMsg("founder", "founder");
    const ENSURE_FOUNDER_IMG_EXISTS = constructErrorMsg("img", "founder");
    const ENSURE_FOUNDER_CONTENT_EXISTS = constructErrorMsg(
      "content",
      "founder"
    );
    const ENSURE_FOUNDER_HEADER_EXISTS = constructErrorMsg("header", "founder");

    const founder = data?.companyPage?.data?.attributes?.founder;
    // Ensure the existence of founder and its properties
    ensureExists(founder, ENSURE_FOUNDER_EXISTS);
    const { header, content, img } = founder;

    ensureExists(header, ENSURE_FOUNDER_HEADER_EXISTS);
    ensureExists(content, ENSURE_FOUNDER_CONTENT_EXISTS);
    ensureExists(img, ENSURE_FOUNDER_IMG_EXISTS);

    const parsedImg = parseStrapiMedia(img);

    return {
      header: header,
      content: content,
      img: parsedImg
    };
  } catch (error) {
    console.error("Error fetching company page founder data", error);
    throw error;
  }
};

export default getData;
