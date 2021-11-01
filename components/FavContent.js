export default function FavContent(props) {
  const handleRemove = (event) => {
    const id = event.target.name;
    props.setFavContent(
      [...props.favContent].filter((content) => content.id != id)
    );
  };

  return (
    <>
      {props.contentType ? <h3>Fav Movies</h3> : <h3>Fav TV Series</h3>}
      {props.favContent &&
        [...props.favContent].map((content) => {
          return (
            <div key={content.id}>
              <p>{content.title || content.name}</p>
              <button
                name={content.id}
                onClick={(event) => handleRemove(event)}
              >
                Remove
              </button>
            </div>
          );
        })}
    </>
  );
}
