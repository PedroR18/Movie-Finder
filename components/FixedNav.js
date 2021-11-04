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
              Results
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
          <div className={'favWrapper'}>
            <a onClick={toggleModalVisibility}>Fav</a>

            {contentType &&
              favMovies &&
              (favMovies.size !== 0 || favMovies.size !== 0) && (
                <span className={'favCounter'} onClick={toggleModalVisibility}>
                  {favMovies.length || favMovies.size}
                </span>
              )}

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
          background-color: white;
          padding: 15px 40px;
          border: 1px solid transparent;
          border-radius: 40px;
          cursor: pointer;
          z-index: -1;
        }

        .favWrapper {
          position: fixed;
          width: 100%;
          height: 10%;
          bottom: 10%;
          left: 80%;
          z-index: 3;
        }

        .favWrapper a {
          background-color: white;
          padding: 15px;
          border: 1px solid transparent;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          top: 40%;
        }

        .favWrapper span {
          background-color: white;
          padding: 5px 7px;
          border: 1px solid transparent;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          top: 25%;
          right: 4%;
        }

        .modalWrapper {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: ${favModalVisibility ? 2 : -2};
          height: ${typeof window !== 'undefined'
            ? document.body.scrollHeight
            : null}px;
          width: 100%;
        }

        .favModal {
          position: fixed;
          display: flex;
          flex-direction: column;
          background-color: white;
          border: 1px solid transparent;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 600px;
          padding: 10px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .hidden {
          visibility: hidden;
        }
      `}</style>
    </>
  );
}
