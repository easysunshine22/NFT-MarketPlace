import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const user = sanityClient({
  projectId: "0m772u15",
  dataset: "production",
  apiVersion: "2022-11-28",
  useCdn: false,
  token:
    "skH5Wp9gafav4DEcSiU1mPIcSWCVN6mLW5KNDw068q233Fz454z4rcctAwLgolQcIlJH5Znwwm3hsscGwBfnIM5f4fOy8240941CK80ro6MpbrDakDhLlp6kTha1EC00yu4KYQxLRpyKGlyZUOFEHgbHZxnGhqJvTyv9VRHlocnb2nBhhGQ2",
});

const build = imageUrlBuilder(user);

export const urlFor = (source) => build.image(source);
