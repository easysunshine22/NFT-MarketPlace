import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function server(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // De-structure the arguments we passed in out of the request body
    const { authorAddress, nftName, imagePath, description } = JSON.parse(
      req.body
    );

    // You'll need to add your private key in a .env.local file in the root of your project

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Your wallet private key (read it in from .env.local file)
      process.env.NEXT_PUBLIC_PK as string,
      process.env.NEXT_PUBLIC_RPC_URL
    );

    // Load the NFT Collection via it's contract address using the SDK
    const nftCollection = await sdk.getContract(
      // Replace this with your NFT Collection contract address
      process.env.NEXT_PUBLIC_COLLECTION_ADDRESS,
      "nft-collection"
    );

    // If all the checks pass, begin generating the signature...
    // Generate the signature for the page NFT
    const signedPayload = await nftCollection.signature.generate({
      to: authorAddress,
      metadata: {
        name: nftName as string,
        image: imagePath as string,
        description: description as string,
        properties: {
          // Add any properties you want to store on the NFT
        },
      },
    });

    // Return back the signedPayload to the client.
    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    });
  } catch (e) {
    res.status(500).json({ error: `Server error ${e}` });
  }
}
