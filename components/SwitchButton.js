export default function SwitchButton({ contentType, toggleContent }) {
  return (
    <>
      <div className={'container'}>
        <div onClick={() => toggleContent(true)} className={'button'}>
          <span className={contentType ? 'text selected' : 'text noSelected'}>
            MOVIES
          </span>
        </div>

        <div onClick={() => toggleContent(false)} className={'button'}>
          <span className={!contentType ? 'text selected' : 'text noSelected'}>
            SERIES
          </span>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          z-index: 100;
          right: 20px;
          top: 11%;
          cursor: pointer;
        }

        .text {
          writing-mode: vertical-rl;
          letter-spacing: 0.8em;
          font-size: 2em;
          font-family: 'Teko';
          transition: ease-in 0.2s;
        }

        .selected {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-2&color=2253E7');
        }

        .noSelected:hover {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=883FEE');
        }

        .button {
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
}
