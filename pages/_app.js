function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background-color: grey;
          margin: 0px;
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
