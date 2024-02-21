import { gql } from "graphql-request";
import client from "../../client";
import { IPhilosophy, IStrapiMedia } from "../../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../../utils";

const query = gql`
  {
    companyPage {
      data {
        attributes {
          philosophy {
            header
            content
            link
            videoThumbnail {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            video {
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
        philosophy: {
          header: string;
          content: string;
          link: string;
          video: IStrapiMedia;
          videoThumbnail: IStrapiMedia;
        };
      };
    };
  };
}

const getData = async (): Promise<IPhilosophy> => {
  try {
    const data = await client.request<Data>(query);
    const philosophy = data?.companyPage?.data?.attributes?.philosophy;
    ensureExists(philosophy, constructErrorMsg("philosophy", "companyPage"));

    const dataVideo: IStrapiMedia = philosophy.video;
    const dataVideoThumbnail: IStrapiMedia = philosophy.videoThumbnail;
    const link: string = philosophy.link;

    if ((!dataVideo && !dataVideoThumbnail) || !link) {
      throw new Error("Philosophy video is missing");
    }
    const video = parseStrapiMedia(dataVideo);
    const videoThumbnail = parseStrapiMedia(dataVideoThumbnail);

    const header = ensureExists(
      philosophy.header,
      constructErrorMsg("header", "philosophy")
    );
    const content = ensureExists(
      philosophy.content,
      constructErrorMsg("content", "philosophy")
    );

    return {
      header,
      content,
      link,
      video,
      videoThumbnail
    };
  } catch (e) {
    console.error("Error fetching company page philosophy data", e);
    throw e;
  }
};

export default getData;
