import React from "react";

export default function GenreChips({ genres, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-colors ${
          !selected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Todos
      </button>
      {genres?.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-colors whitespace-nowrap ${
            selected === genre.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}