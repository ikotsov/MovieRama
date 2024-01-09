import { loadGenres, loadMovies, state } from './model.js';

const app = async () => {
  await loadGenres();
  console.log('genres', state.genres);

  await loadMovies(state.page);
  console.log('movies', state.movies);
};
app();
