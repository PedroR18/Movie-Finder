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
            margin: 10px 0;
          }

          .resultsFav {
            transition: 0.5s;
            margin: 5px;
            overflow: hidden;
            position: relative;
            box-shadow: 0px 0px 18px rgb(20, 235, 20);
          }

          .resultsNotFav {
            margin: 5px;
            overflow: hidden;
            position: relative;
            transition: 0.5s;
            box-shadow: 2.5px 5px 5px hsl(0deg 0% 0% / 0.42);
          }

          .resultsFav:hover,
          .resultsNotFav:hover {
            transform: scale(1.03);
          }

          .resultsLink {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
