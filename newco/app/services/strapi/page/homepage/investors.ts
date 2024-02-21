import { gql } from "graphql-request";
import client from "../../client";
import { IInvestorQuote, IInvestors, IStrapiMedia } from "../../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          investors {
            header
            quotes {
              personName
              personRole
              companyName
              quote
              companyLogo {
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

interface IDataQuote {
  personName: string;
  personRole: string;
  companyName: string;
  quote: string;
  companyLogo: IStrapiMedia;
}

interface Data {
  homepage: {
    data: {
      attributes: {
        investors: {
          header: string;
          quotes: IDataQuote[];
        };
      };
    };
  };
}

const parseQuote = (dataQuote: IDataQuote): IInvestorQuote => {
  const companyLogo = parseStrapiMedia(dataQuote.companyLogo);
  const quote: IInvestorQuote = { ...dataQuote, companyLogo };

  return quote;
};

export const getData = async (): Promise<IInvestors> => {
  try {
    const data = await client.request<Data>(query);

    const investors = ensureExists(
      data.homepage.data.attributes.investors,
      constructErrorMsg("investors", "homepage")
    );

    const dataQuotes = ensureExists(
      investors.quotes,
      constructErrorMsg("quotes", "investors")
    );

    const quotes = dataQuotes.map((dataQuote) => parseQuote(dataQuote));

    const response: IInvestors = {
      header: ensureExists(
        investors.header,
        constructErrorMsg("header", "investors")
      ),
      quotes
    };

    return response;
  } catch (e) {
    console.error("Error fetching investors data:", e);
    throw e;
  }
};

export default getData;
