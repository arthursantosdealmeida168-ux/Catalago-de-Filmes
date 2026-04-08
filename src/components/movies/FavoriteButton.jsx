import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";

export default function FavoriteButton({ movie, size = "sm" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(movie.id);
  const isSmall = size === "sm";

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(movie);
      }}
      className={`rounded-full backdrop-blur-sm transition-colors ${isSmall ? "p-1.5" : "p-2.5"} ${
        active
          ? "bg-red-500/90 text-white"
          : "bg-background/60 text-foreground hover:bg-background/80"
      }`}
    >
      <Heart className={`${isSmall ? "w-4 h-4" : "w-5 h-5"} ${active ? "fill-current" : ""}`} />
    </motion.button>
  );
}