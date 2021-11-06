import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieDetails from '../components/MovieDetails';

export default function Recommendations({
  movieRecommendations,
  setRecommendationsView,
  contentType,
  seriesRecommendations,
  detailsModalVisibility,
  setDetailsModalVisibility,
}) {
  useEffect(() => {
    if (detailsModalVisibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  });

  const [id, setId] = useState(0);
  const recommendations = contentType
    ? movieRecommendations
    : seriesRecommendations;

  const toggleDetailsModalVisibility = () => {
    setDetailsModalVisibility(!detailsModalVisibility);
  };

  const findId = (e) => {
    const posterUrl = String(e.target.src).split('w780')[1];
    const finalUrl = posterUrl.split('?')[0];
    Array.from(recommendations).map((content) => {
      if (content.poster_path === finalUrl) {
        setId(content.id);
      }
    });
  };

  const handleModalVisibility = (e) => {
    findId(e);
    toggleDetailsModalVisibility();
  };

  const hideModal = () => {
    toggleDetailsModalVisibility(false);
    setId(0);
  };

  return (
    <>
      <h1>Recommendations</h1>
      <button onClick={() => setRecommendationsView(false)}>Go Back</button>

      {(recommendations.length === 0 || recommendations.size === 0) && (
        <p>Loading...</p>
      )}
      <div className={'resultsGrid'}>
        {recommendations &&
          Array.from(recommendations).map((content) => {
            if (content.poster_path) {
              return (
                <>
                  <a
                    className={'resultsLink'}
                    onClick={(e) => handleModalVisibility(e)}
                  >
                    <MovieCard content={content} className={'results'} />
                  </a>
                </>
              );
            }
          })}
      </div>
      <div
        className={'modalWrapper'}
        onClick={(e) => {
          if (e.target.className.includes('modalWrapper')) {
            hideModal();
          }
        }}
      >
        <div
          className={
            detailsModalVisibility ? 'detailsModal' : 'detailsModal hidden'
          }
        >
          {detailsModalVisibility && (
            <MovieDetails id={id} contentType={contentType} />
          )}
        </div>
      </div>
      <style jsx>
        {`
          .resultsGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
          }
          .resultsLink {
            cursor: pointer;
          }
          .detailsModal {
            position: fixed;
            display: flex;
            flex-direction: column;
            background-color: white;
            border: 1px solid transparent;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            width: 90%;
            max-width: 90%;
            height: 80%;
            max-height: 80%;
            padding: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            overflow: auto;
          }

          .modalWrapper {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: ${detailsModalVisibility ? 2 : -2};
            height: ${typeof window !== 'undefined'
              ? document.body.scrollHeight
              : null}px;
            width: 100%;
          }

          .hidden {
            visibility: hidden;
          }
        `}
      </style>
    </>
  );
}
