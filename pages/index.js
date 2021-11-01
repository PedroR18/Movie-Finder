import { useState } from 'react';
import FavContent from '../components/FavContent';
import Recommendations from '../components/Recommendations';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import api from '../config/api';

export default function Home() {
  //STATES

  const [searchResults, setSearchResults] = useState([]);
  const [favMovies, setFavMovies] = useState(new Set());
  const [favSeries, setFavSeries] = useState(new Set());
  const [RecommendationsView, setRecommendationsView] = useState(false);
  const [contentType, setContentType] = useState(true); //True === Movies && False === Series
  const [searchQuery, setSearchQuery] = useState(' ');
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [seriesRecommendations, setSeriesRecommendations] = useState(new Set());

  //FUNCTIONS
  const fetchSearch = async (event) => {
    setSearchQuery(event.target.value);
    let searchTerm;
    if (contentType) {
      searchTerm = await api.fetchMovies(event.target.value);
    } else {
      searchTerm = await api.fetchSeries(event.target.value);
    }
    setSearchResults(searchTerm.results);
  };

  const addFavContent = (content) => {
    if (content.release_date) {
      setFavMovies(new Set([...favMovies, content]));
    } else if (content.first_air_date) {
      setFavSeries(new Set([...favSeries, content]));
    } else console.log('Invalid Media Type');
  };

  const toggleContent = (boolean) => {
    setContentType(boolean);
    setSearchQuery('');
    setSearchResults([]);
  };

  const uniqueMovies = (arr) => {
    const array = Array.from(arr);
    const ids = [];

    const noDuplicates = array.map((x) => {
      if (x && !ids.includes(x.id)) {
        ids.push(x.id);
        return x;
      }
    });
    const noUndefined = noDuplicates.filter((x) => x != undefined);
    return noUndefined;
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const generateRecommendations = () => {
    //GENERATE MOVIES
    if (contentType && favMovies.size !== 0) {
      const similar = [];
      const recommended = [];
      Array.from(favMovies).map(async (movie) => {
        similar.push((await api.fetchSimilarMovie(movie.id)).results);
        recommended.push(
          (await api.fetchMovieRecommendations(movie.id)).results
        );
      });
      setTimeout(() => {
        const spreadSimilar = similar[0].concat(similar[1]);
        const spreadRecommended = recommended[0].concat(recommended[1]);
        const all = [...spreadRecommended, ...spreadSimilar];
        const uniqueAll = uniqueMovies(all);
        const shuffled = shuffle(uniqueAll);
        setMovieRecommendations(new Set(shuffled));
      }, 1000);
    }

    setRecommendationsView(true);
  };

  return (
    <>
      {/*---------------SEARCH SCREEN---------------*/}

      {!RecommendationsView && (
        <Search
          onChange={fetchSearch}
          searchQuery={searchQuery}
          toggleContent={toggleContent}
        />
      )}

      {!RecommendationsView && favMovies && (
        <FavContent
          favContent={contentType ? favMovies : favSeries}
          setFavContent={contentType ? setFavMovies : setFavSeries}
          contentType={contentType}
        />
      )}

      {/*TEMPORARY BUTTON */}
      {!RecommendationsView && (
        <button onClick={generateRecommendations}>Results</button>
      )}
      {/*TEMPORARY BUTTON */}

      {!RecommendationsView && searchResults && (
        <SearchResults
          searchResults={searchResults}
          addFavContent={addFavContent}
        />
      )}

      {/*---------------RECOMMENDATIONS SCREEN---------------*/}

      {RecommendationsView && (
        <Recommendations
          setRecommendationsView={setRecommendationsView}
          movieRecommendations={movieRecommendations}
        />
      )}
    </>
  );
}
