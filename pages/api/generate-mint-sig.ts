import type { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { table } from "../../utils/Airtable";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address } = JSON.parse(req.body);

  const edition = sdk.getEdition("0x86215C27fe82B493f9778363A54631218Cafe70E");
  try {
    const signedPayload = await edition.signature.generate({
      tokenId: 0,
      quantity: "1",
      to: address,
    });

    res.status(200).json({
      signedPayload: signedPayload,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export default generateMintSignature;
