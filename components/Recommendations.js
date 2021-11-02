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
      <ul>
        {(recommendations.length === 0 || recommendations.size === 0) && (
          <p>Loading...</p>
        )}
        {recommendations &&
          Array.from(recommendations).map((content) => {
            return (
              <li key={content.id}>
                <p>{content.title || content.name}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
