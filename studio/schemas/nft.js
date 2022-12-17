export default {
  name: "nft",
  title: "Nft",
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
      name: "collections",
      title: "Collections",
      type: "reference",
      to: [{ type: "collections" }],
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
    {
      name: "collectionType",
      title: "CollectionType",
      type: "string",
    },
  ],
};
