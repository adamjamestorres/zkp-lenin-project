
import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import trustModule from '@web3-onboard/trust'
import gas from '@web3-onboard/gas'

// Replace with your DApp's Infura ID
const ALCHEMY_API = 'tPsIipcsf6TbHO2H4bNdkr_TdF6FhqAq'
export const infuraRPC = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API}`
const ethereumRopsten = {
  id: '0x1',
  token: 'ETH',
  label: 'Ethereum Mainnet',
  rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API}`
}
const dappId = '937627e1-3507-44b8-af10-72728aa5f74b'
let window : any;
const injected = injectedModule()
const coinbase = coinbaseModule()
const walletConnect = walletConnectModule({
  version: 2,
  handleUri: async  uri => console.log(uri),
  projectId: 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5'
})

const ledger = ledgerModule()
const trust = trustModule()

export const initWeb3Onboard = init({
  connect: {
    autoConnectAllPreviousWallet: true
  },
  wallets: [
    injected,
    ledger,
    coinbase,
    trust,
    walletConnect,
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: infuraRPC
    },
    {
      id: '0x13881',
      token: 'MATIC',
      label: 'Polygon - Mumbai',
      rpcUrl: 'https://matic-mumbai.chainstacklabs.com	'
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom',
      rpcUrl: 'https://rpc.ftm.tools/'
    },
    {
      id: 10,
      token: 'OETH',
      label: 'Optimism',
      rpcUrl: 'https://mainnet.optimism.io'
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: 84531,
      token: 'ETH',
      label: 'Base Goerli',
      rpcUrl: 'https://goerli.base.org'
    }
  ],
  appMetadata: {
    name: 'Lenin - ZK MBS',
    icon: '',
    description: 'Lenin - ZK MBS',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    },
    gettingStartedGuide: 'https://blocknative.com',
    explore: 'https://blocknative.com'
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false
    },
    mobile:{
      position:'topRight',
      enabled:true,
      minimal:true
    }
  },
  apiKey: dappId,
  notify: {
    transactionHandler: transaction => {
      console.log({ transaction })
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to zero will persist the notification until the user excuses it
          autoDismiss: 0,
          // message: `Your transaction is pending, click <a href="https://goerli.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://goerli.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  },
  theme: 'dark'
})

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  // apiKey: dappId,
  endpoint: 'blockPrices'
})