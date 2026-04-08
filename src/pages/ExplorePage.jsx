import React, { useState, useEffect } from "react";
import GenreChips from "@/components/movies/GenreChips";
import MovieGrid from "@/components/movies/MovieGrid";
import { getGenres, getMoviesByGenre, getPopular } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [selectedGenre]);

  async function loadMovies(p) {
    setLoading(true);
    const data = selectedGenre
      ? await getMoviesByGenre(selectedGenre, p)
      : await getPopular(p);
    if (p === 1) {
      setMovies(data.results);
    } else {
      setMovies((prev) => [...prev, ...data.results]);
    }
    setTotalPages(data.total_pages);
    setLoading(false);
  }

  function loadMore() {
    const next = page + 1;
    setPage(next);
    loadMovies(next);
  }

  const genreName = genres.find((g) => g.id === selectedGenre)?.name;

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Explorar</h1>
        <GenreChips genres={genres} selected={selectedGenre} onSelect={setSelectedGenre} />
      </motion.div>

      <div>
        {genreName && (
          <h2 className="font-display text-lg font-bold text-foreground mb-4">{genreName}</h2>
        )}
        <MovieGrid movies={movies} loading={loading && page === 1} />

        {!loading && page < totalPages && movies.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMore}
              variant="outline"
              className="rounded-full px-8 font-inter"
            >
              Carregar mais
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}