import { gql } from "graphql-request";
import client from "../../client";
import { IStrapiMedia, ITeam } from "../../types";
import { constructErrorMsg, ensureExists, parseStrapiMedia } from "../../utils";

const query = gql`
  {
    companyPage {
      data {
        attributes {
          team {
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
        team: {
          header: string;
          content: string;
          img: IStrapiMedia;
        };
      };
    };
  };
}

const getData = async (): Promise<ITeam> => {
  try {
    const data = await client.request<Data>(query);
    const team = ensureExists(
      data?.companyPage?.data?.attributes?.team,
      constructErrorMsg("team", "companyPage")
    );

    const dataImg = ensureExists(team.img, constructErrorMsg("img", "team"));
    const header = ensureExists(
      team.header,
      constructErrorMsg("header", "team")
    );
    const content = ensureExists(
      team.content,
      constructErrorMsg("content", "team")
    );

    const img = parseStrapiMedia(dataImg);
    const response: ITeam = {
      header,
      content,
      img
    };
    return response;
  } catch (e) {
    console.error("Error fetching company page team data", e);
    throw e;
  }
};

export default getData;
