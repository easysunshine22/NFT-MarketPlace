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
      title: "ContractAddress",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "collectionType",
      title: "CollectionType",
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
      name: "createdBy",
      title: "Created By",
      type: "reference",
      to: [{ type: "users" }],
    },
    {
      name: "categories",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "blockchain",
      title: "Blockchain",
      type: "reference",
      to: [{ type: "blockchain" }],
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
