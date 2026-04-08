import React, { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    setLoading(true);
    const data = await base44.entities.FavoriteMovie.list();
    setFavorites(data);
    setLoading(false);
  }

  function isFavorite(tmdbId) {
    return favorites.some((f) => f.tmdb_id === tmdbId);
  }

  async function toggleFavorite(movie) {
    const existing = favorites.find((f) => f.tmdb_id === movie.id);
    if (existing) {
      await base44.entities.FavoriteMovie.delete(existing.id);
      setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
    } else {
      const created = await base44.entities.FavoriteMovie.create({
        tmdb_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
      });
      setFavorites((prev) => [...prev, created]);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite, loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}