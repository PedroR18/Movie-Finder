import Image from 'next/image';
import { IMG_LOADER } from '../config/config';

export default function SearchResults(props) {
  return (
    <>
      <ul>
        {props.searchResults &&
          props.searchResults.map((content) => {
            if (content.poster_path) {
              return (
                <li style={{ width: '10vw' }} key={content.id}>
                  <a onClick={() => props.addFavContent(content)}>
                    <p>{content.title || content.name}</p>
                    <Image
                      loader={IMG_LOADER}
                      src={`${String(content.poster_path)}`}
                      alt="Movie Poster"
                      layout="responsive"
                      width="780"
                      height="1170"
                    />
                  </a>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
