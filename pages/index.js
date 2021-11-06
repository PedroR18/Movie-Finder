import { useEffect, useState } from 'react';
import FixedNav from '../components/FixedNav';
import Recommendations from '../components/Recommendations';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import api from '../config/api';
import utilities from '../config/utilities';

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
      if (!utilities.checkEquality(favMovies, content)) {
        setFavMovies(new Set([...favMovies, content]));
        setSearchQuery('');
      } else {
        const newList = Array.from(favMovies).filter(
          (i) => i.id !== content.id
        );
        setFavMovies(new Set([...newList]));
      }
    } else if (content.first_air_date) {
      if (!utilities.checkEquality(favSeries, content)) {
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

  const toggleContent = (boolean) => {
    setContentType(boolean);
    setSearchQuery('');
    setSearchResults([]);
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
        const uniqueAll = utilities.unique(all);
        const shuffled = utilities.shuffle(uniqueAll);
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
        const uniqueAll = utilities.unique(all);
        const shuffled = utilities.shuffle(uniqueAll);
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
          checkEquality={utilities.checkEquality}
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
