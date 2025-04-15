"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Film, Tv, BookOpen, Music, Video, Radio, Search, TrendingUp, Star, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle, 
  AnimeCard, 
  AnimeButton 
} from "@/components/anime-theme";
import { cn } from "@/lib/utils";

// Define asset paths
const ASSET_PATH = '/Users/ss/Downloads/project/assets/home';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
    }
  },
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  },
};

// Define new glass effect styles
const glassStyle = "bg-background/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(138,43,226,0.15)] hover:shadow-[0_8px_40px_5px_rgba(138,43,226,0.25)] transition-all duration-300";
const gradientGlassStyle = "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-primary/30 before:via-background/0 before:to-secondary/30 before:-z-10 before:opacity-30 before:blur-[5px] hover:before:opacity-60 hover:before:blur-[2px] before:transition-all before:duration-300";

const categories = [
  { icon: Film, label: "Movies", href: "/movies" },
  { icon: Tv, label: "TV Shows", href: "/tv" },
  { icon: BookOpen, label: "Anime & Manga", href: "/anime" },
  { icon: Music, label: "Music", href: "/music" },
  { icon: Video, label: "Snipps", href: "/snipps" },
  { icon: Radio, label: "Podcasts", href: "/podcasts" },
];

const featuredContent = [
  {
    id: 1,
    title: "Oppenheimer",
    type: "movie",
    image: `https://lumiere-brugge.be/wp-content/uploads/2023/09/website-oppenheimer-35-mm-1-1024x659.png`,
    rating: "9.2",
    genre: "Drama",
    href: "/movies",
  },
  {
    id: 2,
    title: "Attack on Titan",
    type: "anime",
    image: `https://www.impericon.com/cdn/shop/articles/20241028_thelastattackmovie_1.jpg`,
    rating: "9.8",
    genre: "Action",
    href: "/anime",
  },
  {
    id: 3,
    title: "The Last of Us",
    type: "tv",
    image: `https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/1176/1741863661176-i`,
    rating: "9.5",
    genre: "Drama",
    href: "/tv",
  },
  {
    id: 4,
    title: "Starfield",
    type: "game",
    image: `https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24385460/starfield.png`,
    rating: "8.9",
    genre: "RPG",
    href: "/games",
  },
];

const trendingTopics = [
  { id: 1, title: "One Piece Live Action", category: "TV Shows", engagement: "128K", href: "/tv" },
  { id: 2, title: "Jujutsu Kaisen Season 2", category: "Anime", engagement: "98K", href: "/anime" },
  { id: 3, title: "Spider-Man 2 PS5", category: "Games", engagement: "87K", href: "/games" },
  { id: 4, title: "Dune: Part Two", category: "Movies", engagement: "76K", href: "/movies" },
];

// Add top rated movies data
const topRatedMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    image: "https://humanehollywood.org/app/uploads/2020/06/5KCVkau1HEl7ZzfPsKAPM0sMiKc-scaled.jpg",
    rating: "9.3",
    year: "1994",
    genre: "Drama"
  },
  {
    id: 2,
    title: "The Godfather",
    image: "https://static0.moviewebimages.com/wordpress/wp-content/uploads/sharedimages/2024/04/the-godfather-poster.jpeg",
    rating: "9.2",
    year: "1972",
    genre: "Crime"
  },
  {
    id: 3,
    title: "The Dark Knight",
    image: "https://m.media-amazon.com/images/S/pv-target-images/8753733ac616155963cc440c3cf5367f45d7685b672c5b9c35bc7f182aec17c4.jpg",
    rating: "9.0",
    year: "2008",
    genre: "Action"
  },
  {
    id: 4,
    title: "12 Angry Men",
    image: "https://m.media-amazon.com/images/I/71kyykgHxXL.jpg",
    rating: "9.0",
    year: "1957",
    genre: "Drama"
  },
  {
    id: 5,
    title: "Schindler's List",
    image: "https://images-cdn.ubuy.co.in/634f9a12ec3ec2031f564253-schindler-39-s-list-movie-art.jpg",
    rating: "9.0",
    year: "1993",
    genre: "Biography"
  },
  {
    id: 6,
    title: "Pulp Fiction",
    image: "https://m.media-amazon.com/images/S/pv-target-images/b44bc23c99db6f56a9cb656892524a617fda117921eb0d1a572ac8de74ef10ba.jpg",
    rating: "8.9",
    year: "1994",
    genre: "Crime"
  }
];

// Add recent movies data
const recentMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "8.8",
    year: "2024",
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "Poor Things",
    image: "https://m.media-amazon.com/images/M/MV5BYWU2MjRjZTYtMjVkMS00MTBjLWFiMTAtYmZlYTk1YjkyMWFkXkEyXkFqcGc@._V1_.jpg",
    rating: "8.4",
    year: "2023",
    genre: "Comedy"
  },
  {
    id: 3,
    title: "Anyone But You",
    image: "https://m.media-amazon.com/images/I/81SPdFx-eSL._AC_UF1000,1000_QL80_.jpg",
    rating: "7.5",
    year: "2024",
    genre: "Romance"
  },
  {
    id: 4,
    title: "Bob Marley: One Love",
    image: "https://m.media-amazon.com/images/M/MV5BYmYwODViNzUtZmZiNy00M2IwLWI4ZDEtMWMyOTc4ZjliZjI0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: "7.8",
    year: "2024",
    genre: "Biography"
  },
  {
    id: 5,
    title: "Madame Web",
    image: "https://m.media-amazon.com/images/I/91f0C18+wiL.jpg",
    rating: "7.2",
    year: "2024",
    genre: "Action"
  },
  {
    id: 6,
    title: "Drive-Away Dolls",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyZx0WILouo0coNYqeWdOQnHBF6Rvd99MeA&s",
    rating: "7.4",
    year: "2024",
    genre: "Comedy"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={withAnimeTheme("bg-background")}>
      <AnimeThemeStyles />
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          className="relative h-[500px] rounded-3xl overflow-hidden anime-section anime-gradient-border shadow-[0_10px_50px_-5px_rgba(138,43,226,0.2)] hover:shadow-[0_20px_80px_-5px_rgba(138,43,226,0.3)] transition-all duration-300"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 via-background/10 to-secondary/30 rounded-3xl blur-[3px] opacity-50 transition duration-500"></div>
          <img
            src={`https://www.usmagazine.com/wp-content/uploads/2020/08/Breaking-Bad-Where-Are-They-Now.jpg`}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
            <div className="h-full flex flex-col justify-end p-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-4 anime-title text-shadow-glow"
              >
                DISCOVER YOUR NEXT OBSESSION
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-6"
              >
                <AnimeGradientText>Connect with millions of fans</AnimeGradientText> across movies, TV shows, anime, games, and more
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="relative max-w-xl"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for your favorite entertainment..."
                  className="pl-12 py-6 text-lg rounded-full anime-input bg-background/30 backdrop-blur-md border-white/20 shadow-[0_0_15px_rgba(138,43,226,0.2)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.label} variants={itemFadeIn}>
                <Link href={category.href}>
                  <AnimeButton>
                <Button
                  variant="ghost"
                      className={cn(
                        "h-24 w-full flex-col gap-2 hover:scale-105 transition-transform duration-200 border-2",
                        category.label.toLowerCase().replace(/[& ]/g, "-"),
                        "bg-background/30 backdrop-blur-lg shadow-[0_4px_15px_0_rgba(138,43,226,0.1)] hover:shadow-[0_8px_25px_5px_rgba(138,43,226,0.2)] transition-all duration-200"
                      )}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.3 } }}
                >
                  <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className="font-bold">{category.label.toUpperCase()}</span>
                </Button>
                  </AnimeButton>
              </Link>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Featured Content */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.3 }}
          className={cn("anime-section p-4", glassStyle, "relative", gradientGlassStyle)}
        >
          <Tabs defaultValue="trending" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <AnimeTitle className="text-2xl">FEATURED</AnimeTitle>
              <TabsList className="bg-background/40 backdrop-blur-sm anime-border">
                <TabsTrigger value="trending" className="anime-button">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  TRENDING
                </TabsTrigger>
                <TabsTrigger value="top" className="anime-button">
                  <Star className="w-4 h-4 mr-2" />
                  TOP RATED
                </TabsTrigger>
                <TabsTrigger value="recent" className="anime-button">
                  <Clock className="w-4 h-4 mr-2" />
                  RECENT
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trending" className="space-y-6">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {featuredContent.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    variants={scaleUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Link href={item.href}>
                      <AnimeCard className="rounded-xl cursor-pointer">
                        <Card className="group overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 border-0 relative bg-background/30 backdrop-blur-sm before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-secondary/20 before:-z-10 before:opacity-30 hover:before:opacity-60 before:transition-all before:duration-200">
                      <div className="relative aspect-video">
                        <img
                          src={item.image}
                          alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="absolute bottom-0 p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                  <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className={cn("anime-badge px-2 py-1 text-sm", `genre-${item.type}`)}
                                  >
                                {item.genre}
                                  </motion.span>
                                  <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                    className="anime-rating rounded-full text-sm"
                                  >
                                ★ {item.rating}
                                  </motion.span>
                            </div>
                                <motion.h3 
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2, delay: 0.15 }}
                                  className="text-lg font-semibold"
                                >
                                  {item.title}
                                </motion.h3>
                          </div>
                        </div>
                      </div>
                    </Card>
                      </AnimeCard>
                  </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <ScrollArea className="h-[400px] rounded-xl border-2 anime-border p-4 bg-background/40 backdrop-blur-md shadow-[0_4px_18px_0_rgba(138,43,226,0.2)] hover:shadow-[0_8px_28px_2px_rgba(138,43,226,0.3)] transition-all duration-200">
                <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <motion.div 
                        key={topic.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link href={topic.href}>
                          <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer hover:scale-[1.01] transition-transform duration-200 anime-card border-0 relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-secondary/20 before:-z-10 before:opacity-30 hover:before:opacity-60 before:transition-all before:duration-200">
                        <div className="flex items-center justify-between">
                          <div>
                                <h3 className="font-bold">{topic.title.toUpperCase()}</h3>
                            <p className="text-sm text-muted-foreground">{topic.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                                <motion.div 
                                  animate={{ y: [0, -2, 0] }} 
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                            <TrendingUp className="w-4 h-4 text-primary" />
                                </motion.div>
                                <span className="text-sm text-muted-foreground anime-badge bg-primary/10 px-2 py-1">{topic.engagement}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                      </motion.div>
                  ))}
                </div>
              </ScrollArea>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Remove Continue Watching section and add Top Rated Movies */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.3 }}
          className={cn("anime-section p-4", glassStyle, "relative", gradientGlassStyle)}
        >
          <div className="flex items-center justify-between mb-6">
            <AnimeTitle className="text-2xl">TOP RATED MOVIES</AnimeTitle>
            <Link href="/movies">
              <Button variant="ghost" className="anime-button">
                View All
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {topRatedMovies.map((movie) => (
              <motion.div 
                key={movie.id} 
                variants={itemFadeIn}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              >
                <Link href="/movies">
                  <Card className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 relative bg-background/40 backdrop-blur-sm before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-primary/30 before:via-transparent before:to-secondary/30 before:-z-10 before:opacity-40 hover:before:opacity-60 before:transition-all before:duration-200">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{movie.rating}</span>
                          </div>
                          <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Recent Movies */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          transition={{ duration: 0.3 }}
          className={cn("anime-section p-4", glassStyle, "relative", gradientGlassStyle)}
        >
          <div className="flex items-center justify-between mb-6">
            <AnimeTitle className="text-2xl">RECENT MOVIES</AnimeTitle>
            <Link href="/movies">
              <Button variant="ghost" className="anime-button">
                View All
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {recentMovies.map((movie) => (
              <motion.div 
                key={movie.id} 
                variants={itemFadeIn}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              >
                <Link href="/movies">
                  <Card className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 relative bg-background/40 backdrop-blur-sm before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-br before:from-primary/30 before:via-transparent before:to-secondary/30 before:-z-10 before:opacity-40 hover:before:opacity-60 before:transition-all before:duration-200">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{movie.rating}</span>
                          </div>
                          <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}