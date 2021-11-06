import Image from 'next/image';
import { IMG_LOADER } from '../config/config';

export default function MovieCard({ content, className }) {
  return (
    <div className={className} key={content.id}>
      <Image
        loader={IMG_LOADER}
        src={`${String(content.poster_path)}`}
        alt="Movie Poster"
        layout="responsive"
        width="780"
        height="1170"
      />
      <p className={'rating'}>
        {String(Math.round(content.vote_average * 10) / 10).length === 1
          ? `${Math.round(content.vote_average * 10) / 10}.0`
          : Math.round(content.vote_average * 10) / 10}
      </p>
      <style jsx>
        {`
          .rating {
            position: absolute;
            background-color: white;
            z-index: 1;
            padding: 8px 5px;
            border: 1px solid transparent;
            border-radius: 50%;
            top: 0;
            right: 0;
            margin: 0;
          }

          .results {
            overflow: hidden;
            position: relative;
          }

          .${className} {
            transition: 0.5s;
          }

          .${className}:hover {
            transform: scale(1.03);
          }
        `}
      </style>
    </div>
  );
}
