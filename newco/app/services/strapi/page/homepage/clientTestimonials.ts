import { gql } from "graphql-request";
import client from "../../client";
import { IClientTestimonial, IStrapiMedia } from "../../types";
import { constructErrorMsg, ensureExists, parseStrapiMedia } from "../../utils";

const query = gql`
  {
    homepage {
      data {
        attributes {
          testimonials {
            testimonials {
              companyName
              personName
              personRole
              content
              logo {
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

//TODO: fix data structure here, it's not a good idea to have a repeated key
interface Data {
  homepage: {
    data: {
      attributes: {
        testimonials: {
          testimonials: IDataItem[];
        };
      };
    };
  };
}

interface IDataItem {
  companyName: string;
  personName: string;
  personRole: string;
  content: string;
  logo: IStrapiMedia;
}

const parseDataItem = (item: IDataItem): IClientTestimonial => {
  const logo = parseStrapiMedia(item.logo);
  return {
    companyName: item.companyName,
    personName: item.personName,
    personRole: item.personRole,
    content: item.content,
    logo
  };
};

const getData = async (): Promise<IClientTestimonial[]> => {
  const data = await client.request<Data>(query);
  const testimonials = ensureExists(
    data?.homepage?.data?.attributes?.testimonials,
    constructErrorMsg("testimonials", "homepage")
  );
  // TODO: fix data structure in strapi
  const items: IDataItem[] = testimonials.testimonials;
  ensureExists(items, constructErrorMsg("items", "testimonials"));
  const response: IClientTestimonial[] = items?.map((item) =>
    parseDataItem(item)
  );

  return response;
};

export default getData;
