import Image from 'next/image';
import { IMG_LOADER } from '../config/config';

export default function SearchResults(props) {
  const allFav = Array.from(props.favMovies).concat(
    Array.from(props.favSeries)
  );

  const checkEquality = (arr, obj) => {
    for (const e of arr) {
      if (e.id === obj.id) {
        return true;
      } else return false;
    }
  };

  return (
    <>
      <div className={'resultsGrid'}>
        {props.searchResults &&
          props.searchResults.map((content) => {
            console.log(checkEquality(allFav, content));
            if (content.poster_path) {
              return (
                <div
                  className={
                    checkEquality(allFav, content)
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
                    <p>{content.vote_average || 1.0}</p>
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
          }

          .resultsNotFav {
            border: 5px solid red;
            border-radius: 10px;
            margin: 5px;
            overflow: hidden;
          }

          .resultsLink {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
