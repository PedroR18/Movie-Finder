import MovieCard from '../components/MovieCard';

export default function Recommendations({
  movieRecommendations,
  setRecommendationsView,
  contentType,
  seriesRecommendations,
}) {
  const recommendations = contentType
    ? movieRecommendations
    : seriesRecommendations;
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
              return <MovieCard content={content} className={'results'} />;
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
        `}
      </style>
    </>
  );
}
