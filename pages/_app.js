import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="6yMD_5QT6Ls84gKvg0riKOh1F0_MbuMkCkiV3AiQfMI"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
