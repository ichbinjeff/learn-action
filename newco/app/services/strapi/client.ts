import { GraphQLClient } from "graphql-request";

let url: string;
let token: string;

if (process.env.STRAPI_URL) {
  url = process.env.STRAPI_URL;
} else {
  throw Error("STRAPI_URL ENV needs to be set.");
}

token = process.env.STRAPI_TOKEN ?? "";

const client = new GraphQLClient(url, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default client;
