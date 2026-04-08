import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "@/components/movies/SearchInput";
import MovieGrid from "@/components/movies/MovieGrid";
import { searchMovies, getTrending } from "@/lib/tmdb";
import { motion } from "framer-motion";
import lodash from "lodash";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    getTrending().then((data) => {
      setTrending(data);
      setInitialLoading(false);
    });
  }, []);

  const doSearch = useCallback(
    lodash.debounce(async (q) => {
      if (!q.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await searchMovies(q);
      setResults(data.results);
      setLoading(false);
    }, 400),
    []
  );

  useEffect(() => {
    if (query) {
      setLoading(true);
      doSearch(query);
    } else {
      setResults([]);
    }
  }, [query, doSearch]);

  const displayMovies = query ? results : trending;

  return (
    <div className="px-4 md:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Buscar</h1>
        <SearchInput value={query} onChange={setQuery} />
      </motion.div>

      <div>
        {!query && (
          <h2 className="font-display text-lg font-bold text-foreground mb-4">
            🔥 Tendências
          </h2>
        )}
        {query && results.length > 0 && (
          <p className="text-sm text-muted-foreground font-inter mb-4">
            {results.length} resultado(s) para "{query}"
          </p>
        )}
        <MovieGrid
          movies={displayMovies}
          loading={query ? loading : initialLoading}
          emptyMessage={query ? `Nenhum filme encontrado para "${query}"` : ""}
        />
      </div>
    </div>
  );
}