// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat(
    [
      {
        name: "users",
        title: "Users",
        type: "document",
        fields: [
          {
            name: "userName",
            title: "User Name",
            type: "string",
          },
          {
            name: "bio",
            title: "bio",
            type: "string",
          },
          {
            name: "emailAddress",
            title: "Email Address",
            type: "string",
          },
          {
            name: "walletAddress",
            title: "Wallet Address",
            type: "string",
          },
          {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
          },
          {
            name: "bannerImage",
            title: "Banner Image",
            type: "image",
          },
          {
            name: "twitterHandle",
            title: "Twitter Handle",
            type: "string",
          },
          {
            name: "igHandle",
            title: "Instagram Handle",
            type: "string",
          },
          {
            name: "webHandle",
            title: "WebSite Handle",
            type: "string",
          },
        ],
      },
      {
        name: "category",
        title: "Category",
        type: "document",
        fields: [
          {
            name: "category",
            title: "Category",
            type: "string",
          },
          {
            name: "url",
            title: "Url",
            type: "string",
          },
          {
            name: "icon",
            title: "icon",
            type: "image",
          },
        ],
      },
      {
        name: "blockchain",
        title: "Blockchain",
        type: "document",
        fields: [
          {
            name: "userName",
            title: "User Name",
            type: "string",
          },
          {
            name: "chainID",
            title: "chainID",
            type: "string",
          },
          {
            name: "rpcUrl",
            title: "rpcUrl",
            type: "string",
          },
          {
            name: "icon",
            title: "icon",
            type: "image",
          },
        ],
      },
      {
        name: "marketItems",
        title: "Market Items",
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
            name: "owners",
            title: "Owners",
            type: "array",
            of: [{ type: "reference", to: [{ type: "users" }] }],
          },
          {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
          },
          {
            name: "bannerImage",
            title: "Banner Image",
            type: "image",
          },
        ],
      },
      {
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
            name: "owners",
            title: "Owners",
            type: "array",
            of: [{ type: "reference", to: [{ type: "users" }] }],
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
      },
    ]
    /* Your types here! */
  ),
});
