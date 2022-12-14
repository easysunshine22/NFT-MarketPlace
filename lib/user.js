import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const user = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const build = imageUrlBuilder(user);

export const urlFor = (source) => build.image(source);
