// Configuration for TMDB API
// API Docs: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '0689dca3e071e3aa3a640b33dbce832e';

// Base URLs
//SEARCH

const SEARCH_MOVIES_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const SEARCH_SERIES_BASE_URL = `${API_URL}search/tv?api_key=${API_KEY}&query=`;
const SEARCH_PERSON_BASE_URL = `${API_URL}search/person?api_key=${API_KEY}&query=`;
const SEARCH_MULTI_BASE_URL = `${API_URL}search/multi?api_key=${API_KEY}&query=`;

//POPULAR

const POPULAR_MOVIES_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const POPULAR_SERIES_BASE_URL = `${API_URL}tv/popular?api_key=${API_KEY}`;

//TOP

const TOP_MOVIES_BASE_URL = `${API_URL}movie/top_rated?api_key=${API_KEY}`;
const TOP_SERIES_BASE_URL = `${API_URL}tv/top_rated?api_key=${API_KEY}`;

//TRENDING

const TRENDING_MOVIES_BASE_URL = `${API_URL}trending/movie/week?api_key=${API_KEY}`;
const TRENDING_SERIES_BASE_URL = `${API_URL}trending/tv/week?api_key=${API_KEY}`;

//IMAGES

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w1280';
const POSTER_SIZE = 'w780';
const IMG_LOADER = ({ src, width }) => {
  return `${IMAGE_BASE_URL}${POSTER_SIZE || BACKDROP_SIZE}${src}?w=${width}`;
};

export {
  API_URL,
  API_KEY,
  SEARCH_MOVIES_BASE_URL,
  SEARCH_MULTI_BASE_URL,
  SEARCH_PERSON_BASE_URL,
  SEARCH_SERIES_BASE_URL,
  POPULAR_MOVIES_BASE_URL,
  POPULAR_SERIES_BASE_URL,
  TOP_MOVIES_BASE_URL,
  TOP_SERIES_BASE_URL,
  TRENDING_MOVIES_BASE_URL,
  TRENDING_SERIES_BASE_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  IMG_LOADER,
};
