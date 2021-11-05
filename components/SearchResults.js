import Image from 'next/image';
import { IMG_LOADER } from '../config/config';

export default function SearchResults(props) {
  const allFav = Array.from(props.favMovies).concat(
    Array.from(props.favSeries)
  );

  return (
    <>
      <div className={'resultsGrid'}>
        {props.searchResults &&
          props.searchResults.map((content) => {
            if (content.poster_path) {
              return (
                <div
                  className={
                    props.checkEquality(allFav, content)
                      ? 'resultsFav'
                      : 'resultsNotFav'
                  }
                  key={content.id}
                >
                  <a
                    className={'resultsLink'}
                    onClick={() => props.toggleFavContent(content)}
                  >
                    <Image
                      loader={IMG_LOADER}
                      src={`${String(content.poster_path)}`}
                      alt="Movie Poster"
                      layout="responsive"
                      width="780"
                      height="1170"
                    />
                    <p className={'rating'}>
                      {String(content.vote_average).length === 1
                        ? `${content.vote_average}.0`
                        : content.vote_average || 1.0}
                    </p>
                  </a>
                </div>
              );
            }
          })}
      </div>
      <style jsx>
        {`
          .resultsGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
          }

          .resultsFav {
            border: 5px solid green;
            border-radius: 10px;
            margin: 5px;
            overflow: hidden;
            position: relative;
          }

          .resultsNotFav {
            border: 5px solid red;
            border-radius: 10px;
            margin: 5px;
            overflow: hidden;
            position: relative;
          }

          .resultsLink {
            cursor: pointer;
          }

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
        `}
      </style>
    </>
  );
}
