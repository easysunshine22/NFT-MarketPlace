import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.NEXT_PUBLIC_PK,
  domain: process.env.NEXT_PUBLIC_DOMAIN,
});
