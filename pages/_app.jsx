import "../styles/globals.css";
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ThemedApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

function ThemedApp({ Component, pageProps }) {
  const { darkMode } = useTheme();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>Portfolio | Stefanus Titan</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
