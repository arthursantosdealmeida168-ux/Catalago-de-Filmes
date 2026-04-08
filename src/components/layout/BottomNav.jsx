import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, Clapperboard } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/explore", icon: Clapperboard, label: "Explorar" },
  { path: "/search", icon: Search, label: "Buscar" },
  { path: "/favorites", icon: Heart, label: "Favoritos" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-screen-xl mx-auto flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "fill-primary/20" : ""}`} />
              <span className="text-[10px] font-inter font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}