import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '../config/api';
import { IMG_LOADER } from '../config/config';

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
      chooseVideo(list.results);
    };
    fetchDetails();
    fetchVideo();
  }, [id, contentType]);

  const chooseVideo = (list) => {
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
  const [video, setVideo] = useState('');
  return (
    <>
      <Image
        loader={IMG_LOADER}
        src={`${String(content.poster_path)}`}
        alt="Movie Poster"
        width={780 / 6}
        height={1170 / 6}
      />
      <p>{content.title || content.name}</p>
      <div>
        {content.genres &&
          content.genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
      </div>
      {contentType && (
        <a
          href={`https://www.imdb.com/title/${content.imdb_id}/`}
          target="_blank"
          rel="noreferrer"
        >
          IMDB
        </a>
      )}
      <p>{content.overview}</p>
      <p>
        {contentType
          ? String(content.release_date).substr(0, 4)
          : String(content.first_air_date).substr(0, 4)}
      </p>
      <p>
        {contentType
          ? String(content.runtime)
          : String(content.episode_run_time).substr(0, 2)}{' '}
        min
      </p>
      <p>{content.vote_average}</p>

      {video && (
        <iframe
          id="ytplayer"
          type="text/html"
          width="320"
          height="180"
          src={`http://www.youtube.com/embed/${video.key}`}
          frameBorder="0"
        />
      )}
      {!video && <p>No Video Avaliable</p>}

      <style jsx>{``}</style>
    </>
  );
}
