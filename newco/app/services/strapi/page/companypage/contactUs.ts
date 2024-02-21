import { gql } from "graphql-request";
import client from "../../client";
import { ICompanyContactUs } from "../../types";
import { constructErrorMsg, ensureExists } from "../../utils";

const query = gql`
  {
    companyPage {
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
  companyPage: {
    data: {
      attributes: {
        contactus: {
          header: string;
        };
      };
    };
  };
}

const getData = async (): Promise<ICompanyContactUs> => {
  try {
    const data = await client.request<Data>(query);
    const header = ensureExists(
      data.companyPage?.data?.attributes?.contactus?.header,
      constructErrorMsg("header", "contactus")
    );

    const response: ICompanyContactUs = {
      header
    };

    return response;
  } catch (e) {
    console.error("error fetching company page contact us data", e);
    throw e;
  }
};

export default getData;
