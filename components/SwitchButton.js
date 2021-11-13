import Image from 'next/image';
import { useState } from 'react';

export default function SwitchButton({ contentType, toggleContent }) {
  const [menuClasses, setMenuClasses] = useState('button');
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
          <Image
            src="/../public/Menu.svg"
            alt="Menu"
            height="20px"
            width="20px"
          />
        </div>
        <div className={'buttonsContainer'}>
          <div
            onClick={() => {
              toggleContent(true);
              setMenuClasses('button hidden');
              setContainerClasses('navContainer');
            }}
            className={menuClasses}
          >
            <span className={contentType ? 'text selected' : 'text noSelected'}>
              MOVIES
            </span>
          </div>

          <div
            onClick={() => {
              toggleContent(false);
              setMenuClasses('button hidden');
              setContainerClasses('navContainer');
            }}
            className={menuClasses}
          >
            <span
              className={!contentType ? 'text selected' : 'text noSelected'}
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
          right: 15px;
          top: 20px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .background {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-3&color=ffffff');
          background-size: 100% 100% !important;
          background-position: right 30px;
        }

        .text {
          writing-mode: vertical-rl;
          letter-spacing: 0.9em;
          font-size: 1.7em;
          font-family: 'Teko';
          transition: ease-in 0.2s;
          color: black;
          text-shadow: 0px 0px 18px rgb(150, 170, 150);
        }

        .selected {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-2&color=2253E7');
          background-size: 100% 100% !important;
        }

        .noSelected:hover {
          background: url('//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=883FEE');
          background-size: 100% 100% !important;
        }

        .button {
          margin-bottom: 50px;
          transition: ease-in 0.2s;
          opacity: 1;
          cursor: pointer;
        }

        .burger {
          margin-bottom: 70px;
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
