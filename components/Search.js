import SwitchButton from './SwitchButton';

export default function Search(props) {
  return (
    <div className={'searchWrapper'}>
      <SwitchButton
        contentType={props.contentType}
        toggleContent={props.toggleContent}
      />

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
          width: 70%;
          margin: 0 auto;
        }

        .searchContainer {
          height: 5em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .searchBar {
          width: 100%;
          height: 60px;
          font-size: 2rem;
          padding: 8px 16px;
          color: black;
          transition: transform 250ms ease-in-out;
          line-height: 18px;
          background-color: white;
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 32px 32px;
          background-position: 95% center;
          border-radius: 50px;
          border: 1px solid white;
          transition: all 250ms ease-in-out;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .searchBar:hover,
        .searchBar:focus {
          padding: 8px 20px;
          outline: 0;
          border: 1px solid transparent;
          border-bottom: 1px solid black;
          background-size: 22px 22px;
          background-position: 95% center;
          transform: scale;
        }
      `}</style>
    </div>
  );
}
