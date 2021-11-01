export default function Recommendations({
  movieRecommendations,
  setRecommendationsView,
}) {
  return (
    <>
      <h1>Recommendations</h1>
      <button onClick={() => setRecommendationsView(false)}>Go Back</button>
      <ul>
        {movieRecommendations.length === 0 && <p>Loading...</p>}
        {movieRecommendations &&
          Array.from(movieRecommendations).map((content) => {
            return (
              <li key={content.id}>
                <p>{content.title}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
