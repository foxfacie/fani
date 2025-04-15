"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Play,
  Star,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Info,
  Book,
  Languages,
  ListChecks,
  Subtitles,
  Volume2,
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

const seasons = ["Winter 2024", "Spring 2024", "Summer 2024", "Fall 2024"];

const media = [
  {
    id: 1,
    title: "Jujutsu Kaisen",
    cover: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-67440,resizemode-75,msid-102363469/news/international/us/jujutsu-kaisen-season-2s-gripping-parallel-storyline-and-its-link-with-naruto-heres-all-you-need-to-know.jpg",
    rating: "9.2",
    progress: 85,
    type: "anime",
    episodes: 24,
    currentEpisode: 20,
    status: "Airing",
    nextEpisode: "2 days",
    language: "sub",
  },
  {
    id: 2,
    title: "One Piece",
    cover: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/should-you-watch-one-piece.jpg",
    rating: "9.5",
    progress: 60,
    type: "manga",
    chapters: 1050,
    currentChapter: 630,
    status: "Ongoing",
    nextChapter: "7 days",
  },
  {
    id: 3,
    title: "Demon Slayer",
    cover: "https://m.media-amazon.com/images/S/pv-target-images/d1610678e156e6636f5e7e670d21a3a172f1ab5347eab5965861d1510f52294f._SX1080_FMjpg_.jpg",
    rating: "9.0",
    progress: 100,
    type: "anime",
    episodes: 26,
    currentEpisode: 26,
    status: "Completed",
    nextEpisode: null,
    language: "dub",
  },
];

const seasonal = [
  {
    id: 4,
    title: "My Hero Academia Season 7",
    cover: "https://m.media-amazon.com/images/S/pv-target-images/512e354397683bf0b540c7ebfd4d0fdad6f221c5e469b595cc23cfb37b6043e7.jpg",
    rating: "8.7",
    status: "Coming Soon",
    releaseDate: "14 days",
  },
  {
    id: 5,
    title: "Solo Leveling",
    cover: "https://www.superherotoystore.com/cdn/shop/articles/Website_Blog_creatives_29_1600x.jpg?v=1713945144",
    rating: "9.1",
    status: "Coming Soon",
    releaseDate: "7 days",
  },
  {
    id: 6,
    title: "Haikyuu!! Final Season",
    cover: "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/02/16201043/haikyuu-2-1600x900.jpeg",
    rating: "8.9",
    status: "Coming Soon",
    releaseDate: "21 days",
  },
  {
    id: 7,
    title: "Blue Lock Season 2",
    cover: "https://cdn.oneesports.gg/cdn-data/2024/05/Anime_BlueLock_Season2KeyArt.jpg",
    rating: "8.5",
    status: "Coming Soon",
    releaseDate: "28 days",
  },
  {
    id: 8,
    title: "Chainsaw Man Season 2",
    cover: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/11/yoru-denji-chainsaw-man.jpg",
    rating: "9.3",
    status: "Coming Soon",
    releaseDate: "35 days",
  },
  {
    id: 9,
    title: "Spy x Family Season 3",
    cover: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/spy-x-family-loid-and-yor-focusing-on-peace.jpg",
    rating: "8.8",
    status: "Coming Soon",
    releaseDate: "42 days",
  },
];

// Add recommended anime data
const recommendedAnime = [
  {
    id: 1,
    title: "Attack on Titan: Final Season",
    cover: "https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_.jpg",
    rating: "9.8",
    episodes: 16,
    genre: "Action, Drama",
    status: "Completed",
    description: "The epic conclusion to the story of Eren Yeager and the battle for humanity's survival."
  },
  {
    id: 2,
    title: "Death Note",
    cover: "https://m.media-amazon.com/images/M/MV5BODkzMjhjYTQtYmQyOS00NmZlLTg3Y2UtYjkzN2JkNmRjY2FhXkEyXkFqcGdeQXVyNTM4MDQ5MDc@._V1_.jpg",
    rating: "9.0",
    episodes: 37,
    genre: "Psychological, Thriller",
    status: "Completed",
    description: "A high school student discovers a supernatural notebook that grants him the power to kill anyone whose name he writes in it."
  },
  {
    id: 3,
    title: "Demon Slayer: Entertainment District Arc",
    cover: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
    rating: "9.5",
    episodes: 11,
    genre: "Action, Fantasy",
    status: "Completed",
    description: "Tanjiro and his friends investigate mysterious disappearances in the Entertainment District."
  },
  {
    id: 4,
    title: "Steins;Gate",
    cover: "https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_.jpg",
    rating: "9.1",
    episodes: 24,
    genre: "Sci-Fi, Thriller",
    status: "Completed",
    description: "A group of friends discover a way to send messages to the past, leading to unexpected consequences."
  },
  {
    id: 5,
    title: "Hunter x Hunter (2011)",
    cover: "https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_.jpg",
    rating: "9.2",
    episodes: 148,
    genre: "Adventure, Fantasy",
    status: "Completed",
    description: "A young boy sets out to become a Hunter and find his missing father."
  },
  {
    id: 6,
    title: "Vinland Saga",
    cover: "https://m.media-amazon.com/images/M/MV5BNDA3MGNmZTEtMzFiMy00ZmViLThhNmQtMjQ4ZDc5MDEyN2U1XkEyXkFqcGc@._V1_.jpg",
    rating: "8.8",
    episodes: 24,
    genre: "Action, Historical",
    status: "Completed",
    description: "A young Viking boy seeks revenge for his father's death in this epic historical drama."
  }
];

export default function AnimePage() {
  const [contentType, setContentType] = useState<"anime" | "manga">("anime");
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [language, setLanguage] = useState<"sub" | "dub">("sub");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={withAnimeTheme("min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95 overflow-x-hidden")}>
      <AnimeThemeStyles />
      
      {/* Header with Toggle */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <AnimeTitle className="text-4xl">
            {contentType === "anime" ? "ANIME" : "MANGA"}
          </AnimeTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-bold">MANGA</span>
            <Switch
              checked={contentType === "anime"}
              onCheckedChange={(checked) =>
                setContentType(checked ? "anime" : "manga")
              }
              className="anime-border data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-muted-foreground font-bold">ANIME</span>
          </div>
        </div>

        {contentType === "anime" && (
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollArea className="w-full max-w-2xl">
              <div className="flex space-x-2 pb-4">
                {seasons.map((season, index) => (
                  <motion.div
                    key={season}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AnimeButton>
                      <Button
                        variant={selectedSeason === season ? "default" : "outline"}
                        onClick={() => setSelectedSeason(season)}
                        className={cn(
                          "whitespace-nowrap font-bold",
                          selectedSeason === season && "pulse-border"
                        )}
                      >
                        {season}
                      </Button>
                    </AnimeButton>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </div>

      {/* Currently Watching / Reading */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">
            CONTINUE {contentType === "anime" ? "WATCHING" : "READING"}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {media
            .filter((item) => item.type === contentType)
            .map((item) => (
              <motion.div
                key={item.id}
                variants={cardAnimation}
                className="col-span-1"
              >
                <AnimeCard className="rounded-xl h-full cursor-pointer">
                  <div className="relative h-full overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-t-xl"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="anime-rating">
                          <Star className="w-3 h-3 inline mr-0.5" />
                          {item.rating}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <AnimeButton>
                          <Button size="icon" className="rounded-full w-12 h-12">
                            <Play className="h-6 w-6" />
                          </Button>
                        </AnimeButton>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-background/70 backdrop-blur-sm">
                      <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {contentType === "anime"
                            ? `Episode ${item.currentEpisode}/${item.episodes}`
                            : `Chapter ${item.currentChapter}/${item.chapters}`}
                        </span>
                        <span className="anime-badge bg-primary/10 px-2 py-0.5">
                          {item.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {contentType === "anime" && item.nextEpisode ? (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Next: {item.nextEpisode}
                            </span>
                          ) : contentType === "manga" && item.nextChapter ? (
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Next: {item.nextChapter}
                            </span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </div>
                        {contentType === "anime" && item.language && (
                          <div className="text-xs bg-background/60 px-2 py-1 rounded-full anime-badge">
                            {item.language === "sub" ? (
                              <span className="flex items-center">
                                <Subtitles className="w-3 h-3 mr-1" />
                                SUB
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Volume2 className="w-3 h-3 mr-1" />
                                DUB
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimeCard>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      {/* Upcoming Releases */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">UPCOMING RELEASES</AnimeTitle>
          <Button variant="ghost" size="sm" className="anime-button">
            <span>View Schedule</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <motion.div className="relative" variants={staggerContainer}>
          <ScrollArea className="pb-4">
            <div className="flex space-x-4">
              {seasonal.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardAnimation}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[250px]"
                >
                  <AnimeCard className="overflow-hidden rounded-xl cursor-pointer">
                    <div className="relative">
                      <div className="aspect-video">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="anime-rating">
                          <Star className="w-3 h-3 inline mr-0.5" />
                          {item.rating}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex justify-between items-center mb-1">
                          <AnimeButton>
                            <Button size="sm" variant="secondary" className="h-7 bg-primary/20 border-0">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{item.releaseDate}</span>
                            </Button>
                          </AnimeButton>
                        </div>
                        <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                      </div>
                    </div>
                  </AnimeCard>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <AnimeTitle className="text-xl">RECOMMENDED FOR YOU</AnimeTitle>
          <Button variant="ghost" size="sm" className="anime-button">
            <span>Explore More</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recommendedAnime.map((anime) => (
            <motion.div
              key={anime.id}
              variants={cardAnimation}
              className="col-span-1"
            >
              <AnimeCard className="rounded-xl h-full cursor-pointer">
                <div className="relative h-full overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={anime.cover}
                      alt={anime.title}
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="anime-rating">
                        <Star className="w-3 h-3 inline mr-0.5" />
                        {anime.rating}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <AnimeButton>
                        <Button size="icon" className="rounded-full w-12 h-12">
                          <Play className="h-6 w-6" />
                        </Button>
                      </AnimeButton>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-background/70 backdrop-blur-sm">
                    <h3 className="font-bold text-lg line-clamp-1">{anime.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {anime.episodes} Episodes
                      </span>
                      <span className="anime-badge bg-primary/10 px-2 py-0.5">
                        {anime.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {anime.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {anime.genre.split(", ").map((genre, index) => (
                        <span
                          key={index}
                          className="text-xs bg-background/60 px-2 py-1 rounded-full anime-badge"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimeCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}