import React from "react";
import MovieCard from "./MovieCard";
import { Loader2 } from "lucide-react";

export default function MovieGrid({ movies, loading, emptyMessage = "Nenhum filme encontrado." }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground font-inter">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={i} />
      ))}
    </div>
  );
}