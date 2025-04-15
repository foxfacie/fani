"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Play,
  Star,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Info,
  Bookmark,
  TrendingUp,
  Heart,
  Tv2,
  Search,
  Filter,
  ChevronDown,
  Share2,
  Eye,
  BarChart3,
  ArrowUpRight,
  Award,
  Download,
  ListPlus
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

// Glass effect styles
const glassStyle = "bg-background/30 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(138,43,226,0.25)] hover:shadow-[0_8px_40px_5px_rgba(138,43,226,0.35)] transition-all duration-300";
const gradientGlassStyle = "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-primary/50 before:via-background/0 before:to-secondary/50 before:-z-10 before:opacity-50 before:blur-[5px] hover:before:opacity-100 hover:before:blur-[2px] before:transition-all before:duration-300";

const shows = [
  {
    id: 1,
    title: "Breaking Bad",
    poster: "https://m.media-amazon.com/images/M/MV5BMTJiMzgwZTktYzZhZC00YzhhLWEzZDUtMGM2NTE4MzQ4NGFmXkEyXkFqcGdeQWpybA@@._V1_.jpg",
    backdrop: "https://i.imgur.com/2DP3mPS.jpg",
    rating: "9.5",
    progress: 75,
    airingNext: "2 days",
    seasons: 5,
    episodes: 62,
    genres: ["Drama", "Thriller"],
    year: 2008,
    channel: "AMC",
    nextEpisode: "S5:E8 - 'Gliding Over All'"
  },
  {
    id: 2,
    title: "Stranger Things",
    poster: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQRqH7ogwUemf3k4qrfGLG385vAIzZk2FIvl1YMbSj71WovqswVXXEzgBPA2iKen3KFZbbYOVyvcKl4LD5yin_6kdDuiuMAP6x3aKNYmholsJo1bwjT_Fe32kMzfV7IDYWv2p8CxlAd7mF4lXNylqXgc9sQM.jpg",
    backdrop: "https://i.imgur.com/HrwJnMC.jpg",
    rating: "8.8",
    progress: 90,
    airingNext: "Coming 2024",
    seasons: 4,
    episodes: 34,
    genres: ["Sci-Fi", "Horror"],
    year: 2016,
    channel: "Netflix",
    nextEpisode: "S4:E9 - 'The Piggyback'"
  },
  {
    id: 3,
    title: "The Last of Us",
    poster: "https://m.media-amazon.com/images/M/MV5BYWI3ODJlMzktY2U5NC00ZjdlLWE1MGItNWQxZDk3NWNjN2RhXkEyXkFqcGc@._V1_.jpg",
    backdrop: "https://i.imgur.com/OzVBCd3.jpg",
    rating: "9.2",
    progress: 100,
    airingNext: "Season Completed",
    seasons: 1,
    episodes: 9,
    genres: ["Action", "Drama"],
    year: 2023,
    channel: "HBO",
    nextEpisode: "S2:E1 - Coming Soon"
  },
  {
    id: 4,
    title: "Game of Thrones",
    poster: "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://i.imgur.com/cVa6yzE.jpg",
    rating: "9.3",
    progress: 65,
    airingNext: "Completed",
    seasons: 8,
    episodes: 73,
    genres: ["Fantasy", "Drama"],
    year: 2011,
    channel: "HBO",
    nextEpisode: "S7:E5 - 'Eastwatch'"
  },
];

const upcomingShows = [
  {
    id: 1,
    title: "House of the Dragon",
    season: "Season 2",
    poster: "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "14 days",
    network: "HBO",
    year: 2024,
    genres: ["Fantasy", "Drama"],
  },
  {
    id: 2,
    title: "The Boys",
    season: "Season 4",
    poster: "https://m.media-amazon.com/images/M/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "21 days",
    network: "Amazon",
    year: 2024,
    genres: ["Action", "Comedy"],
  },
  {
    id: 3,
    title: "The Witcher",
    season: "Season 4",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ5MDU5MTktMDZkMy00NDU1LWIxM2UtODg5OGFiNmRhNDBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "28 days",
    network: "Netflix",
    year: 2024,
    genres: ["Fantasy", "Action"],
  },
  {
    id: 4,
    title: "Bridgerton",
    season: "Season 3",
    poster: "https://m.media-amazon.com/images/M/MV5BZmRjNDNlMDMtNDZlMS00NzE4LTk0OGMtYjQyMWY3YWFmY2I5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "35 days",
    network: "Netflix",
    year: 2024,
    genres: ["Drama", "Romance"],
  },
  {
    id: 5,
    title: "Wednesday",
    season: "Season 2",
    poster: "https://m.media-amazon.com/images/M/MV5BY2E1NDI5OWEtODJmYi00Nzg2LWI4MjUtODFiMTU2YWViOTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "42 days",
    network: "Netflix",
    year: 2024,
    genres: ["Mystery", "Comedy"],
  },
  {
    id: 6,
    title: "Squid Game",
    season: "Season 2",
    poster: "https://m.media-amazon.com/images/M/MV5BMDA0NDBkMzMtOWQ0Zi00NjE1LTkxNWYtYzI0MTE0NGJjZTQ1XkEyXkFqcGc@._V1_.jpg",
    releaseDate: "49 days",
    network: "Netflix",
    year: 2024,
    genres: ["Thriller", "Drama"],
  },
];

const topRatedShows = [
  {
    id: 1,
    title: "Breaking Bad",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7AUQ1ap545wJq1Op_9GPLFAV15boesLoyZA&s",
    rating: "9.5",
    year: 2008,
    genres: ["Drama", "Thriller"],
  },
  {
    id: 2,
    title: "Game of Thrones",
    poster: "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "9.3",
    year: 2011,
    genres: ["Fantasy", "Drama"],
  },
  {
    id: 3,
    title: "The Sopranos",
    poster: "https://m.media-amazon.com/images/M/MV5BMjRmMTNiMTQtMDg1ZS00MGM1LWE1MGUtYjEzMGFjNWUzOWRkXkEyXkFqcGc@._V1_.jpg",
    rating: "9.2",
    year: 1999,
    genres: ["Drama", "Crime"],
  },
  {
    id: 4,
    title: "The Wire",
    poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p184796_b_v8_ae.jpg",
    rating: "9.3",
    year: 2002,
    genres: ["Crime", "Drama"],
  },
];

const categories = [
  "Currently Airing",
  "Coming Soon",
  "Popular",
  "Top Rated",
  "New Releases",
];

export default function TVShowsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Currently Airing");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("watching");

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={withAnimeTheme("min-h-screen bg-gradient-to-br from-background via-background to-background/95")}>
      <AnimeThemeStyles />
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="relative h-[350px] rounded-3xl overflow-hidden anime-section anime-gradient-border shadow-[0_10px_50px_-5px_rgba(138,43,226,0.3)] hover:shadow-[0_20px_80px_-5px_rgba(138,43,226,0.5)] transition-all duration-700"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 via-background/10 to-secondary/50 rounded-3xl blur-[3px] opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <img
            src="https://cdn.mos.cms.futurecdn.net/B8jW6zY8qTSZ8btRXgWwZN.jpg"
            alt="TV Shows"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
            <div className="h-full flex flex-col justify-end p-8">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 anime-title text-shadow-glow"
              >
                TV SHOWS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-6"
              >
                <AnimeGradientText>Discover and track</AnimeGradientText> your favorite television series
              </motion.p>
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className={cn("relative w-full max-w-md rounded-xl overflow-hidden", glassStyle)}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for TV shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-0 pl-10 py-5 focus-visible:ring-1 focus-visible:ring-primary/50"
                  />
                </div>
                <AnimeButton>
                  <Button 
                    className={cn("flex items-center gap-2", glassStyle, "bg-background/50")}
                    variant="outline"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </AnimeButton>
              </motion.div>
            </div>
          </div>
        </motion.section>
      
        {/* Categories */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={cn("rounded-xl p-4", glassStyle, "relative", gradientGlassStyle)}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-background/20 backdrop-blur-sm p-1 rounded-lg w-full flex justify-between">
              <TabsTrigger value="all" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <ListPlus className="w-4 h-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger value="watching" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Watching
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="popular" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <TrendingUp className="w-4 h-4 mr-2" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="top" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Award className="w-4 h-4 mr-2" />
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="watchlist" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Bookmark className="w-4 h-4 mr-2" />
                Watchlist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-8">
              {/* Watching Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <AnimeTitle className="text-2xl">CONTINUE WATCHING</AnimeTitle>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="anime-button flex items-center gap-2">
                      See All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={staggerContainer}
                >
                  {shows.slice(0, 2).map((show, index) => (
                    <motion.div
                      key={show.id}
                      variants={cardAnimation}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                        <div className="flex h-[180px]">
                          <div className="w-[320px] relative overflow-hidden rounded-l-lg">
                            <img
                              src={show.poster}
                              alt={show.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 flex gap-1">
                              {show.genres.map(genre => (
                                <Badge key={genre} className="bg-primary/80 text-white text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="absolute top-3 right-3">
                              <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                                <Star className="w-3 h-3 fill-black text-black" />
                                {show.rating}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold">{show.title}</h3>
                                <span className="text-xs text-muted-foreground">{show.year}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                  <Tv2 className="w-3 h-3 mr-1" />
                                  {show.channel}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  S{show.seasons} • E{show.episodes}
                                </span>
                              </div>
                              
                              <p className="text-sm mb-3">Next: <span className="text-primary">{show.nextEpisode}</span></p>
                              
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span>Progress</span>
                                  <span className="font-medium">{show.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-background/50 rounded-full">
                                  <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${show.progress}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                              <AnimeButton>
                                <Button className="flex-1 bg-primary/80 hover:bg-primary">
                                  <Play className="w-4 h-4 mr-2" />
                                  Resume
                                </Button>
                              </AnimeButton>
                              <Button variant="outline" size="icon" className="bg-background/50">
                                <Info className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="bg-background/50">
                                <ListPlus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Upcoming Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <AnimeTitle className="text-2xl">COMING SOON</AnimeTitle>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="anime-button flex items-center gap-2">
                      See All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                  variants={staggerContainer}
                >
                  {upcomingShows.map((show) => (
                    <motion.div
                      key={show.id}
                      variants={cardAnimation}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <AnimeCard className="rounded-xl cursor-pointer">
                        <Card className="group relative overflow-hidden border-0">
                          <div className="aspect-[2/3]">
                            <img
                              src={show.poster}
                              alt={`${show.title} ${show.season}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute bottom-0 p-4">
                                <h3 className="font-semibold mb-1">{show.title}</h3>
                                <p className="text-sm text-primary mb-2">{show.season}</p>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="text-sm">In {show.releaseDate}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                      {show.network}
                                    </Badge>
                                    <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                      {show.year}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {show.genres.map(genre => (
                                      <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                        {genre}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  <AnimeButton>
                                    <Button size="sm" className="w-full">
                                      <Plus className="w-3 h-3 mr-1" />
                                      Add to Watchlist
                                    </Button>
                                  </AnimeButton>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-primary text-white font-medium py-0">
                              <Clock className="w-3 h-3 mr-1" />
                              {show.releaseDate}
                            </Badge>
                          </div>
                        </Card>
                      </AnimeCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Popular Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <AnimeTitle className="text-2xl">POPULAR</AnimeTitle>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="anime-button flex items-center gap-2">
                      See All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={staggerContainer}
                >
                  {shows.map((show) => (
                    <motion.div
                      key={show.id}
                      variants={cardAnimation}
                      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                        <div className="relative aspect-[2/3]">
                          <img
                            src={show.poster}
                            alt={show.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                              <Star className="w-3 h-3 fill-black text-black" />
                              {show.rating}
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 p-3 w-full">
                              <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                              <div className="flex items-center gap-2 mt-1 mb-2">
                                <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                  {show.year}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {show.genres.map(genre => (
                                  <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch
                                </Button>
                                <Button size="sm" variant="outline" className="bg-background/50">
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Top Rated Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <AnimeTitle className="text-2xl">TOP RATED</AnimeTitle>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="anime-button flex items-center gap-2">
                      See All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={staggerContainer}
                >
                  {topRatedShows.map((show) => (
                    <motion.div
                      key={show.id}
                      variants={cardAnimation}
                      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                        <div className="relative aspect-[2/3]">
                          <img
                            src={show.poster}
                            alt={show.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-500 flex items-center justify-center rotate-0 animate-pulse">
                            <span className="text-black font-bold text-sm">{show.rating}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 p-3 w-full">
                              <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                              <div className="flex items-center gap-2 mt-1 mb-2">
                                <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                  {show.year}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {show.genres.map(genre => (
                                  <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch
                                </Button>
                                <Button size="sm" variant="outline" className="bg-background/50">
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Watchlist Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <AnimeTitle className="text-2xl">WATCHLIST</AnimeTitle>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="anime-button flex items-center gap-2">
                      See All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={staggerContainer}
                >
                  {shows.slice(0, 4).map((show) => (
                    <motion.div
                      key={show.id}
                      variants={cardAnimation}
                      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                        <div className="relative aspect-[2/3]">
                          <img
                            src={show.poster}
                            alt={show.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                              <Star className="w-3 h-3 fill-black text-black" />
                              {show.rating}
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 p-3 w-full">
                              <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                              <div className="flex items-center gap-2 mt-1 mb-2">
                                <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                  {show.year}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {show.genres.map(genre => (
                                  <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch
                                </Button>
                                <Button size="sm" variant="outline" className="bg-background/50">
                                  <Bookmark className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="watching" className="mt-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                {shows.slice(0, 2).map((show, index) => (
                  <motion.div
                    key={show.id}
                    variants={cardAnimation}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                      <div className="flex h-[180px]">
                        <div className="w-[320px] relative overflow-hidden rounded-l-lg">
                          <img
                            src={show.poster}
                            alt={show.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-1">
                            {show.genres.map(genre => (
                              <Badge key={genre} className="bg-primary/80 text-white text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                              <Star className="w-3 h-3 fill-black text-black" />
                              {show.rating}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-bold">{show.title}</h3>
                              <span className="text-xs text-muted-foreground">{show.year}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                <Tv2 className="w-3 h-3 mr-1" />
                                {show.channel}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                S{show.seasons} • E{show.episodes}
                              </span>
                            </div>
                            
                            <p className="text-sm mb-3">Next: <span className="text-primary">{show.nextEpisode}</span></p>
                            
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progress</span>
                                <span className="font-medium">{show.progress}%</span>
                              </div>
                              <div className="h-1.5 bg-background/50 rounded-full">
                                <motion.div
                                  className="h-full bg-primary rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${show.progress}%` }}
                                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <AnimeButton>
                              <Button className="flex-1 bg-primary/80 hover:bg-primary">
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                              </Button>
                            </AnimeButton>
                            <Button variant="outline" size="icon" className="bg-background/50">
                              <Info className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="bg-background/50">
                              <ListPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                variants={staggerContainer}
              >
                {upcomingShows.map((show) => (
                  <motion.div
                    key={show.id}
                    variants={cardAnimation}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <AnimeCard className="rounded-xl cursor-pointer">
                      <Card className="group relative overflow-hidden border-0">
                        <div className="aspect-[2/3]">
                          <img
                            src={show.poster}
                            alt={`${show.title} ${show.season}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 p-4">
                              <h3 className="font-semibold mb-1">{show.title}</h3>
                              <p className="text-sm text-primary mb-2">{show.season}</p>
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  <span className="text-sm">In {show.releaseDate}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                    {show.network}
                                  </Badge>
                                  <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                    {show.year}
                                  </Badge>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {show.genres.map(genre => (
                                    <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                      {genre}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <AnimeButton>
                                  <Button size="sm" className="w-full">
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add to Watchlist
                                  </Button>
                                </AnimeButton>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-primary text-white font-medium py-0">
                            <Clock className="w-3 h-3 mr-1" />
                            {show.releaseDate}
                          </Badge>
                        </div>
                      </Card>
                    </AnimeCard>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
              >
                {shows.map((show) => (
                  <motion.div
                    key={show.id}
                    variants={cardAnimation}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                      <div className="relative aspect-[2/3]">
                        <img
                          src={show.poster}
                          alt={show.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                            <Star className="w-3 h-3 fill-black text-black" />
                            {show.rating}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 p-3 w-full">
                            <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                            <div className="flex items-center gap-2 mt-1 mb-2">
                              <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                {show.year}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {show.genres.map(genre => (
                                <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                <Play className="w-3 h-3 mr-1" />
                                Watch
                              </Button>
                              <Button size="sm" variant="outline" className="bg-background/50">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="top" className="mt-6">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
              >
                {topRatedShows.map((show) => (
                  <motion.div
                    key={show.id}
                    variants={cardAnimation}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                      <div className="relative aspect-[2/3]">
                        <img
                          src={show.poster}
                          alt={show.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-500 flex items-center justify-center rotate-0 animate-pulse">
                          <span className="text-black font-bold text-sm">{show.rating}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 p-3 w-full">
                            <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                            <div className="flex items-center gap-2 mt-1 mb-2">
                              <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                {show.year}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {show.genres.map(genre => (
                                <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                <Play className="w-3 h-3 mr-1" />
                                Watch
                              </Button>
                              <Button size="sm" variant="outline" className="bg-background/50">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="watchlist" className="mt-6">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
              >
                {shows.slice(0, 4).map((show) => (
                  <motion.div
                    key={show.id}
                    variants={cardAnimation}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <Card className={cn("overflow-hidden border-0", "relative", "bg-background/40 backdrop-blur-sm")}>
                      <div className="relative aspect-[2/3]">
                        <img
                          src={show.poster}
                          alt={show.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="flex items-center gap-0.5 bg-yellow-500/90 text-black rounded px-1.5 py-0.5 text-xs font-bold">
                            <Star className="w-3 h-3 fill-black text-black" />
                            {show.rating}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 p-3 w-full">
                            <h3 className="font-semibold line-clamp-1">{show.title}</h3>
                            <div className="flex items-center gap-2 mt-1 mb-2">
                              <Badge variant="outline" className="bg-background/50 text-xs py-0">
                                {show.year}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {show.genres.map(genre => (
                                <Badge key={genre} className="bg-primary/20 text-primary text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" className="flex-1 bg-primary/80 hover:bg-primary">
                                <Play className="w-3 h-3 mr-1" />
                                Watch
                              </Button>
                              <Button size="sm" variant="outline" className="bg-background/50">
                                <Bookmark className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>
      </div>
    </div>
  );
}