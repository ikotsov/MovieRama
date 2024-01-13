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
  query: '',
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

const updatePageWhenSearch = (query) => {
  if (query !== state.query) {
    state.page = 1;
  } else {
    state.page = state.page + 1;
  }
};

// TODO: use
export const hasReachedEndPage = () => {
  return state.totalMovies === state.movies.length && state.totalMovies !== 0;
};

export const loadSearchResults = async (query) => {
  updatePageWhenSearch(query);
  state.query = query;
  const params = createSearchResultsParams(query, state.page);
  try {
    const data = await fetchJsonData(`${URL_MOVIE_SEARCH}?${params}`);

    state.totalMovies = data.total_results;
    const newResults = data.results.map(createMovie);
    state.movies =
      state.page === 1 ? [...newResults] : [...state.movies, ...newResults];
  } catch (error) {
    throw error;
  }
};

export const getItemsToRender = () => {
  if (state.movies.length > state.moviesPerPage)
    return state.movies.slice(-state.moviesPerPage);

  return state.movies;
};
