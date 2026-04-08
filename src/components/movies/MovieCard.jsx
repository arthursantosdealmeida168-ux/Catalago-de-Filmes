import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import RatingBadge from "./RatingBadge";
import FavoriteButton from "./FavoriteButton";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

export default function MovieCard({ movie, index = 0 }) {
  const posterUrl = getImageUrl(movie.poster_path, "w342");
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/movie/${movie.id}`} className="group block">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-secondary">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Film className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2">
            <RatingBadge rating={movie.vote_average} />
          </div>
          <div className="absolute top-2 right-2">
            <FavoriteButton movie={movie} />
          </div>
        </div>
        <div className="mt-2.5 px-0.5">
          <h3 className="font-inter font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          {year && <p className="text-xs text-muted-foreground font-inter mt-0.5">{year}</p>}
        </div>
      </Link>
    </motion.div>
  );
}