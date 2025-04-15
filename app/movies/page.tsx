"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Filter,
  Star,
  Globe,
  PlayCircle,
  Plus,
  Info,
  Search,
  X,
} from "lucide-react";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  cardAnimation,
  listItemAnimation,
  hoverScale,
  progressAnimation
} from "@/components/animation-variants";
import LoadingAnimation from "@/components/LoadingAnimation";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle, 
  AnimeCard, 
  AnimeButton 
} from "@/components/anime-theme";
import { cn } from "@/lib/utils";

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "Horror",
  "Mystery", "Romance", "Sci-Fi", "Thriller"
];

const placeholderSearches = [
  "Inception",
  "The Dark Knight",
  "Pulp Fiction",
  "The Godfather",
  "Interstellar",
  "The Matrix",
  "Forrest Gump",
  "The Shawshank Redemption",
];

const movies = [
  {
    id: 1,
    title: "Oppenheimer",
    poster: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "9.2",
    year: 2023,
    genre: "Drama",
  },
  {
    id: 2,
    title: "The Godfather",
    poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "9.5",
    year: 1972,
    genre: "Crime",
  },
  {
    id: 3,
    title: "Inception",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/cc72ff2193c0f7a85322aee988d6fe1ae2cd9f8800b6ff6e8462790fe2aacaf3.jpg",
    rating: "8.8",
    year: 2010,
    genre: "Sci-Fi",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/b44bc23c99db6f56a9cb656892524a617fda117921eb0d1a572ac8de74ef10ba.jpg",
    rating: "9.0",
    year: 1994,
    genre: "Crime",
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/8753733ac616155963cc440c3cf5367f45d7685b672c5b9c35bc7f182aec17c4.jpg",
    rating: "9.3",
    year: 2008,
    genre: "Action",
  },
  {
    id: 6,
    title: "Interstellar",
    poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    rating: "8.9",
    year: 2014,
    genre: "Sci-Fi",
  },
  {
    id: 7,
    title: "The Matrix",
    poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.8",
    year: 1999,
    genre: "Sci-Fi",
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlQdY9BWbSLHDL0V9ZjMsnpVIekandfqHmOw&s",
    rating: "9.6",
    year: 1994,
    genre: "Drama",
  },
  {
    id: 9,
    title: "Forrest Gump",
    poster: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.8",
    year: 1994,
    genre: "Drama",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Return of the King",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/cf28bbd7fed8541b67dadc3b29b82440829e72a6c2213788d649078bfa104b4d.jpg",
    rating: "9.4",
    year: 2003,
    genre: "Fantasy",
  },
  {
    id: 11,
    title: "Goodfellas",
    poster: "https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.9",
    year: 1990,
    genre: "Crime",
  },
  {
    id: 12,
    title: "Fight Club",
    poster: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.8",
    year: 1999,
    genre: "Drama",
  },
  {
    id: 13,
    title: "Parasite",
    poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
    rating: "8.9",
    year: 2019,
    genre: "Thriller",
  },
  {
    id: 14,
    title: "The Silence of the Lambs",
    poster: "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_.jpg",
    rating: "8.6",
    year: 1991,
    genre: "Thriller",
  },
  {
    id: 15,
    title: "Schindler's List",
    poster: "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "9.3",
    year: 1993,
    genre: "Drama",
  },
  {
    id: 16,
    title: "Avatar",
    poster: "https://m.media-amazon.com/images/I/71LRjSVXCGL._AC_UF1000,1000_QL80_.jpg",
    rating: "7.9",
    year: 2009,
    genre: "Sci-Fi",
  },
  {
    id: 17,
    title: "Joker",
    poster: "https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.4",
    year: 2019,
    genre: "Drama",
  },
  {
    id: 18,
    title: "Spirited Away",
    poster: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.8",
    year: 2001,
    genre: "Animation",
  },
  {
    id: 19,
    title: "The Prestige",
    poster: "https://c8.alamy.com/comp/BKN0X8/the-prestige-2006-poster-BKN0X8.jpg",
    rating: "8.5",
    year: 2006,
    genre: "Mystery",
  },
  {
    id: 20,
    title: "Dune",
    poster: "https://media.assettype.com/TNIE%2Fimport%2Fuploads%2Fuser%2Fckeditor_images%2Farticle%2F2021%2F10%2F22%2Fstaeth.jpg",
    rating: "8.7",
    year: 2021,
    genre: "Sci-Fi",
  },
];

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Rotate through placeholder searches
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderSearches.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Filter movies based on selected genres and search query
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
    const matchesSearch =
      searchQuery === "" ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className={withAnimeTheme("min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95")}>
      <AnimeThemeStyles />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <AnimeTitle className="text-4xl">MOVIES</AnimeTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search for ${placeholderSearches[placeholderIndex]}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full anime-input rounded-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 anime-button rounded-full hover:bg-primary/10"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <AnimeButton>
            <Button
              variant={showFilters ? "default" : "outline"}
              className="anime-border"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Filters</span>
            </Button>
          </AnimeButton>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 overflow-hidden anime-section p-4 bg-background/50 backdrop-blur-sm"
        >
          <h3 className="font-bold text-lg mb-4 anime-subtitle">GENRES</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <AnimeButton key={genre}>
                <Button
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGenreToggle(genre)}
                  className={cn(
                    "rounded-full text-xs",
                    selectedGenres.includes(genre) && "pulse-border"
                  )}
                >
                  {genre}
                </Button>
              </AnimeButton>
            ))}
          </div>
          {selectedGenres.length > 0 && (
            <div className="mt-4 flex justify-end">
              <AnimeButton>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGenres([])}
                >
                  Clear Filters
                </Button>
              </AnimeButton>
            </div>
          )}
        </motion.div>
      )}

      {/* Movie Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        {filteredMovies.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-muted-foreground"
            >
              No movies match your search criteria.
            </motion.p>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              variants={cardAnimation}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <AnimeCard className="h-full cursor-pointer">
                <div className="relative group h-full">
                  <div className="aspect-[2/3] overflow-hidden rounded-xl">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <span className="anime-rating inline-block">
                      <Star className="w-3 h-3 inline mr-0.5" />
                      {movie.rating}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full anime-badge">
                        {movie.genre}
                      </span>
                      <span className="text-xs">{movie.year}</span>
                    </div>
                    <h3 className="font-bold truncate">{movie.title}</h3>
                    
                    <div className="flex justify-between gap-2 mt-3">
                      <AnimeButton className="flex-1">
                        <Button size="sm" className="w-full">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                      </AnimeButton>
                      <AnimeButton>
                        <Button size="icon" variant="outline" className="aspect-square">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </AnimeButton>
                      <AnimeButton>
                        <Button size="icon" variant="outline" className="aspect-square">
                          <Info className="w-4 h-4" />
                        </Button>
                      </AnimeButton>
                    </div>
                  </div>
                </div>
              </AnimeCard>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}