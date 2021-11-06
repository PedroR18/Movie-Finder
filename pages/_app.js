function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background-color: grey;
        }

        * {
          font-family: Merriweather Sans;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export default MyApp;
