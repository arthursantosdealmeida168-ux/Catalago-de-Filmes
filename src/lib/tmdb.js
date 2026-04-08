const API_KEY = "8265bd1679663a7ea12ac168da84d2e8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path) => getImageUrl(path, "w1280");

async function fetchTMDB(endpoint, params = {}) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "pt-BR",
    ...params,
  });
  const res = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);
  if (!res.ok) throw new Error("Erro ao buscar dados do TMDB");
  return res.json();
}

export async function getTrending() {
  const data = await fetchTMDB("/trending/movie/week");
  return data.results;
}

export async function getPopular(page = 1) {
  const data = await fetchTMDB("/movie/popular", { page });
  return data;
}

export async function getTopRated(page = 1) {
  const data = await fetchTMDB("/movie/top_rated", { page });
  return data;
}

export async function getUpcoming(page = 1) {
  const data = await fetchTMDB("/movie/upcoming", { page });
  return data;
}

export async function getNowPlaying(page = 1) {
  const data = await fetchTMDB("/movie/now_playing", { page });
  return data;
}

export async function searchMovies(query, page = 1) {
  const data = await fetchTMDB("/search/movie", { query, page });
  return data;
}

export async function getMovieDetails(id) {
  return fetchTMDB(`/movie/${id}`, { append_to_response: "credits,videos,similar" });
}

export async function getGenres() {
  const data = await fetchTMDB("/genre/movie/list");
  return data.genres;
}

export async function getMoviesByGenre(genreId, page = 1) {
  const data = await fetchTMDB("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
  return data;
}