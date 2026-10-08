import { Html, Head, Main, NextScript } from "next/document";

// Runs before paint so the saved or system theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){var legacy=localStorage.getItem('darkMode');if(legacy!==null)t=legacy==='true'?'dark':'light';}if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#eceef1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#141829" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
