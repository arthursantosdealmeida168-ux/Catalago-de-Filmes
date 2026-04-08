import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import MovieGrid from "@/components/movies/MovieGrid";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

 
  const movies = favorites.map((f) => ({
    id: f.tmdb_id,
    title: f.title,
    poster_path: f.poster_path,
    vote_average: f.vote_average,
    release_date: f.release_date,
    overview: f.overview,
  }));

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Heart className="w-7 h-7 text-red-500 fill-red-500" />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Favoritos</h1>
      </motion.div>

      {!loading && movies.length > 0 && (
        <p className="text-sm text-muted-foreground font-inter">
          {movies.length} filme(s) na sua lista
        </p>
      )}

      <MovieGrid
        movies={movies}
        loading={loading}
        emptyMessage="Você ainda não salvou nenhum filme. Explore e adicione seus favoritos! ❤️"
      />
    </div>
  );
}