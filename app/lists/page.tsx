"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle, 
  AnimeCard, 
  AnimeButton 
} from "@/components/anime-theme";
import {
  Plus,
  MoreVertical,
  ListPlus,
  Settings,
  Trash2,
  Edit3,
  Eye,
  Clock,
  CheckCircle2,
  Star,
  Heart,
  Layers,
  FolderPlus,
  Filter,
  SearchIcon,
  ChevronDown,
  Film,
  Tv,
  BookOpen,
  Gamepad2,
  Music,
  Pin,
  AlertCircle,
  ArrowUpRight,
  Calendar
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5
    }
  },
  hover: { 
    y: -8,
    scale: 1.03,
    transition: { 
      duration: 0.3 
    } 
  }
};

// Glass effect styles
const glassStyle = "bg-background/30 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(138,43,226,0.25)] hover:shadow-[0_8px_40px_5px_rgba(138,43,226,0.35)] transition-all duration-300";
const gradientGlassStyle = "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-primary/50 before:via-background/0 before:to-secondary/50 before:-z-10 before:opacity-50 before:blur-[5px] hover:before:opacity-100 hover:before:blur-[2px] before:transition-all before:duration-300";

interface List {
  id: string;
  title: string;
  color: string;
  icon: string;
  items: ListItem[];
}

interface ListItem {
  id: string;
  title: string;
  type: "movie" | "show" | "anime" | "game" | "music";
  progress: number;
  cover: string;
  rating?: number;
  lastUpdated?: string;
  notes?: string;
  releaseYear?: number;
}

// Enhanced lists with more data and styling
const initialLists: List[] = [
  {
    id: "1",
    title: "Currently Watching",
    color: "from-blue-500/40 to-indigo-500/40",
    icon: "Eye",
    items: [
      {
        id: "1",
        title: "Attack on Titan",
        type: "anime",
        progress: 75,
        cover: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10701949_b_v8_ah.jpg",
        rating: 4.8,
        lastUpdated: "2 days ago",
        releaseYear: 2013
      },
      {
        id: "2",
        title: "The Last of Us",
        type: "show",
        progress: 60,
        cover: "https://sm.ign.com/ign_ap/cover/t/the-last-o/the-last-of-us-part-1_sbdy.jpg",
        rating: 4.9,
        lastUpdated: "1 week ago",
        releaseYear: 2023
      },
      {
        id: "6",
        title: "Demon Slayer",
        type: "anime",
        progress: 45,
        cover: "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 4.7,
        lastUpdated: "3 days ago",
        releaseYear: 2019
      },
    ],
  },
  {
    id: "2",
    title: "Plan to Watch",
    color: "from-purple-500/40 to-pink-500/40",
    icon: "Clock",
    items: [
      {
        id: "3",
        title: "Cyberpunk 2077",
        type: "game",
        progress: 0,
        cover: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/mixcollage-08-dec-2024-02-38-pm-3116.jpg",
        rating: 4.2,
        releaseYear: 2020
      },
      {
        id: "7",
        title: "Jujutsu Kaisen",
        type: "anime",
        progress: 0,
        cover: "https://m.media-amazon.com/images/I/81nGOkne3lL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.9,
        releaseYear: 2020
      },
      {
        id: "8",
        title: "Oppenheimer",
        type: "movie",
        progress: 0,
        cover: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 4.8,
        releaseYear: 2023
      }
    ],
  },
  {
    id: "3",
    title: "Completed",
    color: "from-green-500/40 to-emerald-500/40",
    icon: "CheckCircle2",
    items: [
      {
        id: "4",
        title: "Breaking Bad",
        type: "show",
        progress: 100,
        cover: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg",
        rating: 5.0,
        lastUpdated: "1 month ago",
        notes: "One of the best shows ever!",
        releaseYear: 2008
      },
      {
        id: "9",
        title: "Fullmetal Alchemist",
        type: "anime",
        progress: 100,
        cover: "https://m.media-amazon.com/images/M/MV5BNDczZWMyMjEtZDI0ZS00YThjLWE2MjEtNTIxNmVmZDhkNDg5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 4.9,
        lastUpdated: "2 months ago",
        releaseYear: 2009
      }
    ],
  },
  {
    id: "4",
    title: "Favorites",
    color: "from-red-500/40 to-orange-500/40",
    icon: "Heart",
    items: [
      {
        id: "5",
        title: "Spirited Away",
        type: "anime",
        progress: 100,
        cover: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 5.0,
        notes: "Absolute masterpiece",
        releaseYear: 2001
      },
      {
        id: "10",
        title: "Elden Ring",
        type: "game",
        progress: 92,
        cover: "https://p325k7wa.twic.pics/high/elden-ring/elden-ring/03-news/ER-SOTE-announcement.jpg?twic=v1/cover=500x556/step=10/quality=80",
        rating: 4.9,
        lastUpdated: "2 weeks ago",
        releaseYear: 2022
      }
    ],
  },
];

export default function ListsPage() {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const getListIcon = (iconName: string) => {
    switch (iconName) {
      case "Eye": return <Eye className="w-5 h-5" />;
      case "Clock": return <Clock className="w-5 h-5" />;
      case "CheckCircle2": return <CheckCircle2 className="w-5 h-5" />;
      case "Heart": return <Heart className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "movie": return <Film className="w-4 h-4" />;
      case "show": return <Tv className="w-4 h-4" />;
      case "anime": return <BookOpen className="w-4 h-4" />;
      case "game": return <Gamepad2 className="w-4 h-4" />;
      case "music": return <Music className="w-4 h-4" />;
      default: return <Film className="w-4 h-4" />;
    }
  };

  const totalItems = lists.reduce((acc, list) => acc + list.items.length, 0);

  return (
    <div className={withAnimeTheme("min-h-screen bg-gradient-to-br from-background via-background to-background/95")}>
      <AnimeThemeStyles />
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <AnimeTitle className="text-4xl">MY LISTS</AnimeTitle>
            <p className="text-muted-foreground"><AnimeGradientText>{totalItems} items</AnimeGradientText> across {lists.length} lists</p>
        </div>

          <div className="flex items-center gap-3">
            <div className={cn("relative rounded-xl overflow-hidden", glassStyle)}>
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search in lists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 pl-10 py-5 w-60 focus-visible:ring-1 focus-visible:ring-primary/50"
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
            
            <AnimeButton>
              <Button 
                className={cn("bg-primary/80 hover:bg-primary text-white flex items-center gap-2")}
              >
                <ListPlus className="w-4 h-4" />
                New List
              </Button>
            </AnimeButton>
          </div>
        </motion.section>

        {/* Categories Filter */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={cn("rounded-xl p-4", glassStyle, "relative", gradientGlassStyle)}
        >
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
            <TabsList className="bg-background/20 backdrop-blur-sm p-1 rounded-lg w-full flex justify-between">
              <TabsTrigger value="all" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                All Lists
              </TabsTrigger>
              <TabsTrigger value="watching" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Watching
              </TabsTrigger>
              <TabsTrigger value="planning" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="completed" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="favorites" className="anime-button data-[state=active]:bg-primary/30 data-[state=active]:text-white flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.section>

        {/* Lists Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lists
            .filter(list => activeFilter === "all" || 
              (activeFilter === "watching" && list.title === "Currently Watching") ||
              (activeFilter === "planning" && list.title === "Plan to Watch") ||
              (activeFilter === "completed" && list.title === "Completed") ||
              (activeFilter === "favorites" && list.title === "Favorites"))
            .map((list) => (
            <motion.div
              key={list.id}
              variants={itemAnimation}
              whileHover="hover"
              className="h-full"
            >
              <Card className={cn(
                "p-0 overflow-hidden h-full border-0",
                "relative",
                glassStyle,
                gradientGlassStyle
              )}>
                <div className={cn(
                  "h-16 w-full bg-gradient-to-r p-4",
                  list.color
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        {getListIcon(list.icon)}
                      </div>
                      <h2 className="text-lg font-bold">{list.title}</h2>
                      <Badge className="bg-white/20 backdrop-blur-md text-white">
                        {list.items.length}
                      </Badge>
              </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="text-white/90 hover:text-white">
                  <Edit3 className="w-4 h-4" />
                </Button>
                      <Button variant="ghost" size="icon" className="text-white/90 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                </Button>
                    </div>
              </div>
            </div>

                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                {list.items.map((item) => (
                      <motion.div
                    key={item.id}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                  >
                        <Card className="overflow-hidden relative border-0 bg-background/40 backdrop-blur-sm hover:bg-background/60 transition-all duration-300 shadow-md hover:shadow-lg">
                          <div className="flex h-[120px]">
                            <div className="w-[90px] h-full relative overflow-hidden">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                              {item.progress > 0 && item.progress < 100 && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                          <div
                                    className="h-full bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                              )}
                            </div>
                            
                            <div className="flex-1 p-3 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between">
                                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                                  {item.rating && (
                                    <div className="flex items-center gap-0.5 bg-yellow-500/20 text-yellow-500 rounded px-1.5 py-0.5 text-xs font-bold">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      {item.rating}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Badge className="bg-primary/10 text-primary text-xs py-0 px-1.5 h-4">
                                    <div className="flex items-center gap-1">
                                      {getTypeIcon(item.type)}
                                      <span className="capitalize">{item.type}</span>
                                    </div>
                                  </Badge>
                                  {item.releaseYear && (
                                    <Badge variant="outline" className="bg-background/50 text-xs py-0 px-1.5 h-4">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {item.releaseYear}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1.5">
                                  {item.progress === 0 && (
                                    <span className="text-xs text-muted-foreground">Not started</span>
                                  )}
                                  {item.progress > 0 && item.progress < 100 && (
                                    <span className="text-xs text-muted-foreground">{item.progress}% complete</span>
                                  )}
                                  {item.progress === 100 && (
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Completed
                                    </span>
                                  )}
                                </div>
                                
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="w-3 h-3" />
                                </Button>
                      </div>
                    </div>
                  </div>
                        </Card>
                      </motion.div>
                ))}

                    <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                        className="w-full border-2 border-dashed border-primary/20 hover:border-primary/40 h-16 bg-background/30 backdrop-blur-sm"
                >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Item
                </Button>
                    </motion.div>
              </div>
            </ScrollArea>
          </Card>
            </motion.div>
        ))}

          <motion.div
            variants={itemAnimation}
            whileHover="hover"
          >
            <Card className={cn(
              "p-6 h-[526px] flex flex-col items-center justify-center border-2 border-dashed border-primary/20 hover:border-primary/40",
              "bg-background/30 backdrop-blur-md"
            )}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FolderPlus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create New List</h3>
              <p className="text-muted-foreground text-center mb-4">Organize your entertainment with custom lists</p>
              <AnimeButton>
                <Button className="bg-primary/80 hover:bg-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create List
          </Button>
              </AnimeButton>
        </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}