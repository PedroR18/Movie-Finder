export default function FavContent({ setFavContent, contentType, favContent }) {
  const handleRemove = (event) => {
    const id = event.target.name;
    setFavContent([...favContent].filter((content) => content.id != id));
  };

  return (
    <>
      {contentType ? <h3>Fav Movies</h3> : <h3>Fav TV Series</h3>}
      {favContent &&
        [...favContent].map((content) => {
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
