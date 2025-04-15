"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
  Mic,
  Clock,
  ChevronRight,
  Plus,
  GripVertical,
  MessageSquare,
  Share2,
  Heart,
  HeartCrack,
  Download,
  Save,
  Search,
  Star,
  TrendingUp,
  Headphones,
  Filter,
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
import { AnimeGradientText, AnimeThemeStyles, AnimeTitle, withAnimeTheme } from "@/components/anime-theme";

const podcastCategories = [
  { id: "all", name: "All" },
  { id: "trending", name: "Trending" },
  { id: "comedy", name: "Comedy" },
  { id: "technology", name: "Technology" },
  { id: "crime", name: "True Crime" },
  { id: "business", name: "Business" },
  { id: "science", name: "Science" },
  { id: "anime", name: "Anime & Manga" },
  { id: "gaming", name: "Gaming" },
];

const podcasts = [
  {
    id: 1,
    title: "The Joe Rogan Experience",
    host: "Joe Rogan",
    description: "Conversations with the most interesting people in the world",
    cover: "https://images.theconversation.com/files/443910/original/file-20220201-23-ogvkam.png?ixlib=rb-4.1.0&rect=12%2C56%2C1254%2C795&q=45&auto=format&w=926&fit=clip",
    categories: ["comedy", "interview"],
    rating: 4.8,
    listenerCount: "11M",
    duration: "2:42:15",
    currentTime: "1:17:30",
    isNew: false,
    isFeatured: true,
    isTrending: true,
    chapters: [
      { title: "Introduction", timestamp: "00:00" },
      { title: "Guest Background", timestamp: "15:30" },
      { title: "Main Discussion", timestamp: "45:12" },
      { title: "Audience Questions", timestamp: "1:55:00" },
    ],
  },
  {
    id: 2,
    title: "Freakonomics Radio",
    host: "Stephen J. Dubner",
    description: "Exploring the hidden side of everything",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/f7/0c/c5/f70cc540-ce36-d96f-b111-c970aad5505c/mza_17703422762227531425.jpg/1200x1200bf-60.jpg",
    categories: ["economics", "science"],
    rating: 4.6,
    listenerCount: "5.2M",
    duration: "52:15",
    currentTime: "23:45",
    isNew: false,
    isFeatured: false,
    isTrending: true,
    chapters: [
      { title: "Welcome", timestamp: "00:00" },
      { title: "Research Breakdown", timestamp: "12:20" },
      { title: "Economic Implications", timestamp: "35:40" },
    ],
  },
  {
    id: 3,
    title: "Stuff You Should Know",
    host: "Josh Clark & Chuck Bryant",
    description: "Explaining the world around you, one topic at a time",
    cover: "https://m.media-amazon.com/images/S/pv-target-images/3b8c525cfdcf6c8c036d560cfd50cbc85536aed71397b5dc23d9d36fd3210aa0.jpg",
    categories: ["education", "science", "history"],
    rating: 4.7,
    listenerCount: "7.8M",
    duration: "1:15:45",
    currentTime: "32:18",
    isNew: false,
    isFeatured: false,
    isTrending: false,
    chapters: [
      { title: "Topic Introduction", timestamp: "00:00" },
      { title: "Historical Context", timestamp: "14:30" },
      { title: "Modern Applications", timestamp: "42:25" },
      { title: "Listener Mail", timestamp: "1:04:10" },
    ],
  },
  {
    id: 4,
    title: "Anime Talk Weekly",
    host: "Sakura Tanaka & Kenji Yamamoto",
    description: "The latest news and discussions about anime and manga",
    cover: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo400/38836956/38836956-1730243220538-301143c3c8bbe.jpg",
    categories: ["anime", "entertainment"],
    rating: 4.9,
    listenerCount: "2.4M",
    duration: "1:05:22",
    currentTime: "00:00",
    isNew: true,
    isFeatured: true,
    isTrending: true,
    chapters: [
      { title: "This Week's Releases", timestamp: "00:00" },
      { title: "Industry News", timestamp: "15:45" },
      { title: "Manga Corner", timestamp: "32:18" },
      { title: "Fan Theories", timestamp: "48:30" },
    ],
  },
  {
    id: 5,
    title: "Gaming Unplugged",
    host: "Max Powers",
    description: "Deep dives into game design, industry news, and reviews",
    cover: "https://i.scdn.co/image/ab6765630000ba8a8891d6c30daae2a9c9cbde02",
    categories: ["gaming", "technology"],
    rating: 4.5,
    listenerCount: "1.8M",
    duration: "1:32:10",
    currentTime: "00:00",
    isNew: true,
    isFeatured: false,
    isTrending: true,
    chapters: [
      { title: "Gaming News", timestamp: "00:00" },
      { title: "New Releases Review", timestamp: "22:15" },
      { title: "Interview with Developer", timestamp: "45:30" },
      { title: "Community Q&A", timestamp: "1:15:45" },
    ],
  },
  {
    id: 6,
    title: "True Crime Chronicles",
    host: "Sarah Parker",
    description: "In-depth coverage of the most fascinating true crime cases",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmwPdXsX2CaFWg_gRWYNolfTIzuv8Eh4BErg&s",
    categories: ["crime", "storytelling"],
    rating: 4.7,
    listenerCount: "3.5M",
    duration: "1:45:30",
    currentTime: "00:00",
    isNew: false,
    isFeatured: true,
    isTrending: false,
    chapters: [
      { title: "Case Background", timestamp: "00:00" },
      { title: "Investigation Details", timestamp: "25:40" },
      { title: "Interviews", timestamp: "52:15" },
      { title: "Resolution & Impact", timestamp: "1:20:05" },
    ],
  },
];

const playlists = [
  {
    id: 1,
    name: "Science & Tech",
    episodes: 24,
    cover: "https://i.scdn.co/image/ab6765630000ba8a0bdd012265a2b818386c5769",
  },
  {
    id: 2,
    name: "True Crime Stories",
    episodes: 18,
    cover: "https://m.media-amazon.com/images/I/51aLszYKudL._SL500_.jpg",
  },
  {
    id: 3,
    name: "Business & Finance",
    episodes: 15,
    cover: "https://thecfoclub.com/wp-content/uploads/sites/12/2024/02/image-7.jpeg",
  },
  {
    id: 4,
    name: "Anime Discussions",
    episodes: 32,
    cover: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/11008229/11008229-1712168637433-c1eeffa4d703.jpg",
  },
  {
    id: 5,
    name: "Gaming World",
    episodes: 27,
    cover: "https://i.scdn.co/image/ab6761610000e5eb51bcf02fc6eeed6c0185e33a",
  },
];

export default function PodcastsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(30);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(podcasts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("discover");
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to calculate progress percentage from time strings like "1:17:30" / "2:42:15"
  const calculateProgress = (current: string, total: string) => {
    // Convert time strings to seconds
    const convertToSeconds = (timeStr: string) => {
      const parts = timeStr.split(':').map(part => parseInt(part));
      if (parts.length === 3) {
        // Format is "h:mm:ss"
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else {
        // Format is "mm:ss"
        return parts[0] * 60 + parts[1];
      }
    };
    
    const currentSeconds = convertToSeconds(current);
    const totalSeconds = convertToSeconds(total);
    
    return (currentSeconds / totalSeconds) * 100;
  };

  // Filter podcasts based on search query and selected category
  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = 
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      podcast.host.toLowerCase().includes(searchQuery.toLowerCase()) || 
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || 
      podcast.categories.includes(activeCategory) || 
      (activeCategory === "trending" && podcast.isTrending);
    
    return matchesSearch && matchesCategory;
  });

  const transcript = `
    [00:00] Welcome to today's episode of The Joe Rogan Experience...
    [15:30] Let's dive into the conversation with our guest...
    [45:12] Now, about the controversial topics we discussed earlier...
    [1:15:00] To conclude our discussion about current events...
  `.trim();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={withAnimeTheme("min-h-screen bg-gradient-to-br from-background via-background to-background/95")}>
      <AnimeThemeStyles />
      
      {/* Main Content */}
      <div className="p-6">
        <div className="mb-8">
          <AnimeTitle className="text-4xl flex items-center gap-3">
            <Headphones className="inline-block" />
            PODCASTS
          </AnimeTitle>
          
          <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <Tabs 
              defaultValue="discover" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <TabsList className="w-full md:w-auto anime-border pulse-border">
                    <TabsTrigger value="discover" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Discover</TabsTrigger>
                    <TabsTrigger value="library" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Library</TabsTrigger>
                    <TabsTrigger value="playlists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Playlists</TabsTrigger>
            </TabsList>
                  
                  <div className="hidden md:flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full md:w-60">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Search podcasts..." 
                        className="pl-9 anime-input anime-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button className="anime-button">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                <div className="md:hidden flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search podcasts..." 
                      className="pl-9 anime-input anime-border"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="anime-button">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
        </div>

                <ScrollArea className="w-full">
                  <div className="flex items-center gap-2 pb-2">
                    {podcastCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className={`anime-button whitespace-nowrap ${activeCategory === category.id ? 'anime-glow' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>

                <TabsContent value="discover" className="m-0">
                  {/* Featured Podcasts */}
                  <motion.section 
                    className="mb-8"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                  >
          <div className="flex items-center justify-between mb-4">
                      <AnimeTitle className="text-2xl">
                        FEATURED PODCASTS
                      </AnimeTitle>
                      <Button variant="ghost" className="anime-button">
              See All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      variants={staggerContainer}
                    >
                      {filteredPodcasts.filter(p => p.isFeatured).map((podcast, index) => (
                        <motion.div
                          key={podcast.id}
                          variants={cardAnimation}
                          className="group"
                          whileHover={{ 
                            y: -5, 
                            transition: { duration: 0.2 }
                          }}
                          onClick={() => setSelectedPodcast(podcast)}
                        >
                          <Card className="overflow-hidden anime-card">
                            <div className="relative aspect-video w-full">
                  <img
                    src={podcast.cover}
                    alt={podcast.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                <div className="flex items-center justify-between">
                                  <Badge className="anime-badge bg-primary/80 text-primary-foreground">
                                    {podcast.categories[0].toUpperCase()}
                                  </Badge>
                                  <div className="flex items-center gap-1 bg-black/50 text-yellow-400 text-xs px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3" />
                                    <span>{podcast.rating}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="icon"
                                  className="rounded-full h-14 w-14 anime-button anime-glow"
                                >
                                  <Play className="w-6 h-6" />
                                </Button>
                              </motion.div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="font-bold truncate">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                                By {podcast.host}
                              </p>
                              <p className="text-xs text-muted-foreground truncate mb-3">{podcast.description}</p>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Headphones className="w-3 h-3" />
                                  <span>{podcast.listenerCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{podcast.duration}</span>
                                </div>
                                {podcast.isNew && (
                                  <Badge variant="outline" className="text-xs anime-badge">NEW</Badge>
                                )}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.section>
                  
                  {/* Continue Listening */}
                  <motion.section 
                    className="mb-8"
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <AnimeTitle className="text-2xl">
                        CONTINUE LISTENING
                      </AnimeTitle>
                      <Button variant="ghost" className="anime-button">
                        See All
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={staggerContainer}
                    >
                      {podcasts.filter(p => p.currentTime !== "00:00").map((podcast, index) => (
                        <motion.div
                          key={podcast.id}
                          variants={cardAnimation}
                          whileHover={{ 
                            y: -5, 
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Card className="p-4 hover:bg-card/50 transition-colors anime-card">
                            <div className="flex gap-4">
                              <motion.img
                                src={podcast.cover}
                                alt={podcast.title}
                                className="w-24 h-24 rounded-lg object-cover flex-shrink-0 anime-gradient-border"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base truncate">{podcast.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2 truncate">
                      {podcast.host}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                  <Clock className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate anime-gradient-text">
                        {podcast.currentTime} / {podcast.duration}
                      </span>
                    </div>
                                <div className="h-1 bg-muted rounded-full mb-3 overflow-hidden anime-glow">
                                  <motion.div
                        className="h-full bg-primary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${calculateProgress(podcast.currentTime, podcast.duration)}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                      />
                    </div>
                    <div className="flex gap-2">
                                  <motion.div 
                                    className="flex-1"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    <Button size="sm" className="w-full anime-button">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Button size="sm" variant="outline" className="anime-button">
                        <ListMusic className="w-4 h-4" />
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.section>
                  
                  {/* Trending Now */}
                  <motion.section
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <AnimeTitle className="text-2xl">
                          TRENDING NOW
                        </AnimeTitle>
                        <Badge className="anime-badge bg-red-500/80 text-red-50 animate-pulse">HOT</Badge>
                      </div>
                      <Button variant="ghost" className="anime-button">
                        See All
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                      variants={staggerContainer}
                    >
                      {filteredPodcasts.filter(p => p.isTrending).map((podcast, index) => (
                        <motion.div
                          key={podcast.id}
                          variants={listItemAnimation}
                          whileHover={{ 
                            y: -5, 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Card
                            className="group relative overflow-hidden transition-all duration-300 hover:bg-card/50 anime-card"
                          >
                            <div className="aspect-square relative">
                              <img
                                src={podcast.cover}
                                alt={podcast.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.div
                                  className="absolute bottom-2 right-2"
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                >
                                  <Button
                                    size="icon"
                                    className="rounded-full h-8 w-8 anime-button"
                                  >
                                    <Play className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              </div>
                              
                              {podcast.isNew && (
                                <Badge className="absolute top-2 left-2 anime-badge bg-primary/80">NEW</Badge>
                              )}
                              
                              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">
                                <Star className="w-3 h-3" />
                                <span>{podcast.rating}</span>
                  </div>
                </div>
                            <div className="p-2">
                              <h3 className="font-semibold text-sm truncate">{podcast.title}</h3>
                              <p className="text-xs text-muted-foreground truncate">
                                {podcast.host}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.section>
                </TabsContent>
                
                {/* Library Tab Content */}
                <TabsContent value="library" className="m-0">
                  <div className="grid gap-4">
                    <Card className="p-4 anime-card">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Subscribed Podcasts</h3>
                        <Button variant="outline" className="anime-button">
                          <Plus className="w-4 h-4 mr-2" /> Add New
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {podcasts.slice(0, 3).map((podcast) => (
                          <Card key={podcast.id} className="p-3 flex items-center gap-3 anime-border">
                            <img 
                              src={podcast.cover} 
                              alt={podcast.title} 
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{podcast.title}</h4>
                              <p className="text-xs text-muted-foreground truncate">{podcast.host}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="shrink-0">
                              <Play className="w-4 h-4" />
                            </Button>
              </Card>
            ))}
          </div>
                    </Card>
                    
                    <Card className="p-4 anime-card">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Download History</h3>
                        <Button variant="ghost" className="text-xs">Manage</Button>
                      </div>
                      <div className="space-y-3">
                        {podcasts.slice(0, 4).map((podcast) => (
                          <div key={podcast.id} className="flex items-center gap-3">
                            <img 
                              src={podcast.cover} 
                              alt={podcast.title} 
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{podcast.title}</h4>
                              <p className="text-xs text-muted-foreground truncate">Downloaded on May 15, 2023</p>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                <HeartCrack className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Playlists Tab Content */}
                <TabsContent value="playlists" className="m-0">
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Podcast Playlists</h2>
                    <Button className="anime-button">
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </Button>
          </div>

                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                  >
                    {playlists.map((playlist, index) => (
                      <motion.div
                        key={playlist.id}
                        variants={listItemAnimation}
                        whileHover={{ 
                          y: -5, 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
              <Card
                          className="group relative overflow-hidden transition-all duration-300 anime-card"
              >
                <div className="aspect-square">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                              <h3 className="font-bold text-lg">{playlist.name}</h3>
                              <p className="text-sm text-white/80 mb-4">
                                {playlist.episodes} episodes
                              </p>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1 anime-button"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Play All
                                </Button>
                    <Button
                      size="icon"
                                  variant="secondary"
                                  className="anime-button"
                    >
                                  <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                  <h3 className="font-semibold truncate">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {playlist.episodes} episodes
                  </p>
                              </div>
                              <Button variant="ghost" size="icon" className="anime-button">
                                <Play className="w-4 h-4" />
                              </Button>
                            </div>
                </div>
              </Card>
                      </motion.div>
            ))}
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Player */}
      <motion.div 
        className="sticky bottom-0 w-full bg-card/80 backdrop-blur-lg border-t p-4 anime-glass"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={selectedPodcast.cover}
              alt={selectedPodcast.title}
              className="w-14 h-14 rounded-lg flex-shrink-0 anime-border pulse-border"
            />
            <div className="min-w-0">
              <AnimeGradientText className="font-medium truncate">{selectedPodcast.title}</AnimeGradientText>
              <p className="text-sm text-muted-foreground truncate">{selectedPodcast.host}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-auto md:hidden"
            >
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-full anime-button"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2">
              <motion.div
                className="hidden sm:flex"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="anime-button">
                <Shuffle className="w-4 h-4" />
              </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="anime-button">
                <SkipBack className="w-4 h-4" />
              </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:block"
              >
                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-full anime-button anime-glow"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <AnimatePresence mode="wait">
                {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Pause className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
              </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="anime-button">
                <SkipForward className="w-4 h-4" />
              </Button>
              </motion.div>
              <motion.div
                className="hidden sm:flex"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="anime-button">
                <Repeat className="w-4 h-4" />
              </Button>
              </motion.div>
            </div>
            <div className="w-full flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">{selectedPodcast.currentTime}</span>
              <div className="flex-1 relative">
              <Slider
                value={[currentTime]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-primary rounded-full -translate-y-1/2 anime-glow"
                  style={{ width: `${currentTime}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">{selectedPodcast.duration}</span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-end gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className={`anime-button ${isFavorite ? 'text-red-500' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>
            <div className="hidden md:flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <Button
                variant="ghost"
                size="sm"
                  className="anime-button"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Transcript
              </Button>
              </motion.div>
              <motion.select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="bg-transparent border rounded px-2 py-1 text-sm anime-border"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <option value={0.5}>0.5x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.5}>1.5x</option>
                <option value={2.0}>2.0x</option>
              </motion.select>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
              <Button
                variant="ghost"
                size="icon"
                  className="anime-button"
                onClick={() => setVolume(volume === 0 ? 75 : 0)}
              >
                  <AnimatePresence mode="wait">
                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </AnimatePresence>
              </Button>
              </motion.div>
              <div className="relative w-24 hidden sm:block">
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-primary rounded-full -translate-y-1/2"
                  style={{ width: `${volume}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transcript Overlay */}
      <AnimatePresence>
      {showTranscript && (
          <motion.div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto anime-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <AnimeTitle className="text-xl">TRANSCRIPT</AnimeTitle>
            <Button
              variant="ghost"
                  size="sm" 
                  className="anime-button"
              onClick={() => setShowTranscript(false)}
            >
                  Close
            </Button>
          </div>
              <ScrollArea className="max-h-[60vh]">
                <div className="text-sm whitespace-pre-line p-4 space-y-4">
                  {transcript.split('\n').map((line, i) => (
                    <motion.p 
                key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="pb-2 border-b border-border/30 last:border-0"
              >
                {line}
                    </motion.p>
            ))}
          </div>
              </ScrollArea>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}