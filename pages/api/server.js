import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import NextApiRequest, NextApiResponse from "next";

export default async function server(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // De-structure the arguments we passed in out of the request body
    const { authorAddress, nftName, imagePath } = JSON.parse(req.body);

    // You'll need to add your private key in a .env.local file in the root of your project

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Your wallet private key (read it in from .env.local file)
      "18bc6eaac0a28739ef1bd292b374501ae4be3f5fcdef1dc43b6670a40bbe4db4",
      "https://data-seed-prebsc-1-s3.binance.org:8545"
    );

    // Load the NFT Collection via it's contract address using the SDK
    const nftCollection = await sdk.getContract(
      // Replace this with your NFT Collection contract address
      "0x03f1612a4343BFdFe3608b6C750e5A58CbadFD3A",
      "nft-collection"
    );

    // If all the checks pass, begin generating the signature...
    // Generate the signature for the page NFT
    const signedPayload = await nftCollection.signature.generate({
      to: authorAddress,
      metadata: {
        name: nftName as string,
        image: imagePath as string,
        description: "An awesome animal NFT",
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
