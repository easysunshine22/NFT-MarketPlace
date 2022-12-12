export default {
  name: "collections",
  title: "Collections",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "contractAddress",
      title: "Contract Address",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "webAddress",
      title: "WebSite Address",
      type: "string",
    },
    {
      name: "twitterAddress",
      title: "Twitter Address",
      type: "string",
    },
    {
      name: "telegramAddress",
      title: "Telegram Address",
      type: "string",
    },
    {
      name: "fee",
      title: "Creator Fee",
      type: "string",
    },
    {
      name: "createdBy",
      title: "Created By",
      type: "reference",
      to: [{ type: "users" }],
    },
    {
      name: "volumeTraded",
      title: "Volume Traded",
      type: "number",
    },
    {
      name: "floorPrice",
      title: "Floor Price",
      type: "number",
    },

    {
      name: "logoImage",
      title: "Logo Image",
      type: "image",
    },
    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
    },
  ],
};
