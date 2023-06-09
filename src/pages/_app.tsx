import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import { useState, useEffect } from 'react';
import Onboard from '@web3-onboard/core'

import Head from 'next/head';
import injectedModule from '@web3-onboard/injected-wallets'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_API = 'tPsIipcsf6TbHO2H4bNdkr_TdF6FhqAq'
const ethereumRopsten = {
  id: '0x1',
  token: 'ETH',
  label: 'Ethereum Mainnet',
  rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API}`
}

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
function MyApp({ Component, pageProps }: any) {

  return (
    <>
      <Head>
        <title>Lenin | ZK-MBS</title>
        <meta></meta>
      </Head>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component/>
      </RainbowKitProvider>
    </WagmiConfig>
      </>
  );
}

MyApp.displayName = 'Lenin';

export default MyApp;
