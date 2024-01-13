import {
  API_KEY,
  API_URL_GENRE_LIST,
  API_URL_MOVIE_LIST,
  LANGUAGE_CODE,
  MOVIES_PER_PAGE,
  URL_MOVIE_SEARCH,
} from './config.js';
import { fetchJsonData } from './helpers.js';

export const state = {
  page: 0,
  genres: [],
  movies: [],
  moviesPerPage: MOVIES_PER_PAGE,
  totalMovies: 0,
  search: {
    query: '',
    results: [],
    page: 0,
    resultsPerPage: MOVIES_PER_PAGE,
    totalResults: 0,
  },
};

const createMovieListUrlParams = (page) => {
  const params = new URLSearchParams();
  params.append('api_key', API_KEY);
  params.append('page', page);
  params.append('language', LANGUAGE_CODE);
  return params;
};

const createMovie = (movie) => {
  const genres = movie.genre_ids.map(
    (id) => state.genres.find((genre) => genre.id === id).name
  );
  const releaseYear = new Date(movie.release_date).getFullYear();

  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    releaseYear,
    genres,
    description: movie.overview,
    votes: movie.vote_average,
  };
};

export const loadMovies = async () => {
  const params = createMovieListUrlParams(++state.page);
  try {
    const data = await fetchJsonData(`${API_URL_MOVIE_LIST}?${params}`);
    const newMovies = data.results.map(createMovie);
    state.movies = [...state.movies, ...newMovies];
  } catch (error) {
    throw error;
  }
};

const createGenreListUrlParams = () => {
  const params = new URLSearchParams();
  params.append('api_key', API_KEY);
  return params;
};

export const loadGenres = async () => {
  const params = createGenreListUrlParams();
  try {
    const data = await fetchJsonData(`${API_URL_GENRE_LIST}?${params}`);
    state.genres = data.genres;
  } catch (error) {
    throw error;
  }
};

const createSearchResultsParams = (query, page) => {
  const params = new URLSearchParams();
  params.append('api_key', API_KEY);
  params.append('page', page);
  params.append('language', LANGUAGE_CODE);
  params.append('query', query);
  return params;
};

const updateSearchResultsPage = (query) => {
  if (query !== state.search.query) {
    state.search.page = 1;
  } else {
    state.search.page = state.search.page + 1;
  }
};

export const hasReachedSearchResultsEndPage = () => {
  return (
    state.search.totalResults === state.search.results.length &&
    state.search.totalResults !== 0
  );
};

export const loadSearchResults = async (query) => {
  updateSearchResultsPage(query);
  state.search.query = query;
  const params = createSearchResultsParams(query, state.search.page);
  try {
    const data = await fetchJsonData(`${URL_MOVIE_SEARCH}?${params}`);
    state.search.totalResults = data.total_results;
    const newResults = data.results.map(createMovie);
    state.search.results =
      state.search.page === 1
        ? [...newResults]
        : [...state.search.results, ...newResults];
  } catch (error) {
    throw error;
  }
};

export const getItemsToRender = (options = { isSearchResults: false }) => {
  const items = options.isSearchResults ? state.search.results : state.movies;
  const perPage = options.isSearchResults
    ? state.search.resultsPerPage
    : state.moviesPerPage;

  if (items.length > perPage) return items.slice(-perPage);

  return items;
};
