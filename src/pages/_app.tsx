import "@/styles/globals.css";
import 'swiper/css'
import 'swiper/css/effect-fade';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import RtlLayout from '../components/common/RtlLayout';
import createEmotionCache from "@/utils/createEmotionCache";
import { MyAppProps } from "@/types/AppPropsWithLayout";
import { CacheProvider } from '@emotion/react';
import ThemeProvider from "@/theme";
import SettingsProvider from "@/contexts/SettingsProvider";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "@/contexts/JWTContext";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from "@/contexts/CartContext";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { GoogleTagManager } from '@next/third-parties/google'
interface Network {
  chainId: number;
  name: string;
  currency: string;
  explorerUrl: string;
  rpcUrl: string;
}

const projectId = process.env.PROJECT_ID;

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "Matic",
  explorerUrl: "https://polygonscan.com/",
  rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/-MV16trfVQAa0JkbT5I1hwIQRTPqCTec",
};


const metadata = {
  name: "KPN Website",
  description: "KPN Website",
  url: process.env.WEBSITE_URL, 
  icons: [process.env.WEBSITE_URL],
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true, 
  enableInjected: true, 
  enableCoinbase: true, 
  defaultChainId: 137,
});
export const supportedNetworks: Network[] = [polygon];

export function isWrongChainId(chainId: number): boolean {
  const isSupported = supportedNetworks.some(
    (network) => network.chainId === chainId
  );
  if (!isSupported) {
    console.error(`The provided chain ID (${chainId}) is not supported.`);
  }
  return isSupported;
}
createWeb3Modal({
  ethersConfig,
  chains: supportedNetworks,
  projectId,
  enableAnalytics: true, 
});

const clientSideEmotionCache = createEmotionCache();
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRAPI_KEY || "");

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();

  return <>
    <GoogleTagManager  gtmId={process.env.GTM_ID} />
    <Head>
      <title>{"KonnektVPN"}</title>
      <meta name="description" content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />

      <meta itemProp="name" content="KonnektVPN" />
      <meta itemProp="description" content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
      <meta itemProp="image" content="http://konnektvpn.com/logo.png" />

      {/* <meta property="og:description" content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." /> */}
      <meta property="og:title" content="KonnektVPN" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://konnektvpn.com/logo.png" />
      <meta property="og:url" content="https://konnektvpn.com/" />
      <meta property="og:description" content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />

      <meta name="twitter:title" content="KonnektVPN" />
      <meta name="twitter:description" content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
      <meta name="twitter:image" content="http://konnektvpn.com/logo.png" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
    <Elements stripe={stripePromise}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
        <CacheProvider value={emotionCache}>
          <AuthProvider>
            <SettingsProvider>
              <RtlLayout>
                <ThemeProvider>
                  <CartProvider>
                    <>
                      <SnackbarProvider autoHideDuration={5000}>
                        <QueryClientProvider client={queryClient}>
                          {getLayout(<Component {...pageProps} />)}
                        </QueryClientProvider>
                      </SnackbarProvider>
                    </>
                  </CartProvider>
                </ThemeProvider>
              </RtlLayout>
            </SettingsProvider>
          </AuthProvider>
        </CacheProvider >
      </GoogleReCaptchaProvider>
    </Elements>
  </>
}

export default App
// export default appWithTranslation(App);