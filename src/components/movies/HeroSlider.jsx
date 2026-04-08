import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBackdropUrl } from "@/lib/tmdb";
import RatingBadge from "./RatingBadge";
import FavoriteButton from "./FavoriteButton";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const featured = movies?.slice(0, 5) || [];

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const movie = featured[current];
  const backdrop = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {backdrop && (
            <img
              src={backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end md:items-center p-6 md:p-12">
        <motion.div
          key={movie.id + "-content"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-lg space-y-4"
        >
          <div className="flex items-center gap-3">
            <RatingBadge rating={movie.vote_average} size="md" />
            <span className="text-sm text-muted-foreground font-inter">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {movie.title}
          </h1>
          <p className="text-sm md:text-base text-secondary-foreground/80 font-inter line-clamp-2 md:line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link to={`/movie/${movie.id}`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold gap-2 rounded-full px-6">
                <Info className="w-4 h-4" />
                Ver Detalhes
              </Button>
            </Link>
            <FavoriteButton movie={movie} size="md" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-3 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrent((prev) => (prev - 1 + featured.length) % featured.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/60 transition-colors hidden md:block"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % featured.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/60 transition-colors hidden md:block"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}