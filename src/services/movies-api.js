import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '446a6481bf8395f98e9eabc7892a2c81';
// const API_v4_KEY =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZhNjQ4MWJmODM5NWY5OGU5ZWFiYzc4OTJhMmM4MSIsInN1YiI6IjVmZTBlZjYyYTBiNjkwMDA0MWEzNmUzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d9s1fbAXkrKy6SCuFtas-nunDBgsUpGTj-8G2EECA7s';

async function fetchWithErrorhandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorhandling(
    `${BASE_URL}trending/all/week?api_key=${API_KEY}`,
  );
}

export function fetchTrendingMoviesByPage(page) {
  return fetchWithErrorhandling(
    `${BASE_URL}trending/all/week?api_key=${API_KEY}&page=${page}`,
  );
}

export function fetchMoviesBySearch(page, query) {
  return fetchWithErrorhandling(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=false`,
  );
}

export function fetchMovieDetais(id) {
  return fetchWithErrorhandling(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
}
export function fetchMovieCredits(id) {
  return fetchWithErrorhandling(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`,
  );
}
export function fetchMovieReviews(id) {
  return fetchWithErrorhandling(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`,
  );
}
