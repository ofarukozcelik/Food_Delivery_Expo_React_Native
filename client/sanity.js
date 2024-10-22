import sanityClient from "@sanity/client";
import imageBuilder from "@sanity/image-url";
import { PROJECT_ID, DATASET } from "@env";

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  apiVersion: "2024-10-22",
});
const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
