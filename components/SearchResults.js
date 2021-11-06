import MovieCard from './MovieCard';

export default function SearchResults({
  favMovies,
  favSeries,
  searchResults,
  checkEquality,
  toggleFavContent,
}) {
  const allFav = Array.from(favMovies).concat(Array.from(favSeries));

  return (
    <>
      <div className={'resultsGrid'}>
        {searchResults &&
          searchResults.map((content) => {
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
                    onClick={() => toggleFavContent(content)}
                  >
                    <MovieCard content={content} />
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
        `}
      </style>
    </>
  );
}
