import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from '../config/api';
import { IMG_LOADER } from '../config/config';
import utilities from '../config/utilities';
import Rating from './Rating';

export default function MovieDetails({ id, contentType }) {
  useEffect(() => {
    const fetchDetails = async () => {
      let list;
      if (contentType) {
        list = await api.fetchMovie(id);
      } else {
        list = await api.fetchSerie(id);
      }
      setContent(list);
    };
    const fetchVideo = async () => {
      let list;
      if (contentType) {
        list = await api.fetchMovieVideos(id);
      } else {
        list = await api.fetchSerieVideos(id);
      }
      filterVideo(list.results);
    };
    const fetchCredits = async () => {
      let list;
      if (contentType) {
        list = await api.fetchMovieCredits(id);
      } else {
        list = await api.fetchSerieCredits(id);
      }
      let mainCast = Array.from(list.cast).slice(0, 15); //MAX NUMBER OF ACTORS
      setCast(mainCast);
    };
    fetchDetails();
    fetchVideo();
    fetchCredits();
  }, [id, contentType]);

  const filterVideo = (list) => {
    if (list) {
      for (let video of list) {
        if (
          (String(video.name).includes('trailer') ||
            String(video.name).includes('Trailer')) &&
          (String(video.site) === 'Youtube' || String(video.site) === 'youtube')
        ) {
          setVideo(video);
        } else {
          setVideo(list[0]);
        }
      }
    }
  };

  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);

  let rating;
  if (String(Math.round(content.vote_average * 10) / 10).length === 1) {
    if (String(Math.round(content.vote_average * 10) / 10) === '0') {
      rating = '1.0';
    } else rating = `${Math.round(content.vote_average * 10) / 10}.0`;
  } else {
    rating = Math.round(content.vote_average * 10) / 10;
  }

  return (
    <>
      {content.length !== 0 && (
        <div className={'modal'}>
          <div className={'mainContent'}>
            <div className={'image'}>
              <Image
                loader={IMG_LOADER}
                src={`${String(content.poster_path)}`}
                layout={'fixed'}
                alt="Movie Poster"
                width={780 / 4}
                height={1170 / 4}
              />
            </div>
            <div className={'subContent'}>
              <h1 className={'title'}>{content.title || content.name}</h1>

              <div className={'info'}>
                {contentType ? (
                  <h3>{String(content.release_date).substr(0, 4)}</h3>
                ) : (
                  <h3>
                    {String(content.first_air_date).substr(0, 4)}-
                    {String(content.last_air_date).substr(0, 4)}
                  </h3>
                )}

                {contentType && (
                  <h3>{utilities.timeConvert(content.runtime)}</h3>
                )}

                <div className={'ratingWrapper'}>
                  <Rating rating={rating} />
                </div>

                {!contentType && <p>Seasons: {content.number_of_seasons}</p>}
                {!contentType && <p>Episodes: {content.number_of_episodes}</p>}

                {contentType && (
                  <a
                    href={`https://www.imdb.com/title/${content.imdb_id}/`}
                    target="_blank"
                    rel="noreferrer"
                    className={'imdb'}
                  >
                    <Image
                      src="/../public/IMDB.svg"
                      alt="Loading"
                      height="50px"
                      width="50px"
                    />
                  </a>
                )}
              </div>
              <div className={'genres'}>
                <p key={content.genres[0].id}>{content.genres[0].name}</p>
                {content.genres[1] && (
                  <p key={content.genres[1].id}>{content.genres[1].name}</p>
                )}
              </div>
            </div>
          </div>
          <p className={'synopsis'}>{content.overview}</p>
          <div className={'video'}>
            {video && (
              <iframe
                className={'iframe'}
                id="ytplayer"
                src={`http://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                title={'trailer'}
              />
            )}
            {!video && <p>No Video Avaliable</p>}
          </div>
          <div className={'actorsRow'}>
            <Swiper
              modules={[Pagination]}
              slidesPerView={3}
              pagination={{ clickable: true, dynamicBullets: true }}
              spaceBetween={10}
              breakpoints={{
                1000: {
                  slidesPerView: 4,
                },
              }}
            >
              {cast &&
                cast.map((actor) => {
                  if (actor.profile_path) {
                    return (
                      <SwiperSlide key={actor.id}>
                        <div key={actor.id} className={'actor'}>
                          <div className={'actorImage'}>
                            <Image
                              loader={IMG_LOADER}
                              src={`${String(actor.profile_path)}`}
                              layout={'responsive'}
                              alt="Actor"
                              width={780 / 5.8}
                              height={1170 / 5.8}
                            />
                          </div>
                          <p className={'actorName'}>{actor.name}</p>
                        </div>
                      </SwiperSlide>
                    );
                  }
                })}
            </Swiper>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal {
          height: 100%;
          width: 90%;
        }
        .swiper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mainContent {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          width: 100%;
        }

        .genres {
          display: flex;
          justify-content: space-around;
          width: 100%;
          font-size: 0.9em;
        }

        .title {
          margin: 0.3em 0;
        }

        .subContent {
          margin-left: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 50%;
        }

        .info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          justify-items: center;
          align-items: center;
          grid-gap: 5px;
        }

        .synopsis {
          margin-bottom: 20px;
          font-weight: 500;
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.5em;
        }
        .video {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
          padding-top: 56.25%;
        }

        .iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .swiper-button-next {
          color: red;
        }

        .actorName {
          text-align: center;
          margin-top: 10px;
        }

        .actor {
          height: 100%;
          width: 100%;
        }

        .actorImage {
          height: 100%;
          width: 100%;
        }

        .ratingWrapper {
          height: 50px;
          width: 50px;
        }

        .imdb {
          transition: transform 0.4s;
        }

        .imdb:hover {
          transform: scale(1.1);
        }

        @media screen and (min-width: 1000px) {
          .swiper-container {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
