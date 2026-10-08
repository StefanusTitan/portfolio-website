import Head from "next/head";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import Layout from "../components/Layout";
import SmoothScroll from "../components/SmoothScroll";
import "../styles/globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SmoothScroll>
      </MotionConfig>
    </>
  );
}
