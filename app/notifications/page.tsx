"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Bookmark, 
  Bell, 
  Star, 
  Gift, 
  Calendar, 
  Trophy, 
  ThumbsUp, 
  Flame,
  Check,
  Clock,
  X,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle
} from "@/components/anime-theme";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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

// Define notification type
interface Notification {
  id: number;
  type: string;
  read: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  post?: string;
  comment?: string;
  image?: string;
  event?: {
    title: string;
    date: string;
    location: string;
  };
  recommendation?: {
    title: string;
    image: string;
    rating: string;
  };
  achievement?: {
    title: string;
    description: string;
    icon: string;
  };
}

// Define notification type colors
const typeColors = {
  like: "text-red-500 bg-red-500/5",
  follow: "text-blue-500 bg-blue-500/5",
  comment: "text-green-500 bg-green-500/5",
  mention: "text-purple-500 bg-purple-500/5",
  bookmark: "text-yellow-500 bg-yellow-500/5",
  event: "text-indigo-500 bg-indigo-500/5",
  recommendation: "text-amber-500 bg-amber-500/5",
  achievement: "text-emerald-500 bg-emerald-500/5"
};

const notifications = [
  {
    id: 1,
    type: "like",
    read: false,
    user: {
      name: "Aiko Tanaka",
      avatar: "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg",
    },
    content: "liked your post",
    time: "2 minutes ago",
    post: "My new manga collection just arrived!",
    image: "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 2,
    type: "follow",
    read: false,
    user: {
      name: "Kento Yamazaki",
      avatar: "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg",
    },
    content: "started following you",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "comment",
    read: false,
    user: {
      name: "Mei Nagano",
      avatar: "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg",
    },
    content: "commented on your post",
    comment: "This is awesome! Where did you get it?",
    time: "3 hours ago",
    post: "Check out this limited edition figure!",
    image: "https://www.yachtscroatia.com/wp-content/uploads/2021/12/pagani-huayra-tricolore-side-view.jpg"
  },
  {
    id: 4,
    type: "mention",
    read: true,
    user: {
      name: "Takeru Satoh",
      avatar: "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg",
    },
    content: "mentioned you in a comment",
    comment: "I think @user would love this anime too!",
    time: "5 hours ago",
    post: "Just finished watching Demon Slayer",
    image: "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 5,
    type: "event",
    read: true,
    content: "New anime convention announced!",
    time: "Yesterday",
    event: {
      title: "AnimeExpo 2023",
      date: "Dec 15-17, 2023",
      location: "Tokyo, Japan"
    }
  },
  {
    id: 6,
    type: "recommendation",
    read: true,
    content: "New recommendation based on your interests",
    time: "Yesterday",
    recommendation: {
      title: "Jujutsu Kaisen Season 2",
      image: "https://m.media-amazon.com/images/M/MV5BNmI1MmYxNWQtY2E5NC00ZTlmLWIzZGEtNzM1YmE3NDA5NzhjXkEyXkFqcGc@._V1_.jpg",
      rating: "9.8/10"
    }
  },
  {
    id: 7,
    type: "bookmark",
    read: true,
    user: {
      name: "Yui Aragaki",
      avatar: "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg",
    },
    content: "bookmarked your post",
    time: "2 days ago",
    post: "My review of the latest One Piece chapter",
    image: "https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 8,
    type: "achievement",
    read: true,
    content: "You've earned a new badge!",
    time: "3 days ago",
    achievement: {
      title: "Anime Connoisseur",
      description: "Watched over 100 anime series",
      icon: "trophy"
    }
  }
];

// Group notifications by day
const groupNotificationsByDay = (notifs: Notification[]) => {
  const groups: Record<string, Notification[]> = {
    "Today": [],
    "Yesterday": [],
    "This Week": [],
    "Earlier": []
  };
  
  notifs.forEach(notif => {
    if (notif.time.includes("minute") || notif.time.includes("hour")) {
      groups["Today"].push(notif);
    } else if (notif.time.includes("Yesterday")) {
      groups["Yesterday"].push(notif);
    } else if (notif.time.includes("day")) {
      groups["This Week"].push(notif);
    } else {
      groups["Earlier"].push(notif);
    }
  });
  
  return groups;
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifs([]);
  };

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifs;
    if (activeTab === "unread") return notifs.filter(n => !n.read);
    return notifs.filter(n => n.type === activeTab);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart className="text-red-500" />;
      case "follow": return <UserPlus className="text-blue-500" />;
      case "comment": return <MessageCircle className="text-green-500" />;
      case "mention": return <Bell className="text-purple-500" />;
      case "bookmark": return <Bookmark className="text-yellow-500" />;
      case "event": return <Calendar className="text-indigo-500" />;
      case "recommendation": return <Star className="text-amber-500" />;
      case "achievement": return <Trophy className="text-emerald-500" />;
      default: return <Bell className="text-primary" />;
    }
  };
  
  const groupedNotifications = groupNotificationsByDay(getFilteredNotifications());

  return (
    <div className={withAnimeTheme("min-h-screen bg-background")}>
      <AnimeThemeStyles />
      <div className="max-w-3xl mx-auto p-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AnimeTitle className="text-3xl">NOTIFICATIONS</AnimeTitle>
              {unreadCount > 0 && (
                <Badge className="bg-primary text-white px-3 py-1 rounded-full text-sm anime-badge animate-pulse">
                  {unreadCount} NEW
                </Badge>
              )}
      </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  onClick={markAllAsRead} 
                  variant="outline" 
                  size="sm"
                  className="anime-button flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                </Button>
              )}
              
              <Button 
                onClick={clearAllNotifications}
                variant="outline" 
                size="sm"
                className="anime-button flex items-center gap-1 hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear all</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Card className="overflow-hidden p-0 anime-card shadow-md">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-border/30 bg-background/50 backdrop-blur-sm">
                <div className="px-4 pt-3 pb-0">
                  <TabsList className="w-full bg-background/20 backdrop-blur-sm p-1 rounded-lg mb-3">
                    <TabsTrigger value="all" className="anime-button data-[state=active]:bg-primary data-[state=active]:text-white">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="anime-button data-[state=active]:bg-primary data-[state=active]:text-white">
                      Unread {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                    <TabsTrigger value="like" className="anime-button data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Heart className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Likes</span>
                    </TabsTrigger>
                    <TabsTrigger value="comment" className="anime-button data-[state=active]:bg-primary data-[state=active]:text-white">
                      <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Comments</span>
                    </TabsTrigger>
                    <TabsTrigger value="follow" className="anime-button data-[state=active]:bg-primary data-[state=active]:text-white">
                      <UserPlus className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Follows</span>
                    </TabsTrigger>
        </TabsList>
                </div>
              </div>

              <TabsContent value={activeTab} className="focus-visible:outline-none mt-0">
                <ScrollArea className="h-[calc(100vh-240px)]">
                  {Object.keys(groupedNotifications).map(day => (
                    groupedNotifications[day].length > 0 ? (
                      <div key={day} className="px-4 py-2">
                        <div className="sticky top-0 z-10 py-2 bg-background/70 backdrop-blur-sm">
                          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center">
                            {day}
                            <div className="h-[1px] flex-1 bg-border/40 ml-2"></div>
                          </h3>
                        </div>
                        
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="space-y-3 mt-2"
                        >
                          {groupedNotifications[day].map((notification: Notification) => (
                            <motion.div 
                              key={notification.id}
                              variants={fadeIn}
                              className="group"
                            >
                              <Card className={cn(
                                "p-3 transition-all duration-300 overflow-hidden relative",
                                "hover:bg-background/30 border border-transparent",
                                notification.read 
                                  ? "bg-background/20" 
                                  : "bg-background/30 border-l-2 border-l-primary/70"
                              )}>
                                <div className="flex gap-3">
                                  {/* Avatar/Icon */}
                                  <div className="flex-shrink-0">
                                    {notification.user ? (
                                      <Avatar className={cn(
                                        "w-10 h-10 border-2", 
                                        notification.read 
                                          ? "border-transparent" 
                                          : "border-primary/20"
                                      )}>
                                        <img 
                                          src={notification.user.avatar} 
                                          alt={notification.user.name}
                                          className="object-cover" 
                                        />
                  </Avatar>
                                    ) : (
                                      <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center",
                                        typeColors[notification.type as keyof typeof typeColors]
                                      )}>
                                        {getNotificationIcon(notification.type)}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                                      {notification.user && (
                                        <span className="font-bold truncate">{notification.user.name}</span>
                                      )}
                                      <span className="text-sm text-muted-foreground truncate">{notification.content}</span>
                                    </div>
                                    
                                    <div className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-1">
                                      <Clock className="w-3 h-3" /> {notification.time}
                    </div>
                                    
                                    {/* Post/Comment */}
                                    {(notification.post || notification.comment) && (
                                      <div className="mt-2 p-2 rounded text-sm bg-background/20 border border-border/10">
                    {notification.post && (
                                          <p className="text-muted-foreground/90 truncate">{notification.post}</p>
                    )}
                    {notification.comment && (
                                          <p className="italic text-muted-foreground/80 mt-1">"{notification.comment}"</p>
                    )}
                  </div>
                                    )}
                                    
                                    {/* Media (if present) */}
                                    {notification.image && (
                                      <div className="mt-2">
                                        <img 
                                          src={notification.image} 
                                          alt="Content thumbnail" 
                                          className="w-16 h-16 object-cover rounded-md shadow-sm hover:scale-105 transition-transform cursor-pointer"
                                        />
                                      </div>
                                    )}
                                    
                                    {/* Event Card */}
                                    {notification.event && (
                                      <div className="mt-2 p-2 rounded bg-background/20 border border-border/10">
                                        <p className="font-bold text-sm">{notification.event.title}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                                          <Calendar className="w-3 h-3" />
                                          <span>{notification.event.date}</span>
                                          <span>•</span>
                                          <span>{notification.event.location}</span>
                                        </div>
                                        <Button size="sm" className="mt-2 anime-button bg-primary/70 hover:bg-primary/90">RSVP</Button>
                                      </div>
                                    )}
                                    
                                    {/* Recommendation Card */}
                                    {notification.recommendation && (
                                      <div className="mt-2 p-2 rounded flex gap-2 bg-background/20 border border-border/10">
                                        <img 
                                          src={notification.recommendation.image} 
                                          alt={notification.recommendation.title} 
                                          className="w-12 h-16 object-cover rounded"
                                        />
                                        <div>
                                          <p className="font-bold text-sm">{notification.recommendation.title}</p>
                                          <div className="flex items-center gap-1 mt-1 text-xs">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span>{notification.recommendation.rating}</span>
                                          </div>
                                          <Button size="sm" variant="outline" className="mt-2 h-7 px-2 py-0 anime-button">
                                            Watch Now
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Achievement Card */}
                                    {notification.achievement && (
                                      <div className="mt-2 p-2 rounded bg-background/30 border border-border/10">
                                        <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-yellow-500" />
                                          </div>
                                          <div>
                                            <AnimeGradientText className="font-bold text-sm">{notification.achievement.title}</AnimeGradientText>
                                            <p className="text-xs text-muted-foreground">{notification.achievement.description}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Follow Action */}
                                    {notification.type === "follow" && !notification.read && (
                                      <div className="mt-2 flex gap-2">
                                        <Button 
                                          className="anime-button bg-primary/60 hover:bg-primary/80 flex-1" 
                                          size="sm"
                                        >
                                          Follow Back
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex flex-col gap-1">
                                      {!notification.read && (
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-6 w-6 p-0 rounded-full" 
                                          onClick={() => markAsRead(notification.id)}
                                        >
                                          <Check className="h-3 w-3" />
                                          <span className="sr-only">Mark as read</span>
                                        </Button>
                                      )}
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-6 w-6 p-0 rounded-full hover:bg-red-500/10 hover:text-red-500" 
                                        onClick={() => removeNotification(notification.id)}
                                      >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove</span>
                                      </Button>
                                    </div>
                                  </div>
                </div>
              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    ) : null
                  ))}
                  
                  {/* Empty State */}
                  {getFilteredNotifications().length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                      <Bell className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-bold">No notifications</h3>
                      <p className="text-muted-foreground mt-1">
                        {activeTab === "all" 
                          ? "You don't have any notifications yet" 
                          : `You don't have any ${activeTab} notifications`}
                      </p>
          </div>
                  )}
                </ScrollArea>
        </TabsContent>
      </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}