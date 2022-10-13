import { Footer, Header } from "components";
import { buildSeoConfig, defaultSeoConfig } from "helpers";
import { DefaultSeo, NextSeo } from "next-seo";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  let seoConfig = {};

  if (pageProps.hasOwnProperty("seo")) {
    seoConfig = buildSeoConfig(pageProps.seo);
  }

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <NextSeo {...seoConfig} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
