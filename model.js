import {
  API_KEY,
  API_URL_GENRE_LIST,
  API_URL_MOVIE_LIST,
  LANGUAGE_CODE,
} from './config.js';
import { fetchJsonData } from './fetchJsonData.js';

export const state = {
  page: 1,
  genres: [],
  movies: [],
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

export const loadMovies = async (page) => {
  const params = createMovieListUrlParams(page);
  try {
    const data = await fetchJsonData(`${API_URL_MOVIE_LIST}?${params}`);
    state.movies = data.results.map(createMovie);
  } catch (error) {
    console.error(`fetchMovies ${error} 💥💥💥💥`);
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
    console.error(`fetchMovies ${error} 💥💥💥💥`);
    throw error;
  }
};
