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
            <a onClick={generateRecommendations} className={'results'}>
              Search
            </a>
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
              {!contentType &&
                favSeries &&
                (favSeries.size !== 0 || favSeries.size !== 0) && (
                  <span
                    className={'favCounter'}
                    onClick={toggleModalVisibility}
                  >
                    {favSeries.length || favSeries.size}
                  </span>
                )}
            </div>
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
          padding: 5px 25px;
          border-radius: 40px;
          cursor: pointer;
          z-index: -1;
          text-align: center;
          font-size: 1.7em;
          font-weight: bold;
          transition: ease-in 0.1s;
          color: black;
          background-color: white;
          box-shadow: 0px 0px 10px rgb(150, 170, 150);
        }

        .resultsWrapper a:hover {
          color: white;
          background-color: rgb(25, 36, 49);
          transform: scale(1.04);
          box-shadow: 0px 0px 10px rgb(50, 50, 50);
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
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: ease-in 0.1s;
          background-color: white;
          border-radius: 40px;
          box-shadow: 0px 0px 10px rgb(150, 170, 150);
        }

        .favMenu:hover {
          background-color: rgb(25, 36, 49);
          transform: scale(1.04);
          box-shadow: 0px 0px 10px rgb(50, 50, 50);
        }

        .favMenu:hover .favCounter {
          color: white;
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
          padding: 15px 5px;
          top: 35%;
          right: 5%;
          height: 500px;
        }

        .hidden {
          visibility: hidden;
        }

        .favCounter {
          color: black;
        }

        @media screen and (min-width: 600px) {
          .favModal {
            right: 10%;
          }
        }

        @media screen and (min-width: 900px) {
          .favModal {
            right: 15%;
          }
        }

        @media screen and (min-width: 1300px) {
          .favModal {
            right: 17%;
          }
        }

        @media screen and (max-height: 960px) {
          .favModal {
            top: 30%;
          }
        }

        @media screen and (max-height: 880px) {
          .favModal {
            top: 27%;
          }
        }

        @media screen and (max-height: 840px) {
          .favModal {
            top: 25%;
          }
        }

        @media screen and (max-height: 800px) {
          .favModal {
            top: 22%;
          }
        }

        @media screen and (max-height: 760px) {
          .favModal {
            top: 20%;
          }
        }

        @media screen and (max-height: 730px) {
          .favModal {
            top: 17%;
          }
        }

        @media screen and (max-height: 700px) {
          .favModal {
            top: 15%;
          }
        }

        @media screen and (max-height: 680px) {
          .favModal {
            top: 12%;
          }
        }

        @media screen and (max-height: 650px) {
          .favModal {
            top: 8%;
          }
        }

        @media screen and (max-height: 600px) {
          .favModal {
            top: 0%;
          }
        }
      `}</style>
    </>
  );
}
