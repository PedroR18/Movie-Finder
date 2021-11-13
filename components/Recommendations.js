import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieDetails from '../components/MovieDetails';
import Loading from './Loading';

export default function Recommendations({
  movieRecommendations,
  setRecommendationsView,
  contentType,
  seriesRecommendations,
  detailsModalVisibility,
  setDetailsModalVisibility,
  setSeriesRecommendations,
  setMovieRecommendations,
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

  const handleBack = () => {
    setMovieRecommendations([]);
    setSeriesRecommendations([]);
    setRecommendationsView(false);
  };
  return (
    <>
      <div className={'recommendationsWrapper'}>
        {(recommendations.length === 0 || recommendations.size === 0) && (
          <div className={'loading'}>
            <Loading />
          </div>
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
          className={'modalWrapper '}
          onClick={(e) => {
            if (e.target.className.includes('modalBackground')) {
              hideModal();
            }
          }}
        >
          <div
            className={detailsModalVisibility ? 'modalBackground' : 'hidden'}
          ></div>
          <div
            className={
              detailsModalVisibility ? 'detailsModal' : 'detailsModal hidden'
            }
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setDetailsModalVisibility(false);
              }
            }}
          >
            {detailsModalVisibility && (
              <MovieDetails id={id} contentType={contentType} />
            )}
          </div>
        </div>
        {recommendations.length != 0 && (
          <div className={'backButton'} onClick={() => handleBack()}>
            <span>Back</span>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .resultsGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
            margin-top: 40px;
          }
          .resultsLink {
            cursor: pointer;
          }
          .detailsModal {
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 93%;
            max-width: 93%;
            height: 85%;
            max-height: 85%;
            padding: 15px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            overflow: auto;
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 10px;
            border: 8px solid transparent;
            color: white;
          }

          .modalWrapper {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: ${detailsModalVisibility ? 2 : -2};
            height: ${typeof window !== 'undefined'
              ? document.body.scrollHeight + 10
              : null}px;
            width: 100%;
          }

          .modalBackground {
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(30, 30, 30, 0.6);
            height: 100%;
            width: 100%;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 0;
          }

          .hidden {
            visibility: hidden;
          }

          .loading {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .backButton {
            width: 130px;
            height: 74px;
            transition: ease-in 0.1s;
            cursor: pointer;
            background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=2253E7');
            background-size: 100% 100% !important;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
          }

          .backButton:hover {
            background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=883FEE');
          }

          @media screen and (min-width: 600px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr;
            }
            .detailsModal {
              width: 80%;
            }
          }

          @media screen and (min-width: 850px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr;
            }
          }

          @media screen and (min-width: 1000px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
              width: 80%;
            }
            .recommendationsWrapper {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .detailsModal {
              width: 70%;
            }
          }
          @media screen and (min-width: 1400px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            }
            .detailsModal {
              width: 60%;
            }
          }

          @media screen and (min-width: 1700px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            }
            .detailsModal {
              width: 50%;
            }
          }

          @media screen and (min-width: 2000px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            }
            .detailsModal {
              width: 40%;
            }
          }

          @media screen and (min-width: 2400px) {
            .resultsGrid {
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            }
            .detailsModal {
              width: 30%;
            }
          }
        `}
      </style>
    </>
  );
}
