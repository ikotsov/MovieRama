import { loadGenres, loadMovies, state } from './src/model.js';

const app = async () => {
  await loadGenres();
  console.log('genres', state.genres);

  await loadMovies();
  console.log('movies', state.movies);
};
app();
