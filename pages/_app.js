function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background: linear-gradient(
            -45deg,
            #ee7752,
            #e73c7e,
            #23a6d5,
            #23d5ab
          );
          background-size: 700% 700%;
          animation: gradient 10s ease infinite;
          height: 100vh;
          overflow: overlay;
        }

        * {
          font-family: 'Rubik';
          box-sizing: border-box;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        ::-webkit-scrollbar {
          width: 0.43em;
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
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
