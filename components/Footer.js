import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <div className={'footerWrapper'}>
        <div className={'author'}>
          <p>Created By Pedro Ribeiro ©2021</p>
        </div>
        <div className={'links'}>
          <div className={'tmdb'}>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/Tmdb.svg" alt="TMDB" height="24px" width="24px" />
            </a>
          </div>
          <div className={'gitHub'}>
            <a
              href="https://github.com/PedroR18"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/GitHub.png"
                alt="GitHub"
                height="24px"
                width="24px"
              />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footerWrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .author p {
          font-size: 0.7em;
        }
        .gitHub {
          height: 24px;
          width: 24px;
          margin-left: 30px;
        }

        .links {
          display: flex;
        }
      `}</style>
    </>
  );
}
