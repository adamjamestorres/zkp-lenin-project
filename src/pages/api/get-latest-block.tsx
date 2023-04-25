import { Network, Alchemy } from 'alchemy-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const {
    query: { chainId },
  } = req;
  const alchemy = new Alchemy(settings);
  try {
    const response = await alchemy.core.getBlock('latest');
    return res.status(200).json(response);
  } catch (err) {
    return 400;
  }
}
