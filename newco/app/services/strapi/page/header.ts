import { gql } from "graphql-request";
import client from "../client";
import { IHeader, IStrapiMedia } from "../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../utils";

const query = gql`
  {
    header {
      data {
        attributes {
          hotzoneText
          navLinks {
            href
            text
          }
          companyLogo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

interface Data {
  header: {
    data: {
      attributes: {
        companyLogo: IStrapiMedia;
        hotzoneText?: string;
        navLinks?: {
          href: string;
          text: string;
        }[];
      };
    };
  };
}

export const getData = async (): Promise<IHeader> => {
  try {
    const data = await client.request<Data>(query);
    const headerAttributes = ensureExists(
      data.header.data.attributes,
      constructErrorMsg("header attributes", "header data")
    );

    const companyLogo = parseStrapiMedia(
      ensureExists(
        headerAttributes.companyLogo,
        constructErrorMsg("companyLogo", "header")
      )
    );

    const hotzoneText = headerAttributes.hotzoneText;
    const navLinks = headerAttributes.navLinks;

    return {
      companyLogo,
      hotzoneText,
      navLinks
    };
  } catch (e) {
    console.error("Error fetching header data:", e);
    throw e;
  }
};

export default getData;
