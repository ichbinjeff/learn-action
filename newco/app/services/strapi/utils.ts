import { IStrapiMedia, IParsedMedia } from "./types";

export function parseStrapiMedia(strapiImg: IStrapiMedia): IParsedMedia {
  if (!strapiImg.data) {
    return {
      url: null,
      alternativeText: null
    };
  }

  let cdnUrl: string;
  if (process.env.STRAPI_CDN) {
    cdnUrl = process.env.STRAPI_CDN;
  } else {
    throw Error("STRAPI_CDN ENV needs to be set.");
  }
  const path = strapiImg.data.attributes.url;

  const url = new URL(path, cdnUrl);

  return {
    url: url.href,
    alternativeText: strapiImg.data.attributes.alternativeText
  };
}

// Define a function to encapsulate the null or undefined check and throw an error
export const ensureExists = <T>(
  value: T | undefined | null,
  errorMessage: string
): T => {
  if (value === null || value === undefined) throw new Error(errorMessage);
  return value;
};

export const constructErrorMsg = (
  fieldName: string,
  entity: string
): string => {
  return `The expected '${fieldName}' property is missing in the ${entity} response`;
};
