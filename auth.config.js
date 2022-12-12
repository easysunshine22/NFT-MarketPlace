import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey:
    "18bc6eaac0a28739ef1bd292b374501ae4be3f5fcdef1dc43b6670a40bbe4db4",
  domain: "example.org",
});
