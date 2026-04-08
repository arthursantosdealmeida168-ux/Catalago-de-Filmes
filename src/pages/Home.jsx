import React, { useState, useEffect } from "react";
import HeroSlider from "@/components/movies/HeroSlider";
import MovieRow from "@/components/movies/MovieRow";
import { getTrending, getPopular, getTopRated, getUpcoming, getNowPlaying } from "@/lib/tmdb";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [t, p, tr, u, np] = await Promise.all([
        getTrending(),
        getPopular(),
        getTopRated(),
        getUpcoming(),
        getNowPlaying(),
      ]);
      setTrending(t);
      setPopular(p.results);
      setTopRated(tr.results);
      setUpcoming(u.results);
      setNowPlaying(np.results);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="px-4 md:px-8 pt-6">
        <HeroSlider movies={trending} />
      </div>

      <div className="px-4 md:px-8 space-y-8 md:space-y-10">
        <MovieRow title="🔥 Em Alta" movies={trending} loading={loading} />
        <MovieRow title="🎬 Em Cartaz" movies={nowPlaying} loading={loading} />
        <MovieRow title="⭐ Mais Bem Avaliados" movies={topRated} loading={loading} />
        <MovieRow title="📅 Próximos Lançamentos" movies={upcoming} loading={loading} />
        <MovieRow title="🎥 Populares" movies={popular} loading={loading} />
      </div>
    </div>
  );
}