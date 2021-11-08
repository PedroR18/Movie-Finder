export default function Search(props) {
  return (
    <div className={'searchWrapper'}>
      <div className={'switchContainer'}>
        <button
          className={props.contentType ? 'activeMoviesButton' : 'moviesButton'}
          onClick={() => props.toggleContent(true)}
        >
          Movies
        </button>
        <button
          className={props.contentType ? 'seriesButton' : 'activeSeriesButton'}
          onClick={() => props.toggleContent(false)}
        >
          TV Series
        </button>
      </div>
      <div className={'searchContainer'}>
        <input
          onChange={props.onChange}
          value={props.searchQuery}
          className={'searchBar'}
        />
      </div>
      <style jsx>{`
        .searchWrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          width: 100%;
          margin: 0 auto;
        }

        .searchContainer {
          height: 5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .switchContainer {
          height: 4em;
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .switchContainer button {
          font-size: 2em;
        }

        .switchContainer button:nth-of-type(1) {
          width: 50%;
          height: 100%;
          padding: 0px;
          border: none;
          background: rgba(40, 40, 40, 0.35);
          border: 1px solid transparent;
          border-top-left-radius: 10px;
        }

        .switchContainer button:nth-of-type(2) {
          border: none;
          width: 50%;
          height: 100%;
          padding: 0px;
          background: rgba(40, 40, 40, 0.35);
          border: 1px solid transparent;
          border-top-right-radius: 10px;
        }

        .activeMoviesButton {
          background: transparent !important;
        }
        .activeSeriesButton {
          background: transparent !important;
        }

        .searchBar {
          width: 90%;
          height: 50px;
          font-size: 2rem;
          padding: 8px 16px;
          color: black;
          background-color: transparent;
          transition: transform 250ms ease-in-out;
          line-height: 18px;
          background-color: transparent;
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 18px 18px;
          background-position: 95% center;
          border-radius: 50px;
          border: 1px solid black;
          transition: all 250ms ease-in-out;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .searchBar:hover,
        .searchBar:focus {
          padding: 8px 0;
          outline: 0;
          border: 1px solid transparent;
          border-bottom: 1px solid black;
          border-radius: 0;
          background-position: 100% center;
        }

        @media screen and (min-width: 600px) {
          .searchWrapper {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
}
