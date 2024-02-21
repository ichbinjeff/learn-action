import { gql } from "graphql-request";
import client from "../client";
import { IFooter, IFooterIcon, IStrapiMedia } from "../types";
import { parseStrapiMedia, ensureExists, constructErrorMsg } from "../utils";

const query = gql`
  {
    footer {
      data {
        attributes {
          copyrightNotice
          icons {
            link
            icon {
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

interface IDataIcon {
  link: string;
  icon: IStrapiMedia;
}

interface Data {
  footer: {
    data: {
      attributes: {
        icons: IDataIcon[];
        copyrightNotice: string;
      };
    };
  };
}

const parseIcon = (dataIcon: IDataIcon): IFooterIcon => {
  const icon = parseStrapiMedia(dataIcon.icon);
  return {
    link: dataIcon.link,
    icon
  };
};

export const getData = async (): Promise<IFooter> => {
  try {
    const data = await client.request<Data>(query);
    const footer = ensureExists(
      data.footer.data.attributes,
      constructErrorMsg("footer attributes", "footer data")
    );

    // Ensure the existence of icons before mapping
    const dataIcons = ensureExists(
      footer.icons,
      constructErrorMsg("icons", "footer")
    );

    const icons = dataIcons.map(parseIcon);

    return {
      copyrightNotice: ensureExists(
        footer.copyrightNotice,
        constructErrorMsg("copyrightNotice", "footer")
      ),
      icons
    };
  } catch (e) {
    console.error("Error fetching footer data:", e);
    throw e;
  }
};

export default getData;
