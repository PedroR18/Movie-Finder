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
        }
        .favContent p {
          width: 50%;
          z-index: 5;
        }

        .favContent button {
          z-index: 5;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 1.5em;
          color: red;
        }

        @import url('https://fonts.googleapis.com/css?family=Exo+2');

        .favContent {
          background-image: linear-gradient(120deg, #34e0f0 0%, #b400ff 100%);
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          width: 200px;
          height: 104px;
          animation: morph 3s linear infinite;
          transform-style: preserve-3d;
          outline: 1px solid transparent;
          will-change: border-radius;
        }
        .favContent:before,
        .favContent:after {
          content: '';
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          box-shadow: 5px 5px 89px rgba(0, 102, 255, 0.21);
          will-change: border-radius, transform, opacity;
          animation-delay: 200ms;
          background-image: linear-gradient(
            120deg,
            rgba(0, 67, 255, 0.55) 0%,
            rgba(0, 103, 255, 0.89) 100%
          );
        }

        .favContent:before {
          animation: morph 3s linear infinite;
          opacity: 0.21;
          animation-duration: 1.5s;
        }

        .favContent:after {
          animation: morph 3s linear infinite;
          animation-delay: 400ms;
          opacity: 0.89;
          line-height: 120px;
          text-indent: -21px;
        }

        @keyframes morph {
          0%,
          100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate3d(0, 0, 0) rotateZ(0.01deg);
          }
          34% {
            border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
            transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
          }
          50% {
            opacity: 0.89;
            transform: translate3d(0, 0, 0) rotateZ(0.01deg);
          }
          67% {
            border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
            transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
          }
        }

        @keyframes fadeIn {
          100% {
            transform: scale(1.03);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
