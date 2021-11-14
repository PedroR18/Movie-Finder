import Image from 'next/image';
import { useState } from 'react';

export default function SwitchButton({ contentType, toggleContent }) {
  const [menuClasses, setMenuClasses] = useState('button hidden');
  const [containerClasses, setContainerClasses] = useState('navContainer');
  const handleMenu = () => {
    menuClasses.includes('hidden')
      ? setMenuClasses('button')
      : setMenuClasses('button hidden');

    menuClasses.includes('hidden')
      ? setContainerClasses('navContainer background')
      : setContainerClasses('navContainer');
  };
  return (
    <>
      <div className={containerClasses}>
        <div className={'burger'} onClick={() => handleMenu()}>
          <Image src="/Menu.svg" alt="Menu" height="20px" width="20px" />
        </div>
        <div className={'buttonsContainer'}>
          <div
            onClick={() => {
              toggleContent(true);
              setMenuClasses('button hidden');
              setContainerClasses('navContainer');
              window.scrollTo(0, 0);
            }}
            className={menuClasses}
          >
            <span
              className={
                contentType ? 'text selected' : 'text noSelected lowOpacity'
              }
            >
              MOVIES
            </span>
          </div>

          <div
            onClick={() => {
              toggleContent(false);
              setMenuClasses('button hidden');
              setContainerClasses('navContainer');
              window.scrollTo(0, 0);
            }}
            className={menuClasses}
          >
            <span
              className={
                !contentType ? 'text selected' : 'text noSelected lowOpacity'
              }
            >
              SERIES
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .navContainer {
          position: fixed;
          z-index: 100;
          right: 10px;
          top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .background {
          background-color: white;
          border-radius: 40px;
          transition: ease-in-out 0.3s;
        }

        .text {
          writing-mode: vertical-lr;
          letter-spacing: 0.9em;
          font-size: 1.7em;
          font-family: 'Teko', sans-serif;
          transition: ease-in 0.2s;
          padding: 0 5px;
          padding-top: 20px;
          cursor: pointer;
        }

        .selected {
          background-color: rgb(25, 36, 49);
          border-radius: 40px;
        }

        .noSelected {
          color: black;
        }

        .noSelected:hover {
          opacity: 1 !important;
        }

        .button {
          transition: ease-in 0.2s;
          opacity: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        .buttonsContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .burger {
          margin-bottom: 10px;
          height: 55px;
          width: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          border: 1px solid white;
          background-color: white;
          transition: ease-in 0.2s;
          cursor: pointer;
        }

        .burger:hover {
          transform: scale(1.1);
        }

        .hidden {
          visibility: hidden;
          opacity: 0;
        }

        .lowOpacity {
          opacity: 0.4;
        }

        @media screen and (min-width: 600px) {
          .navContainer {
            right: 25px;
          }
        }

        @media screen and (min-width: 700px) {
          .text {
            font-size: 1.9em;
          }
        }

        @media screen and (min-width: 850px) {
          .navContainer {
            right: 35px;
          }
        }

        @media screen and (min-width: 1000px) {
          .burger {
            visibility: hidden;
            cursor: auto;
          }

          .background {
            background: none;
          }
          .text {
            color: white;
            font-size: 2.7em;
          }

          .button {
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navContainer {
            right: 30px;
          }
        }

        @media screen and (min-width: 1200px) {
          .navContainer {
            right: 40px;
          }
        }

        @media screen and (min-width: 1500px) {
          .navContainer {
            right: 50px;
          }
        }

        @media screen and (min-width: 1600px) {
          .text {
            font-size: 3em;
          }

          .navContainer {
            right: 70px;
          }
        }

        @media screen and (min-width: 2000px) {
          .text {
            font-size: 3.3em;
          }

          .navContainer {
            right: 60px;
          }
        }
      `}</style>
    </>
  );
}
