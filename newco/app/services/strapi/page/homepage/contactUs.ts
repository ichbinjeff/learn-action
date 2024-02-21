import { gql } from "graphql-request";
import client from "../../client";
import { IHomeContactUs } from "../../types";
import { constructErrorMsg, ensureExists } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          contactus {
            header
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
        contactus: {
          header: string;
        };
      };
    };
  };
}

export const getData = async (): Promise<IHomeContactUs> => {
  try {
    const data = await client.request<Data>(query);
    const response: IHomeContactUs = {
      header: ensureExists(
        data?.homepage?.data?.attributes?.contactus?.header,
        constructErrorMsg("header", "home page contactus")
      )
    };

    return response;
  } catch (e) {
    console.error("error fetching home page contact us data", e);
    throw e;
  }
};

export default getData;
