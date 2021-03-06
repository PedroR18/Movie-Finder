import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Movie Finder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <html lang="en" />
      </Head>

      <Component {...pageProps} />
      <style jsx global>{`
        body {
          height: ${window.innerHeight};
          overflow: overlay;
          background: radial-gradient(
            ellipse at bottom,
            #1b2735 0%,
            #090a0f 100%
          );
        }

        * {
          font-family: 'Fira Sans', sans-serif;
          letter-spacing: 0.5px;
          font-weight: 600;
          box-sizing: border-box;
          color: white;
          scrollbar-width: thin;
        }

        ::-webkit-scrollbar {
          width: 0.43em;
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        ::-webkit-scrollbar-corner {
          background-color: #000000;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}

export default MyApp;
