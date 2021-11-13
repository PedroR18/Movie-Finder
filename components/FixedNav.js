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
          padding: 15px 40px;
          border-radius: 40px;
          cursor: pointer;
          z-index: -1;
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=2253E7');
          height: 70px;
          width: 200px;
          text-align: center;
          font-size: 1.5em;
          padding-top: 20px;
          transition: ease-in 0.1s;
        }

        .resultsWrapper a:hover {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=883FEE');
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
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=2253E7');
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: ease-in 0.1s;
          background-size: 100% 100% !important;
        }

        .favMenu:hover {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=883FEE');
          background-size: 100% 100% !important;
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
