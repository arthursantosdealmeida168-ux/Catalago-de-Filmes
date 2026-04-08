import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb";
import RatingBadge from "@/components/movies/RatingBadge";
import FavoriteButton from "@/components/movies/FavoriteButton";
import MovieRow from "@/components/movies/MovieRow";
import { ArrowLeft, Clock, Calendar, Globe, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!movie) return null;

  const backdrop = getBackdropUrl(movie.backdrop_path);
  const poster = getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
  const hours = Math.floor((movie.runtime || 0) / 60);
  const mins = (movie.runtime || 0) % 60;
  const directors = movie.credits?.crew?.filter((c) => c.job === "Director") || [];
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const similar = movie.similar?.results?.slice(0, 12) || [];

  return (
    <div className="min-h-screen">
      
      <div className="relative h-[40vh] md:h-[50vh]">
        {backdrop && (
          <img src={backdrop} alt={movie.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <Link
          to="/"
          className="absolute top-4 left-4 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/70 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      
      <div className="px-4 md:px-8 -mt-32 relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-6"
        >
          
          <div className="flex-shrink-0 w-40 md:w-56">
            {poster ? (
              <img
                src={poster}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] rounded-xl bg-secondary" />
            )}
          </div>

          
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-muted-foreground font-inter italic mt-1">{movie.tagline}</p>
                )}
              </div>
              <FavoriteButton movie={movie} size="md" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge rating={movie.vote_average} size="md" />
              {year && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground font-inter">
                  <Calendar className="w-3.5 h-3.5" /> {year}
                </span>
              )}
              {movie.runtime > 0 && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground font-inter">
                  <Clock className="w-3.5 h-3.5" /> {hours}h {mins}min
                </span>
              )}
              {movie.original_language && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground font-inter">
                  <Globe className="w-3.5 h-3.5" /> {movie.original_language.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <Badge key={g.id} variant="secondary" className="font-inter rounded-full">
                  {g.name}
                </Badge>
              ))}
            </div>

            {directors.length > 0 && (
              <p className="text-sm font-inter">
                <span className="text-muted-foreground">Direção: </span>
                <span className="text-foreground font-medium">
                  {directors.map((d) => d.name).join(", ")}
                </span>
              </p>
            )}

            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Sinopse</h3>
              <p className="text-sm text-secondary-foreground/80 font-inter leading-relaxed">
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </motion.div>

        
        {cast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Elenco</h3>
            <div
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {cast.map((person) => (
                <div key={person.id} className="flex-shrink-0 w-24 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto bg-secondary">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, "w185")}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg font-bold">
                        {person.name[0]}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-inter font-medium text-foreground mt-2 truncate">
                    {person.name}
                  </p>
                  <p className="text-[10px] font-inter text-muted-foreground truncate">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        
        {similar.length > 0 && (
          <div className="mt-10 pb-8">
            <MovieRow title="Filmes Similares" movies={similar} loading={false} />
          </div>
        )}
      </div>
    </div>
  );
}