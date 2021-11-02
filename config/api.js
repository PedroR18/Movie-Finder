import {
  API_KEY,
  API_URL,
  POPULAR_MOVIES_BASE_URL,
  POPULAR_SERIES_BASE_URL,
  SEARCH_MOVIES_BASE_URL,
  SEARCH_MULTI_BASE_URL,
  SEARCH_PERSON_BASE_URL,
  SEARCH_SERIES_BASE_URL,
  TOP_MOVIES_BASE_URL,
  TOP_SERIES_BASE_URL,
  TRENDING_MOVIES_BASE_URL,
  TRENDING_SERIES_BASE_URL,
} from './config';

const apiMethods = {
  //SEARCH
  fetchMovies: async (searchTerm, page = 1) => {
    const endpoint = `${SEARCH_MOVIES_BASE_URL}${searchTerm}&page=${page}&include_adult=false`;
    return await (await fetch(endpoint)).json();
  },
  fetchSeries: async (searchTerm, page = 1) => {
    const endpoint = `${SEARCH_SERIES_BASE_URL}${searchTerm}&page=${page}&include_adult=false`;
    return await (await fetch(endpoint)).json();
  },
  fetchPeople: async (searchTerm, page = 1) => {
    const endpoint = `${SEARCH_PERSON_BASE_URL}${searchTerm}&page=${page}&include_adult=false`;
    return await (await fetch(endpoint)).json();
  },
  fetchMulti: async (searchTerm, page = 1) => {
    const endpoint = `${SEARCH_MULTI_BASE_URL}${searchTerm}&page=${page}&include_adult=false`;
    return await (await fetch(endpoint)).json();
  },
  //POPULAR
  fetchPopularMovies: async () => {
    return await (await fetch(POPULAR_MOVIES_BASE_URL)).json();
  },
  fetchPopularSeries: async () => {
    return await (await fetch(POPULAR_SERIES_BASE_URL)).json();
  },
  //TOP
  fetchTopMovies: async () => {
    return await (await fetch(TOP_MOVIES_BASE_URL)).json();
  },
  fetchTopSeries: async () => {
    return await (await fetch(TOP_SERIES_BASE_URL)).json();
  },
  //TRENDING
  fetchTrendingMovies: async () => {
    return await (await fetch(TRENDING_MOVIES_BASE_URL)).json();
  },
  fetchTrendingSeries: async () => {
    return await (await fetch(TRENDING_SERIES_BASE_URL)).json();
  },
  //DETAILS
  fetchMovie: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSerie: async (serieId) => {
    const endpoint = `${API_URL}tv/${serieId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchPerson: async (personId) => {
    const endpoint = `${API_URL}person/${personId}?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  //CREDITS
  fetchMovieCredits: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSerieCredits: async (serieId) => {
    const endpoint = `${API_URL}tv/${serieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchPersonCredits: async (personId) => {
    const endpoint = `${API_URL}person/${personId}/combined_credits?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  //RECOMMENDATIONS
  fetchMovieRecommendations: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}/recommendations?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSerieRecommendations: async (serieId) => {
    const endpoint = `${API_URL}tv/${serieId}/recommendations?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  //SIMILAR
  fetchSimilarMovie: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}/similar?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSimilarSerie: async (serieId) => {
    const endpoint = `${API_URL}tv/${serieId}/similar?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  //VIDEOS
  fetchMovieVideos: async (movieId) => {
    const endpoint = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSerieVideos: async (serieId) => {
    const endpoint = `${API_URL}tv/${serieId}/videos?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
};

export default apiMethods;
