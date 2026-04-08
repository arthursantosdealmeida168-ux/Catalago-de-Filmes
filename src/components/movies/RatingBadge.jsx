import React from "react";
import { Star } from "lucide-react";

export default function RatingBadge({ rating, size = "sm" }) {
  const displayRating = rating ? rating.toFixed(1) : "N/A";
  const isSmall = size === "sm";

  return (
    <div className={`flex items-center gap-1 bg-accent/90 backdrop-blur-sm text-accent-foreground rounded-full font-inter font-bold ${isSmall ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}`}>
      <Star className={`fill-current ${isSmall ? "w-3 h-3" : "w-4 h-4"}`} />
      {displayRating}
    </div>
  );
}