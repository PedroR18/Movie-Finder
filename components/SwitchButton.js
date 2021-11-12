export default function SwitchButton({ contentType, toggleContent }) {
  return (
    <>
      {contentType && (
        <div onClick={() => toggleContent(false)}>
          <button className={'button'}>
            <span className={'text'}>Movies</span>
          </button>
        </div>
      )}

      {!contentType && (
        <div onClick={() => toggleContent(true)}>
          <button className={'button'}>
            <span className={'text'}>Series</span>
          </button>
        </div>
      )}
      <style jsx>{`
        .button {
          padding: 15px 40px;
          border-radius: 40px;
          cursor: pointer;
          z-index: -1;
          background-image: linear-gradient(120deg, #34e0f0 0%, #b400ff 100%);
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          width: 130px;
          height: 70px;
          animation: morph 3s linear infinite;
          transform-style: preserve-3d;
          outline: 1px solid transparent;
          will-change: border-radius;
          transition: ease-in 0.4s;
          cursor: pointer;
          font-size: 1.1em;
        }

        .button:before,
        .button:after {
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

        .button:before {
          animation: morph 3s linear infinite;
          opacity: 0.21;
          animation-duration: 1.5s;
        }

        .text {
          position: relative;
          z-index: 6;
          color: black;
        }
      `}</style>
    </>
  );
}
