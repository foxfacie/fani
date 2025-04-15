"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Plus,
  MoreHorizontal,
  Search,
  Library,
  ListMusic,
  Music2,
  Star,
  Calendar,
  Clock,
  ChevronRight,
  Disc,
  BarChart4,
} from "lucide-react";
import {
  staggerContainer,
  fadeIn,
  cardAnimation,
  listItemAnimation,
  hoverScale,
  progressAnimation,
  fadeInUp
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

// Define asset paths
const MUSIC_ASSET_PATH = "/assets/music";

const playlists = [
  {
    id: 1,
    title: "Favorite Tracks",
    cover: `${MUSIC_ASSET_PATH}/playlists/favorite-tracks.jpg`,
    trackCount: 45,
  },
  {
    id: 2,
    title: "Chill Vibes",
    cover: `${MUSIC_ASSET_PATH}/playlists/chill-vibes.jpg`,
    trackCount: 32,
  },
  {
    id: 3,
    title: "Workout Mix",
    cover: `${MUSIC_ASSET_PATH}/playlists/workout-mix.jpg`,
    trackCount: 28,
  },
];

const recentlyPlayed = [
  {
    id: 1,
    title: "After Hours",
    artist: "The Weeknd",
    cover: `https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36`,
    rating: "9.4",
    progress: 75,
    duration: "3:20",
    currentTime: "2:30",
    album: "After Hours",
    releaseYear: "2020",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MSSqplWCVZuaYY6x4j_sY5NgRgX_ZhYB5Q&s`,
    rating: "9.6",
    progress: 90,
    duration: "3:22",
    currentTime: "3:05",
    album: "After Hours",
    releaseYear: "2020",
  },
  {
    id: 3,
    title: "As It Was",
    artist: "Harry Styles",
    cover: `https://i.scdn.co/image/ab67616d00001e02b46f74097655d7f353caab14`,
    rating: "9.2",
    progress: 60,
    duration: "2:47",
    currentTime: "1:40",
    album: "Harry's House",
    releaseYear: "2022",
  },
];

const newReleases = [
  {
    id: 4,
    title: "Renaissance",
    artist: "Beyoncé",
    cover: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSg_or6WvpLCpKO0c1BrnM9_X4nKFeEmtWTA&s`,
    rating: "9.3",
    releaseDate: "New",
    type: "Album",
  },
  {
    id: 5,
    title: "Midnights",
    artist: "Taylor Swift",
    cover: `https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0`,
    rating: "9.1",
    releaseDate: "2 days ago",
    type: "Album",
  },
  {
    id: 6,
    title: "Dawn FM",
    artist: "The Weeknd",
    cover: `https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d`,
    rating: "8.8",
    releaseDate: "5 days ago",
    type: "Album",
  },
  {
    id: 7,
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    cover: `https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72`,
    rating: "9.0",
    releaseDate: "1 week ago",
    type: "Album",
  },
  {
    id: 8,
    title: "Special",
    artist: "Lizzo",
    cover: `https://c.saavncdn.com/015/Special-English-2023-20230404021420-500x500.jpg`,
    rating: "8.7",
    releaseDate: "2 weeks ago",
    type: "Album",
  },
  {
    id: 9,
    title: "Honestly, Nevermind",
    artist: "Drake",
    cover: `https://i.scdn.co/image/ab67616d0000b2738dc0d801766a5aa6a33cbe37`,
    rating: "8.5",
    releaseDate: "3 weeks ago",
    type: "Album",
  },
];

const topArtists = [
  {
    id: 10,
    name: "The Weeknd",
    cover: `https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae`,
    genre: "R&B/Pop",
    popularity: "98%",
  },
  {
    id: 11,
    name: "Taylor Swift",
    cover: `https://m.media-amazon.com/images/M/MV5BYWYwYzYzMjUtNWE0MS00NmJlLTljNGMtNzliYjg5NzQ1OWY5XkEyXkFqcGc@._V1_.jpg`,
    genre: "Pop",
    popularity: "97%",
  },
  {
    id: 12,
    name: "Bad Bunny",
    cover: `https://ntvb.tmsimg.com/assets/assets/1039037_v9_bf.jpg`,
    genre: "Latin",
    popularity: "96%",
  },
  {
    id: 13,
    name: "Harry Styles",
    cover: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo5NeD2a2N9SkFpGTAflQbq8fMOLXb9wGj-g&s`,
    genre: "Pop/Rock",
    popularity: "95%",
  },
];

const categories = ["Popular", "New Releases", "Trending", "Recommended"];

export default function MusicPage() {
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(recentlyPlayed[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(currentTrack.progress);
  const [totalDuration, setTotalDuration] = useState(215); // 3:35 in seconds
  const [contentType, setContentType] = useState<"songs" | "playlists">("songs");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={withAnimeTheme("p-6 bg-background")}>
      <AnimeThemeStyles />
      
      {/* Header with Toggle */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <AnimeTitle className="text-4xl">
            {contentType === "songs" ? "MUSIC" : "PLAYLISTS"}
          </AnimeTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-bold">PLAYLISTS</span>
            <Switch
              checked={contentType === "songs"}
              onCheckedChange={(checked) =>
                setContentType(checked ? "songs" : "playlists")
              }
              className="anime-border data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-muted-foreground font-bold">SONGS</span>
          </div>
        </div>

        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ScrollArea className="w-full max-w-2xl">
            <div className="flex space-x-2 pb-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AnimeButton>
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "whitespace-nowrap font-bold",
                        selectedCategory === category && "pulse-border"
                      )}
                    >
                      {category}
                    </Button>
                  </AnimeButton>
                </motion.div>
              ))}
              </div>
          </ScrollArea>
        </motion.div>
          </div>

        {/* Recently Played */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">
            RECENTLY PLAYED
          </AnimeTitle>
          <Button variant="ghost" size="sm" className="anime-button">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          {recentlyPlayed.map((track, index) => (
            <motion.div
                key={track.id}
              variants={cardAnimation}
              className="col-span-1"
              onClick={() => {
                setCurrentTrack(track);
                setProgress(parseInt(track.currentTime.split(':')[0]) * 60 + parseInt(track.currentTime.split(':')[1]));
                setTotalDuration(parseInt(track.duration.split(':')[0]) * 60 + parseInt(track.duration.split(':')[1]));
                setIsPlaying(true);
              }}
            >
              <AnimeCard className="rounded-xl h-full cursor-pointer">
                <div className="relative h-full overflow-hidden">
                  <div className="relative aspect-video">
                <img
                  src={track.cover}
                  alt={track.title}
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="anime-rating">
                        <Star className="w-3 h-3 inline mr-0.5" />
                        {track.rating}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <AnimeButton>
                        <Button size="icon" className="rounded-full w-12 h-12 pulse-border">
                          <Play className="h-6 w-6" />
                        </Button>
                      </AnimeButton>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-background/70 backdrop-blur-sm">
                    <h3 className="font-bold text-lg anime-subtitle">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {track.currentTime}/{track.duration}
                      </span>
                      <span className="anime-badge bg-primary/10 px-2 py-0.5">
                        {track.album}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden anime-gradient-border">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${track.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Disc className="w-3 h-3 mr-1" />
                          {track.releaseYear}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <AnimeButton>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </AnimeButton>
                        <AnimeButton>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ListMusic className="h-3 w-3" />
                          </Button>
                        </AnimeButton>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimeCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* New Releases */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">NEW RELEASES</AnimeTitle>
          <Button variant="ghost" size="sm" className="anime-button">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <motion.div className="relative" variants={staggerContainer}>
          <ScrollArea className="pb-4">
            <div className="flex space-x-4">
              {newReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  variants={cardAnimation}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[250px]"
                >
                  <AnimeCard className="overflow-hidden rounded-xl cursor-pointer">
                    <div className="relative">
                      <div className="aspect-video">
                        <img
                          src={release.cover}
                          alt={release.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="anime-rating">
                          <Star className="w-3 h-3 inline mr-0.5" />
                          {release.rating}
                        </span>
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                        <AnimeButton>
                          <Button size="icon" className="rounded-full w-10 h-10 pulse-border">
                            <Play className="h-5 w-5" />
                          </Button>
                        </AnimeButton>
                      </motion.div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex justify-between items-center mb-1">
                          <AnimeButton>
                            <Button size="sm" variant="secondary" className="h-7 bg-primary/20 border-0">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{release.releaseDate}</span>
                            </Button>
                          </AnimeButton>
                          <span className="anime-badge bg-background/30 px-2 py-0.5">
                            {release.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm line-clamp-1 anime-subtitle">{release.title}</h3>
                        <p className="text-xs text-muted-foreground">{release.artist}</p>
                      </div>
                    </div>
                  </AnimeCard>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>

      {/* Top Artists */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="mb-20 pb-16" // Extra bottom padding for player
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">TOP ARTISTS</AnimeTitle>
          <Button variant="ghost" size="sm" className="anime-button">
            <span>Explore More</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {topArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              variants={cardAnimation}
              transition={{ delay: index * 0.1 }}
            >
              <AnimeCard className="overflow-hidden rounded-xl cursor-pointer text-center">
                <div className="relative">
                  <div className="aspect-square">
                    <img
                      src={artist.cover}
                      alt={artist.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                    whileHover={{ opacity: 1 }}
                  >
                    <AnimeButton>
                      <Button size="icon" className="rounded-full w-10 h-10 pulse-border">
                        <Play className="h-5 w-5" />
                  </Button>
                    </AnimeButton>
                  </motion.div>
                </div>
                <div className="p-3 space-y-1 bg-background/70 backdrop-blur-sm">
                  <h3 className="font-bold truncate anime-subtitle">{artist.name}</h3>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="anime-badge bg-primary/10 px-2 py-0.5">{artist.genre}</span>
                    <span className="flex items-center">
                      <BarChart4 className="w-3 h-3 mr-1" />
                      {artist.popularity}
                  </span>
                  </div>
                </div>
              </AnimeCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Music Player */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-primary/20 p-3 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden anime-glow">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
          </div>
              <div>
                <h4 className="font-bold text-sm line-clamp-1 anime-subtitle">{currentTrack.title}</h4>
                <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
      </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary/80 hover:text-primary">
                <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Player Controls */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2">
                <AnimeButton>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Shuffle className="h-4 w-4" />
              </Button>
                </AnimeButton>
                <AnimeButton>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <SkipBack className="h-4 w-4" />
              </Button>
                </AnimeButton>
                <AnimatePresence>
                  <motion.div key={isPlaying ? "playing" : "paused"} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                    <AnimeButton>
                      <Button 
                        size="icon" 
                        className="rounded-full border-2 border-primary/20 h-10 w-10 bg-primary/10 hover:bg-primary/20 pulse-border" 
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
                    </AnimeButton>
                  </motion.div>
                </AnimatePresence>
                <AnimeButton>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <SkipForward className="h-4 w-4" />
              </Button>
                </AnimeButton>
                <AnimeButton>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Repeat className="h-4 w-4" />
              </Button>
                </AnimeButton>
            </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-xs text-muted-foreground min-w-[40px] text-right">
                  {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}
              </span>
                <div className="relative w-full h-1 bg-muted rounded-full overflow-hidden group anime-gradient-border">
                  <motion.div 
                    className="absolute h-full bg-primary group-hover:bg-primary/80"
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / totalDuration) * 100}%` }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity anime-glow" style={{ left: `${(progress / totalDuration) * 100}%`, transform: 'translate(-50%, -50%)' }} />
                </div>
                <span className="text-xs text-muted-foreground min-w-[40px]">
                  {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Volume Control */}
            <div className="flex justify-end items-center gap-3">
              <div className="flex items-center gap-2">
                <AnimeButton>
            <Button
              variant="ghost"
              size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => setVolume(volume === 0 ? 80 : 0)}
                  >
                    {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
                </AnimeButton>
                <div className="w-24 relative h-1 bg-muted rounded-full overflow-hidden group anime-gradient-border">
                  <motion.div 
                    className="absolute h-full bg-primary/70 group-hover:bg-primary"
                    animate={{ width: `${volume}%` }}
                    transition={{ duration: 0.1 }}
                  />
            <Slider
              value={[volume]}
                    min={0}
              max={100}
              step={1}
                    className="absolute inset-0 opacity-0"
              onValueChange={(value) => setVolume(value[0])}
            />
                </div>
              </div>
              <AnimeButton>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <ListMusic className="h-4 w-4" />
                </Button>
              </AnimeButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}