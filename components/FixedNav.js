import Image from 'next/image';
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
          <div
            className={'favWrapper'}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setFavModalVisibility(false);
              }
            }}
          >
            <div onClick={toggleModalVisibility} className={'favImage'}>
              <Image
                src={'/../public/Hamburger.svg'}
                alt={'Fav'}
                height="30px"
                width="30px"
                className={'image'}
                objectFit="contain"
              />
            </div>

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
          box-shadow: 2.5px 5px 5px hsl(0deg 0% 0% / 0.42);
          position: relative;
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .favWrapper {
          position: fixed;
          width: 100%;
          height: 10%;
          bottom: 10%;
          left: 80%;
          z-index: 3;
        }

        .favImage {
          cursor: pointer;
          position: relative;
          top: 40%;
          box-shadow: 2.5px 5px 5px hsl(0deg 0% 0% / 0.42);
          height: 50px;
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .favWrapper span {
          cursor: pointer;
          position: relative;
          top: -15px;
          right: -30px;
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
            : '100vh'};
          width: 100%;
        }

        .favModal {
          position: fixed;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          width: 70%;
          height: 50%;
          padding: 15px 5px;
          right: -30%;
          top: 60%;
          transform: translate(-50%, -50%);
        }

        .hidden {
          visibility: hidden;
        }
      `}</style>
    </>
  );
}
