import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";


export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>  
        <title>DestinAItion</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel = "icon" href = 
"pages\craiyon_052052_low_poly_isometric_plane_flying_above_the_Earth.png" 
        type = "image/x-icon"></link>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}