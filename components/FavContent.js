export default function FavContent({
  setFavContent,
  contentType,
  favContent,
  setMovieCounter,
  setSerieCounter,
  movieCounter,
  serieCounter,
  setFavModalVisibility,
}) {
  const handleRemove = (event) => {
    const id = event.target.name;
    setFavContent([...favContent].filter((content) => content.id != id));
    contentType
      ? setMovieCounter(movieCounter - 1)
      : setSerieCounter(serieCounter - 1);
    if (contentType && movieCounter <= 1) {
      setFavModalVisibility(false);
    } else if (!contentType && serieCounter <= 1) {
      setFavModalVisibility(false);
    }
  };

  return (
    <>
      {favContent &&
        [...favContent].map((content) => {
          return (
            <div key={content.id} className={'favContent'}>
              <p>{content.title || content.name}</p>
              <button
                name={content.id}
                onClick={(event) => handleRemove(event)}
              >
                X
              </button>
            </div>
          );
        })}
      <style jsx>{`
        .favContent {
          color: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          margin: 10px;
          width: 200px;
          height: 80px;
          background-color: white;
          border-radius: 40px;
          text-shadow: 0px 0px 18px rgb(150, 170, 150);
        }
        .favContent p {
          width: 50%;
          z-index: 5;
          font-size: 0.8em;
          color: black;
        }

        .favContent button {
          z-index: 5;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1.5em;
          color: red;
        }
      `}</style>
    </>
  );
}
