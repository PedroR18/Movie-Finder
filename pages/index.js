import { useEffect, useState } from 'react';
import FixedNav from '../components/FixedNav';
import Recommendations from '../components/Recommendations';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import api from '../config/api';

export default function Home() {
  //STATES

  const [searchResults, setSearchResults] = useState([]);
  const [popularResults, setPopularResults] = useState([]);
  const [favMovies, setFavMovies] = useState(new Set());
  const [favSeries, setFavSeries] = useState(new Set());
  const [RecommendationsView, setRecommendationsView] = useState(false); //True === RecommendationsView && False === SearchView
  const [contentType, setContentType] = useState(true); //True === Movies && False === Series
  const [searchQuery, setSearchQuery] = useState(' ');
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [seriesRecommendations, setSeriesRecommendations] = useState(new Set());
  const [favModalVisibility, setFavModalVisibility] = useState(false);

  //FUNCTIONS

  useEffect(() => {
    const fetchPopular = async () => {
      let list;
      if (contentType) {
        list = await api.fetchPopularMovies();
      } else {
        list = await api.fetchPopularSeries();
      }
      setPopularResults([...list.results]);
    };
    fetchPopular();
  }, [contentType]);

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
  const toggleFavContent = (content) => {
    if (content.release_date) {
      if (!checkEquality(favMovies, content)) {
        setFavMovies(new Set([...favMovies, content]));
        setSearchQuery('');
      } else {
        const newList = Array.from(favMovies).filter(
          (i) => i.id !== content.id
        );
        setFavMovies(new Set([...newList]));
      }
    } else if (content.first_air_date) {
      if (!checkEquality(favSeries, content)) {
        setFavSeries(new Set([...favSeries, content]));
        setSearchQuery('');
      } else {
        const newList = Array.from(favSeries).filter(
          (i) => i.id !== content.id
        );
        setFavSeries(new Set([...newList]));
      }
    } else console.log('Invalid Media Type'); //CHANGE TO TOAST!!
  };

  const checkEquality = (arr, obj) => {
    for (const e of arr) {
      if (e.id === obj.id) {
        return true;
      }
    }
  };

  const toggleContent = (boolean) => {
    setContentType(boolean);
    setSearchQuery('');
    setSearchResults([]);
  };

  const uniqueMovies = (arr) => {
    const array = Array.from(arr);
    const ids = [];

    const favArray = Array.from(contentType ? favMovies : favSeries);
    const favIds = favArray.map((x) => x.id);

    const noDuplicates = array.map((x) => {
      if (x && !ids.includes(x.id) && !favIds.includes(x.id)) {
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
    if (contentType && favMovies.size !== 0 && favMovies.length !== 0) {
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
      }, 500);
      //GENERATE SERIES
    } else if (!contentType && favSeries.size !== 0 && favSeries.length !== 0) {
      const similar = [];
      const recommended = [];
      Array.from(favSeries).map(async (serie) => {
        similar.push((await api.fetchSimilarSerie(serie.id)).results);
        recommended.push(
          (await api.fetchSerieRecommendations(serie.id)).results
        );
      });
      setTimeout(() => {
        const spreadSimilar = similar[0].concat(similar[1]);
        const spreadRecommended = recommended[0].concat(recommended[1]);
        const all = [...spreadRecommended, ...spreadSimilar];
        const uniqueAll = uniqueMovies(all);
        const shuffled = shuffle(uniqueAll);
        setSeriesRecommendations(new Set(shuffled));
      }, 500);
    } else return alert('Select Movies or Series'); //CHANGE TO TOAST!!

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
          contentType={contentType}
        />
      )}

      {!RecommendationsView && searchResults && (
        <SearchResults
          searchResults={
            searchResults.length !== 0 ? searchResults : popularResults
          }
          toggleFavContent={toggleFavContent}
          favMovies={favMovies}
          favSeries={favSeries}
          checkEquality={checkEquality}
        />
      )}

      {!RecommendationsView && (
        <FixedNav
          generateRecommendations={generateRecommendations}
          contentType={contentType}
          favMovies={favMovies}
          favSeries={favSeries}
          RecommendationsView={RecommendationsView}
          setFavMovies={setFavMovies}
          setFavSeries={setFavSeries}
          favModalVisibility={favModalVisibility}
          setFavModalVisibility={setFavModalVisibility}
        />
      )}

      {/*---------------RECOMMENDATIONS SCREEN---------------*/}

      {RecommendationsView && (
        <Recommendations
          setRecommendationsView={setRecommendationsView}
          movieRecommendations={movieRecommendations}
          seriesRecommendations={seriesRecommendations}
          contentType={contentType}
        />
      )}
    </>
  );
}
