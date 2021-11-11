import FavContent from './FavContent';

export default function FixedNav({
  generateRecommendations,
  RecommendationsView,
  favMovies,
  favSeries,
  contentType,
  setFavMovies,
  setFavSeries,
  favModalVisibility,
  setFavModalVisibility,
  setMovieCounter,
  setSerieCounter,
  movieCounter,
  serieCounter,
}) {
  const toggleModalVisibility = () => {
    setFavModalVisibility(!favModalVisibility);
  };

  return (
    <>
      {!RecommendationsView &&
        ((contentType &&
          ((favMovies.length && favMovies.length !== 0) ||
            (favMovies.size && favMovies.size !== 0))) ||
          (!contentType &&
            ((favSeries.length && favSeries.length !== 0) ||
              (!!favSeries.size && favSeries.size !== 0)))) && (
          <div className={'resultsWrapper'}>
            <a onClick={generateRecommendations} className={'results'}></a>
          </div>
        )}
      {!RecommendationsView &&
        ((contentType &&
          ((favMovies.length && favMovies.length !== 0) ||
            (favMovies.size && favMovies.size !== 0))) ||
          (!contentType &&
            ((favSeries.length && favSeries.length !== 0) ||
              (!!favSeries.size && favSeries.size !== 0)))) && (
          <div
            className={'favWrapper'}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setFavModalVisibility(false);
              }
            }}
          >
            <div onClick={toggleModalVisibility} className={'favMenu'}>
              {contentType &&
                favMovies &&
                (favMovies.size !== 0 || favMovies.size !== 0) && (
                  <span
                    className={'favCounter'}
                    onClick={toggleModalVisibility}
                  >
                    {favMovies.length || favMovies.size}
                  </span>
                )}
            </div>

            {!contentType &&
              favSeries &&
              (favSeries.size !== 0 || favSeries.size !== 0) && (
                <span className={'favCounter'} onClick={toggleModalVisibility}>
                  {favSeries.length || favSeries.size}
                </span>
              )}
          </div>
        )}

      <div
        className={'modalWrapper'}
        onClick={(e) => {
          if (e.target.className.includes('modalWrapper')) {
            setFavModalVisibility(false);
          }
        }}
      >
        <div className={favModalVisibility ? 'favModal' : 'favModal hidden'}>
          {!RecommendationsView && (favMovies || favSeries) && (
            <FavContent
              favContent={contentType ? favMovies : favSeries}
              setFavContent={contentType ? setFavMovies : setFavSeries}
              contentType={contentType}
              setModalVisibility={setFavModalVisibility}
              favModalVisibility={favModalVisibility}
              setMovieCounter={setMovieCounter}
              setSerieCounter={setSerieCounter}
              movieCounter={movieCounter}
              serieCounter={serieCounter}
              setFavModalVisibility={setFavModalVisibility}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .resultsWrapper {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 10%;
          z-index: 1;
        }
        .resultsWrapper a {
          padding: 15px 40px;
          border-radius: 40px;
          cursor: pointer;
          z-index: -1;
          background-image: linear-gradient(120deg, #34e0f0 0%, #b400ff 100%);
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          width: 150px;
          height: 80px;
          animation: morph 3s linear infinite;
          transform-style: preserve-3d;
          outline: 1px solid transparent;
          will-change: border-radius;
          transition: ease-in 0.4s;
        }

        .resultsWrapper a:before,
        .resultsWrapper a:after {
          content: '';
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          box-shadow: 5px 5px 89px rgba(0, 102, 255, 0.21);
          will-change: border-radius, transform, opacity;
          animation-delay: 200ms;
          background-image: linear-gradient(
            120deg,
            rgba(0, 67, 255, 0.55) 0%,
            rgba(0, 103, 255, 0.89) 100%
          );
        }

        .resultsWrapper a:before {
          animation: morph 3s linear infinite;
          opacity: 0.21;
          animation-duration: 1.5s;
        }

        .resultsWrapper a:after {
          animation: morph 3s linear infinite;
          animation-delay: 400ms;
          opacity: 0.94;
          content: 'Search';
          line-height: 80px;
          text-indent: 50px;
          font-family: 'Fira Sans';
          font-size: 1.2em;
        }

        .resultsWrapper a:hover {
          color: black;
          font-size: 1.25em;
          text-indent: 30px;
        }

        .favWrapper {
          position: fixed;
          width: 100%;
          height: 10%;
          bottom: 10%;
          left: 80%;
          z-index: 3;
        }

        .favMenu {
          cursor: pointer;
          position: relative;
          top: 40%;
          background-image: linear-gradient(120deg, #34e0f0 0%, #b400ff 100%);
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          width: 50px;
          height: 50px;
          animation: morph 3s linear infinite;
          transform-style: preserve-3d;
          outline: 1px solid transparent;
          will-change: border-radius;
          transition: ease-in 0.4s;
        }

        .favMenu a:before,
        .favMenu a:after {
          content: '';
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          box-shadow: 5px 5px 89px rgba(0, 102, 255, 0.21);
          will-change: border-radius, transform, opacity;
          animation-delay: 200ms;
          background-image: linear-gradient(
            120deg,
            rgba(0, 67, 255, 0.55) 0%,
            rgba(0, 103, 255, 0.89) 100%
          );
        }

        .favMenu a:before {
          animation: morph 3s linear infinite;
          opacity: 0.21;
          animation-duration: 1.5s;
        }

        .favWrapper span {
          cursor: pointer;
          position: relative;
          top: 10px;
          left: 20px;
          font-size: 1.2em;
        }

        .modalWrapper {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: ${favModalVisibility ? 2 : -2};
          height: ${RecommendationsView
            ? typeof window !== 'undefined'
              ? `${document.body.scrollHeight}px`
              : null
            : '100%'};
          width: 100%;
        }

        .favModal {
          position: fixed;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          width: 350px;
          height: 600px;
          padding: 15px 5px;
          right: -25%;
          top: 55%;
          transform: translate(-50%, -50%);
        }

        .hidden {
          visibility: hidden;
        }

        @keyframes morph {
          0%,
          100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate3d(0, 0, 0) rotateZ(0.01deg);
          }
          34% {
            border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
            transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
          }
          50% {
            opacity: 0.89;
            transform: translate3d(0, 0, 0) rotateZ(0.01deg);
          }
          67% {
            border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
            transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
          }
        }

        @keyframes fadeIn {
          100% {
            transform: scale(1.03);
            opacity: 0;
          }
        }

        @media screen and (min-width: 600px) {
          .favModal {
            right: -20%;
          }
        }

        @media screen and (min-width: 800px) {
          .favModal {
            right: -15%;
          }
        }

        @media screen and (min-width: 900px) {
          .favModal {
            right: -10%;
          }
        }

        @media screen and (min-width: 1000px) {
          .favModal {
            right: -5%;
          }
        }

        @media screen and (min-width: 1200px) {
          .favModal {
            right: 0;
          }
        }

        @media screen and (min-width: 1500px) {
          .favModal {
            right: 5%;
          }
        }

        @media screen and (min-width: 2000px) {
          .favModal {
            right: 10%;
          }
        }
      `}</style>
    </>
  );
}
