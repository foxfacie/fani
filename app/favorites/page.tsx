"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Grid2x2,
  LayoutGrid,
  List,
  Filter,
  SortAsc,
  Share2,
  Play,
  Book,
  Film,
  Music,
  Gamepad2,
  Radio,
  Plus,
  MoreVertical,
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

const mediaTypes = [
  { id: "all", label: "All", icon: Grid2x2 },
  { id: "movies", label: "Movies", icon: Film },
  { id: "shows", label: "TV Shows", icon: Play },
  { id: "anime", label: "Anime", icon: Book },
  { id: "music", label: "Music", icon: Music },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "podcasts", label: "Podcasts", icon: Radio },
];

const sortOptions = [
  { id: "recent", label: "Recently Added" },
  { id: "name", label: "Name" },
  { id: "rating", label: "Rating" },
  { id: "type", label: "Media Type" },
];

const favorites = [
  {
    id: 1,
    title: "Inception",
    type: "movies",
    cover: "https://m.media-amazon.com/images/S/pv-target-images/cc72ff2193c0f7a85322aee988d6fe1ae2cd9f8800b6ff6e8462790fe2aacaf3.jpg",
    rating: "9.5",
    dateAdded: "2024-03-15",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "shows",
    cover: "https://images.justwatch.com/poster/306097794/s718/breaking-bad.jpg",
    rating: "9.8",
    dateAdded: "2024-03-14",
  },
  {
    id: 3,
    title: "Attack on Titan",
    type: "anime",
    cover: "https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_.jpg",
    rating: "9.4",
    dateAdded: "2024-03-13",
  },
  {
    id: 4,
    title: "The Dark Side of the Moon",
    type: "music",
    cover: "https://i.ytimg.com/vi/k9ynZnEBtvw/sddefault.jpg",
    rating: "10.0",
    dateAdded: "2024-03-12",
  },
  {
    id: 5,
    title: "The Last of Us",
    type: "games",
    cover: "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png",
    rating: "9.6",
    dateAdded: "2024-03-11",
  },
  {
    id: 6,
    title: "Tech Talk Daily",
    type: "podcasts",
    cover: "https://i.iheart.com/v3/url/aHR0cHM6Ly9zdGF0aWMubGlic3luLmNvbS9wL2Fzc2V0cy82L2EvZS83LzZhZTc0MGQ1NjRkZWUzZWJkOTU5YWZhMmExYmYxYzg3L1RoZV9UZWNoX1RhbGtzX0RhaWx5X1BvZGNhc3RfTmVpbF9IdWdoZXMucG5n?ops=contain(1200,630)",
    rating: "8.9",
    dateAdded: "2024-03-10",
  },
];

export default function FavoritesPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredFavorites = favorites
    .filter(
      (item) =>
        (selectedType === "all" || item.type === selectedType) &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <motion.div 
      className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Header */}
      <motion.div className="mb-8" variants={fadeInUp}>
        <motion.h1 
          className="text-4xl font-bold mb-6"
          variants={fadeInUp}
        >
          Favorites
        </motion.h1>
        
        {/* Search and View Controls */}
        <motion.div 
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          variants={fadeInUp}
        >
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <motion.div 
            className="flex items-center gap-2"
            variants={staggerContainer}
          >
            <motion.div variants={listItemAnimation} whileHover={{ scale: 1.1 }}>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div variants={listItemAnimation} whileHover={{ scale: 1.1 }}>
              <Button
                variant={viewMode === "compact" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("compact")}
              >
                <List className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.select
              className="bg-card border rounded-md px-3 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              variants={listItemAnimation}
              whileHover={{ scale: 1.05 }}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </motion.div>

        {/* Media Type Filters */}
        <ScrollArea className="w-full mt-4">
          <motion.div 
            className="flex space-x-2 pb-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {mediaTypes.map((type) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  variants={listItemAnimation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedType === type.id ? "default" : "outline"}
                    onClick={() => setSelectedType(type.id)}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </ScrollArea>
      </motion.div>

      {/* Favorites Grid/List */}
      <motion.div 
        className={viewMode === "grid" 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          : "space-y-2"
        }
        variants={staggerContainer}
      >
        {filteredFavorites.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardAnimation}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              y: -5, 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <Card
              className={`group relative overflow-hidden transition-all duration-300 ${
                viewMode === "grid" ? "" : "flex items-center p-2"
              }`}
            >
              {viewMode === "grid" ? (
                // Grid View
                <div className="aspect-[2/3]">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 p-4 w-full">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          {mediaTypes.find((t) => t.id === item.type)?.label}
                        </span>
                        <span className="text-sm">★ {item.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Play</Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Compact List View
                <>
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 px-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mediaTypes.find((t) => t.id === item.type)?.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">★ {item.rating}</span>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        ))}

        {/* Add to Favorites Card */}
        <motion.div
          className={`group hover:bg-muted/50 transition-colors cursor-pointer ${
            viewMode === "grid" ? "aspect-[2/3] flex items-center justify-center" : "p-4"
          }`}
          variants={cardAnimation}
        >
          <div className="text-center">
            <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold">Add to Favorites</h3>
            <p className="text-sm text-muted-foreground">Browse content</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}