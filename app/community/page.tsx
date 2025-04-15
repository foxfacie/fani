"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Share,
  Image as ImageIcon,
  Smile,
  Send,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Star,
  Globe,
  Bookmark,
  Bell,
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Hash,
  Repeat,
  Flame,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Eye
} from "lucide-react";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle, 
  AnimeCard, 
  AnimeButton 
} from "@/components/anime-theme";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  cardAnimation,
  listItemAnimation,
  hoverScale,
  progressAnimation
} from "@/components/animation-variants";

// Expanded posts data with more realistic content
const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "@sarahchen",
      avatar: "https://i.imgur.com/Q9WPlWA.jpg",
      verified: true,
    },
    content: "Just finished watching the latest episode of Demon Slayer. The animation quality is absolutely incredible! The fight scenes were breathtaking and the emotional moments had me in tears. Ufotable never disappoints! 🔥🗡️",
    image: "https://i.imgur.com/orhYxfS.jpg",
    likes: 1234,
    comments: 245,
    shares: 94,
    time: "2h ago",
    tags: ["DemonSlayer", "Anime", "Entertainment"],
    isPinned: true,
  },
  {
    id: 2,
    user: {
      name: "Alex Thompson",
      username: "@alexthompson",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gSL18zQJl58J0K6Ff1AnXSWPJUsJBx5EaA&s",
      verified: false,
    },
    content: "Anyone else excited for the upcoming season of The Witcher? The new cast looks promising! I've been replaying the games to prepare for it. What are your expectations? 🗡️🧙‍♂️",
    likes: 756,
    comments: 128,
    shares: 34,
    time: "4h ago",
    tags: ["TheWitcher", "Netflix", "TVShows"],
  },
  {
    id: 3,
    user: {
      name: "Miyamoto Kenji",
      username: "@kenjiartist",
      avatar: "https://static01.nyt.com/images/2007/07/20/world/miyamoto190.jpg?quality=75&auto=webp&disable=upscale",
      verified: true,
    },
    content: "Just finished my latest manga illustration! This one took me over 30 hours to complete. Inspired by traditional Japanese art mixed with modern anime styling. What do you think? #ArtShare #MangaArt",
    image: "https://i.imgur.com/MR25TJO.jpg",
    likes: 2853,
    comments: 421,
    shares: 312,
    time: "6h ago",
    tags: ["Art", "Manga", "Illustration"],
  },
  {
    id: 4,
    user: {
      name: "Elena Rodriguez",
      username: "@elenareviews",
      avatar: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/60/Yo-Yo_Rodriguez.jpg/revision/latest?cb=20190412001942",
      verified: true,
    },
    content: "Just published my in-depth analysis of Makoto Shinkai's filmography! From 'Your Name' to 'Weathering With You' - exploring the themes of connection, distance, and supernatural elements in his works. Link in bio for the full article! 🎬✨",
    likes: 1642,
    comments: 186,
    shares: 93,
    time: "12h ago",
    tags: ["Film", "Anime", "MakotoShinkai"],
  },
  {
    id: 5,
    user: {
      name: "Ryan Park",
      username: "@ryanplays",
      avatar: "https://images.squarespace-cdn.com/content/v1/5a7b58f4f9a61ea7f3bcef04/1576887262899-ZAN48I9OKL4GM69PD3UO/i-K6dh55s-X3.jpg",
      verified: false,
    },
    content: "Reached Platinum rank in League of Legends finally! Been grinding for months with my main. Anyone want to team up for some matches this weekend? #Gaming #LeagueOfLegends",
    image: "https://i.imgur.com/kUVKdZK.jpg",
    likes: 897,
    comments: 143,
    shares: 21,
    time: "1d ago",
    tags: ["Gaming", "LeagueOfLegends", "Esports"],
  },
  {
    id: 6,
    user: {
      name: "Sophia Williams",
      username: "@sophiacosplay",
      avatar: "https://i.imgur.com/8zL4Qen.jpg",
      verified: true,
    },
    content: "My Marin Kitagawa cosplay from 'My Dress-Up Darling' is finally complete! Took me 3 months to get all the details right. Can't wait to wear her at the next convention! What do you think? 💖✨ #Cosplay #MyDressUpDarling",
    image: "https://i.imgur.com/iRRIccI.jpg",
    likes: 3784,
    comments: 492,
    shares: 284,
    time: "1d ago",
    tags: ["Cosplay", "Anime", "MyDressUpDarling"],
  },
];

// Expanded events data 
const events = [
  {
    id: 1,
    title: "Anime Movie Night: Your Name",
    date: "This Friday, 8 PM",
    attendees: 328,
    cover: "https://opus.ing/_assets/stills/your-name-makoto-shinkai.webp",
    location: "Tokyo-themed Café, Downtown",
    description: "Join us for a magical evening watching 'Your Name' with fellow anime fans!",
  },
  {
    id: 2,
    title: "Gaming Tournament: Smash Bros Ultimate",
    date: "Next Saturday, 2 PM",
    attendees: 256,
    cover: "https://britishesports.org/wp-content/uploads/H2x1_NSwitch_SuperSmashBrosUltimate_02_image1600w.jpg",
    location: "GameHub Arena",
    description: "Compete in our monthly Smash tournament with prizes for top players!",
  },
  {
    id: 3,
    title: "Manga Reading Club: Chainsaw Man",
    date: "Sunday, 4 PM",
    attendees: 128,
    cover: "https://www.themarysue.com/wp-content/uploads/2021/05/Chainsaw-Man-feature-image.jpg?resize=1200%2C675",
    location: "Virtual Event",
    description: "Discussing volumes 1-3 of Chainsaw Man - newcomers welcome!",
  },
];

// Expanded communities data
const communities = [
  {
    id: 1,
    name: "Anime Enthusiasts",
    members: "125.2K",
    cover: "https://i.ytimg.com/vi/tyHAI-70DSg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDLXe7nplN4VOkG2BmsBSZdecaFWg",
    description: "For discussion of all things anime - from classics to current seasons!",
    posts: "850+ daily",
  },
  {
    id: 2,
    name: "Gaming Universe",
    members: "224.5K",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDnxoXY40T1P-2HzuOVC6Hcio8Qn9f8CVVA&s",
    description: "From RPGs to FPS, mobile to PC - all gamers welcome here!",
    posts: "1.2K+ daily",
  },
  {
    id: 3,
    name: "Cosplay Creators",
    members: "78.3K",
    cover: "https://i.insider.com/650af7fdbf943d00195c54fc?width=700",
    description: "Share your cosplay creations, WIPs, and get feedback!",
    posts: "320+ daily",
  },
  {
    id: 4,
    name: "Manga Collectors",
    members: "98.7K",
    cover: "https://artoffatherhood.net/wp-content/uploads/2021/08/CollectoroftheWeekMain.png",
    description: "Show off your collection, discuss releases, and find rare volumes!",
    posts: "450+ daily",
  },
];

// Trending tags
const trendingTags = [
  { name: "JujutsuKaisen", posts: "15.4K" },
  { name: "Genshin", posts: "12.8K" },
  { name: "AttackOnTitan", posts: "10.2K" },
  { name: "Cosplay", posts: "8.7K" },
  { name: "DemonSlayer", posts: "7.9K" },
  { name: "OnePiece", posts: "6.5K" },
];

// Add thread type definition
interface Thread {
  id: number;
  title: string;
  content: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: ThreadComment[];
  tags: string[];
  isPinned?: boolean;
  isLocked?: boolean;
  views: number;
  userVote?: 'up' | 'down' | null;
}

interface ThreadComment {
  id: number;
  content: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies: ThreadComment[];
  userVote?: 'up' | 'down' | null;
}

// Sample thread data
const threads: Thread[] = [
  {
    id: 1,
    title: "What's your favorite anime of all time and why?",
    content: "I'm curious to hear everyone's picks for their all-time favorite anime series. Please share what makes it special to you! For me, it's Steins;Gate because of its incredible story and character development.",
    user: {
      name: "AnimeExplorer",
      username: "@anime_explorer",
      avatar: "https://i.pinimg.com/736x/c4/f7/ec/c4f7ec378b85397fda2bb1181c2c4287.jpg",
      verified: true
    },
    createdAt: "2h ago",
    upvotes: 324,
    downvotes: 12,
    views: 1205,
    comments: [
      {
        id: 1,
        content: "Full Metal Alchemist: Brotherhood for me. The way it combines action, philosophy, and emotion is unmatched.",
        user: {
          name: "MangaMaster",
          username: "@manga_master",
          avatar: "https://m5.imhentai.xxx/017/69tmg0ixj4/thumb.jpg",
          verified: false
        },
        createdAt: "1h ago",
        upvotes: 56,
        downvotes: 2,
        replies: []
      }
    ],
    tags: ["Discussion", "Anime", "Favorites"],
    isPinned: true
  },
  {
    id: 2,
    title: "Breaking: Studio Ghibli announces new film project!",
    content: "Studio Ghibli just announced their next project, set to release in 2025. It will be directed by Hayao Miyazaki's son, Goro Miyazaki.",
    user: {
      name: "AnimeNewsDaily",
      username: "@anime_news",
      avatar: "https://m.media-amazon.com/images/I/316DLaUn+nL.jpg",
      verified: true
    },
    createdAt: "5h ago",
    upvotes: 892,
    downvotes: 15,
    views: 3420,
    comments: [],
    tags: ["News", "StudioGhibli", "Announcement"],
    isPinned: false
  }
];

export default function CommunityPage() {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("trending");
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to handle voting
  const handleVote = (threadId: number, voteType: 'up' | 'down') => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        const currentVote = thread.userVote;
        
        if (currentVote === voteType) {
          // Remove vote if clicking same button
          thread.userVote = null;
          if (voteType === 'up') thread.upvotes--;
          else thread.downvotes--;
        } else {
          // Change vote
          if (currentVote === 'up') thread.upvotes--;
          if (currentVote === 'down') thread.downvotes--;
          
          thread.userVote = voteType;
          if (voteType === 'up') thread.upvotes++;
          else thread.downvotes++;
        }
      }
      return thread;
    });
  };

  // Function to create new thread
  const createThread = () => {
    if (!threadTitle || !threadContent) return;
    
    const newThread: Thread = {
      id: threads.length + 1,
      title: threadTitle,
      content: threadContent,
      user: {
        name: "CurrentUser",
        username: "@current_user",
        avatar: "https://source.unsplash.com/random/100x100?face=1",
        verified: false
      },
      createdAt: "Just now",
      upvotes: 0,
      downvotes: 0,
      views: 0,
      comments: [],
      tags: selectedTags,
      isPinned: false
    };
    
    threads.unshift(newThread);
    setThreadTitle("");
    setThreadContent("");
    setSelectedTags([]);
    setShowThreadModal(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="relative">
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-primary/30"
            animate={{ 
              rotate: 360,
              borderWidth: [4, 2, 4],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-primary"
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "linear" 
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut" 
            }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                delay: 0.2,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          <motion.div 
            className="mt-6 text-center text-lg font-medium text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={withAnimeTheme("min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95")}>
      <AnimeThemeStyles />
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={fadeInUp}
        >
          <AnimeTitle className="text-4xl">COMMUNITY</AnimeTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search community..."
                className="w-64 pl-10 anime-input"
            />
            </div>
            <AnimeButton>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Find Communities
            </Button>
            </AnimeButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <AnimeCard className="overflow-hidden">
              <div className="p-4">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <img src="https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg" alt="Your avatar" />
                  </Avatar>
                  <div className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 text-muted-foreground"
                      onClick={() => setShowThreadModal(true)}
                    >
                      Start a discussion thread...
                    </Button>
                  </div>
                </div>
              </div>
            </AnimeCard>

            <Tabs defaultValue="trending" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="w-full anime-gradient-border">
                <TabsTrigger value="trending" className="flex-1 font-bold text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  TRENDING
                </TabsTrigger>
                <TabsTrigger value="latest" className="flex-1 font-bold text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  LATEST
                </TabsTrigger>
                <TabsTrigger value="following" className="flex-1 font-bold text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  FOLLOWING
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4 mt-4">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {threads.map((thread) => (
                    <motion.div key={thread.id} variants={cardAnimation}>
                      <AnimeCard className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center space-y-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "p-0 h-auto",
                                  thread.userVote === 'up' && "text-primary"
                                )}
                                onClick={() => handleVote(thread.id, 'up')}
                              >
                                <ChevronUp className="w-6 h-6" />
                              </Button>
                              <span className="text-sm font-medium">
                                {thread.upvotes - thread.downvotes}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "p-0 h-auto",
                                  thread.userVote === 'down' && "text-destructive"
                                )}
                                onClick={() => handleVote(thread.id, 'down')}
                              >
                                <ChevronDown className="w-6 h-6" />
                              </Button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="w-6 h-6">
                                  <img src={thread.user.avatar} alt={thread.user.name} />
                                </Avatar>
                                <span className="font-bold text-sm">{thread.user.name}</span>
                                {thread.user.verified && (
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                )}
                                <span className="text-muted-foreground text-sm">
                                  {thread.user.username}
                                </span>
                                <span className="text-muted-foreground text-sm">·</span>
                                <span className="text-muted-foreground text-sm">{thread.createdAt}</span>
                                {thread.isPinned && (
                                  <Badge variant="outline" className="ml-auto text-xs">
                                    Pinned
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-lg font-bold mb-2">{thread.title}</h3>
                              <p className="mb-3 whitespace-pre-line">{thread.content}</p>
                              
                              {thread.tags && thread.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {thread.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="anime-badge">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-4 mt-4">
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{thread.comments.length} Comments</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Eye className="w-4 h-4" />
                                  <span>{thread.views} Views</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Share className="w-4 h-4" />
                                  Share
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                                  <Bookmark className="w-4 h-4" />
                                  Save
                                </Button>
                              </div>

                              {thread.comments.length > 0 && (
                                <div className="mt-4 pl-6 border-l-2 border-border">
                                  {thread.comments.map((comment) => (
                                    <div key={comment.id} className="mb-4">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Avatar className="w-6 h-6">
                                          <img src={comment.user.avatar} alt={comment.user.name} />
                                        </Avatar>
                                        <span className="font-bold text-sm">{comment.user.name}</span>
                                        {comment.user.verified && (
                                          <CheckCircle className="w-4 h-4 text-blue-500" />
                                        )}
                                        <span className="text-muted-foreground text-sm">
                                          {comment.user.username}
                                        </span>
                                        <span className="text-muted-foreground text-sm">·</span>
                                        <span className="text-muted-foreground text-sm">
                                          {comment.createdAt}
                                        </span>
                                      </div>
                                      <p className="text-sm ml-8">{comment.content}</p>
                                      <div className="flex items-center gap-4 mt-2 ml-8">
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                          <ChevronUp className="w-4 h-4" />
                                          <span className="ml-1">{comment.upvotes}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                          <ChevronDown className="w-4 h-4" />
                                          <span className="ml-1">{comment.downvotes}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </AnimeCard>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="latest" className="mt-4">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Calendar className="w-16 h-16 mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">Latest Posts</h3>
                  <p className="text-muted-foreground max-w-md">
                    Switch to this tab to see the most recent posts from the community, sorted by date.
                  </p>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="following" className="mt-4">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Users className="w-16 h-16 mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">Following Feed</h3>
                  <p className="text-muted-foreground max-w-md">
                    Follow your favorite community members to see their posts in this personalized feed.
                  </p>
                  <Button className="mt-4">
                    <Users className="w-4 h-4 mr-2" />
                    Find People to Follow
                  </Button>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {/* Trending Tags */}
            <AnimeCard className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold anime-subtitle">TRENDING TAGS</h2>
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <ScrollArea className="h-[180px] pr-4">
                  <div className="space-y-3">
                    {trendingTags.map((tag) => (
                      <div 
                        key={tag.name} 
                        className="flex items-center justify-between py-2 border-b border-border/30 hover:bg-background/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-medium">#{tag.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-background/50">
                          {tag.posts} posts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </AnimeCard>

            {/* Upcoming Events */}
            <AnimeCard className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold anime-subtitle">UPCOMING EVENTS</h2>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
                <ScrollArea className="h-[320px]">
              <div className="space-y-4">
                {events.map((event) => (
                      <motion.div 
                        key={event.id} 
                        className="space-y-2"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                    <img
                      src={event.cover}
                      alt={event.title}
                            className="w-full h-32 object-cover rounded-lg anime-gradient-border"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg">
                            <div className="absolute bottom-2 left-2">
                              <Badge className="bg-primary/80 hover:bg-primary anime-badge">
                                {event.date}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-bold anime-subtitle text-sm">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Globe className="w-3 h-3" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Users className="w-3 h-3" />
                            {event.attendees} attending
                          </span>
                    </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </AnimeCard>

            {/* Popular Communities */}
            <AnimeCard className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold anime-subtitle">POPULAR COMMUNITIES</h2>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
                <ScrollArea className="h-[320px]">
              <div className="space-y-4">
                {communities.map((community) => (
                      <motion.div 
                        key={community.id} 
                        className="space-y-2"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                    <img
                      src={community.cover}
                      alt={community.name}
                            className="w-full h-24 object-cover rounded-lg anime-gradient-border"
                    />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg flex items-end p-2">
                            <h3 className="font-bold text-sm">{community.name}</h3>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{community.description}</p>
                    <div className="flex items-center justify-between">
                          <Badge variant="outline" className="anime-badge bg-background/50">
                        {community.members} members
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {community.posts}
                      </span>
                    </div>
                        <AnimeButton className="w-full">
                          <Button variant="outline" size="sm" className="w-full">
                            Join Community
                          </Button>
                        </AnimeButton>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </AnimeCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Thread Creation Modal */}
      {showThreadModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">Create a New Thread</h2>
              <Input
                placeholder="Thread title"
                value={threadTitle}
                onChange={(e) => setThreadTitle(e.target.value)}
                className="anime-input"
              />
              <textarea
                placeholder="What's on your mind?"
                value={threadContent}
                onChange={(e) => setThreadContent(e.target.value)}
                className="w-full h-32 p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex flex-wrap gap-2">
                {["Discussion", "News", "Question", "Art", "Review", "Recommendation"].map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowThreadModal(false)}>
                  Cancel
                </Button>
                <Button onClick={createThread}>
                  Create Thread
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}