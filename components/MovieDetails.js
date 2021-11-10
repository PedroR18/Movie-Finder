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
              <h2>{content.title || content.name}</h2>
              <div className={'info'}>
                {contentType ? (
                  <p>{String(content.release_date).substr(0, 4)}</p>
                ) : (
                  <p>
                    {String(content.first_air_date).substr(0, 4)}-
                    {String(content.last_air_date).substr(0, 4)}
                  </p>
                )}

                {contentType && <p>{utilities.timeConvert(content.runtime)}</p>}

                {!contentType && (
                  <div>
                    <p>Episodes: {content.number_of_episodes}</p>
                    <p>Seasons: {content.number_of_seasons}</p>
                  </div>
                )}

                <div className={'ratingWrapper'}>
                  <Rating rating={content.vote_average} />
                </div>

                {contentType && (
                  <a
                    href={`https://www.imdb.com/title/${content.imdb_id}/`}
                    target="_blank"
                    rel="noreferrer"
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
            </div>
          </div>
          <p className={'synopsis'}>{content.overview}</p>
          <div className={'video'}>
            {video && (
              <iframe
                id="ytplayer"
                width="320"
                height="180"
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
            >
              {cast &&
                cast.map((actor) => {
                  if (actor.profile_path) {
                    return (
                      <SwiperSlide>
                        <div key={actor.id} className={'actor'}>
                          <div className={'actorImage'}>
                            <Image
                              loader={IMG_LOADER}
                              src={`${String(actor.profile_path)}`}
                              layout={'fixed'}
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
          width: 100%;
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
        }

        .subContent {
          margin-left: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          justify-items: center;
          align-items: center;
          grid-gap: 5px;
        }

        .genres {
          display: flex;
          justify-content: space-around;
        }

        .synopsis {
          margin-bottom: 20px;
        }
        .video {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .swiper-button-next {
          color: red;
        }

        .actorName {
          text-align: center;
          margin-top: 10px;
        }

        .ratingWrapper {
          height: 50px;
          width: 50px;
        }
      `}</style>
    </>
  );
}
