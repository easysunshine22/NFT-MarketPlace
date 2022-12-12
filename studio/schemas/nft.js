export default {
  name: "nft",
  title: "nft",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
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
      name: "logoImage",
      title: "Logo Image",
      type: "image",
    },
  ],
};
