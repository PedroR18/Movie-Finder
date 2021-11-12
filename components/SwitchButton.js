export default function SwitchButton({ contentType, toggleContent }) {
  return (
    <>
      {contentType && (
        <div onClick={() => toggleContent(false)} className={'container'}>
          <span className={'text'}>MOVIES</span>
        </div>
      )}

      {!contentType && (
        <div onClick={() => toggleContent(true)} className={'container'}>
          <span className={'text'}>SERIES</span>
        </div>
      )}
      <style jsx>{`
        .container {
          position: fixed;
          z-index: 100;
          right: 20px;
          top: 5%;
          cursor: pointer;
        }

        .text {
          writing-mode: vertical-rl;
          letter-spacing: 0.8em;
          font-size: 2em;
          font-family: 'Teko';
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-2&color=2253E7');
        }

        .text:hover {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-2&color=883FEE');
        }
      `}</style>
    </>
  );
}
