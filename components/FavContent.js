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
    console.log(movieCounter);
    if (contentType && movieCounter == 1) {
      setFavModalVisibility(false);
    } else if (!contentType && serieCounter == 1) {
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
          border: 1px solid transparent;
          color: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 90%;
          height: 70px;
          background: rgba(40, 40, 40, 0.35);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          text-align: center;
          margin: 10px;
        }
        .favContent p {
          width: 50%;
        }
      `}</style>
    </>
  );
}
