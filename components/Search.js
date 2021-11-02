export default function Search(props) {
  return (
    <>
      <button onClick={() => props.toggleContent(true)}>Movies</button>
      <button onClick={() => props.toggleContent(false)}>TV Series</button>
      <input type="text" onChange={props.onChange} value={props.searchQuery} />
      <button onClick={props.generateRecommendations}>Results</button>
    </>
  );
}
