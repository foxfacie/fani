"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bookmark, 
  Grid, 
  Activity, 
  MessageCircle, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Verified 
} from "lucide-react";
import { AnimatedLogo } from "@/components/animated-logo";
import { motion } from "framer-motion";

// Mock data for the profile
const profileData = {
  username: "animefan_42",
  displayName: "Alex Johnson",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2R4i9BCK20qjU2PIIYtwZh9joLY7Zwt45wTOKPAP3SSZ73PtAERnQl7Q0WAxSYMLqoFs&usqp=CAU",
  coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9ac12e122227341.60d50d494c25a.png",
  bio: "Anime enthusiast | Digital artist | Cosplayer\nJoined Fanmix in 2023",
  verified: true,
  stats: {
    posts: 86,
    followers: 1243,
    following: 573
  }
};

// Mock data for posts
const posts = [
  {
    id: 1,
    image: "https://i.ytimg.com/vi/s9ndf3N0-LA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBPTdJ6qBLkg6tdM56aD2O1EaQ-gA",
    description: "Just finished watching Attack on Titan finale! What an incredible journey! #AOT #anime",
    likes: 124,
    comments: 32,
    date: "2 days ago"
  },
  {
    id: 2,
    image: "https://www.billboard.com/wp-content/uploads/2024/05/Demon-Slayer-Hashira-Training-Crunchyroll-Featured.jpg",
    description: "My Demon Slayer fanart took me 20 hours to complete 🔥 #demonslayer #tanjiro #digitalart",
    likes: 246,
    comments: 47,
    date: "1 week ago"
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/M/MV5BNjRhZGM2NTQtMzgzMC00YjdiLWI4NzctMTgwYmE3ZDc1ZGI2XkEyXkFqcGc@._V1_QL75_UX500_CR0,0,500,281_.jpg",
    description: "Jujutsu Kaisen Season 2 has the best animation I've ever seen! #jjk #gojo",
    likes: 315,
    comments: 58,
    date: "2 weeks ago"
  },
  {
    id: 4,
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740581/chainsaw-man-vol-12-9781974740581_hr.jpg",
    description: "My Makima cosplay from Chainsaw Man! What do you think? #chainsawman #makima #cosplay",
    likes: 428,
    comments: 73,
    date: "3 weeks ago"
  },
  {
    id: 5,
    image: "https://www.toei-animation.com/wp-content/uploads/2019/02/one_piece_product.jpg",
    description: "One Piece reached 1000 episodes and I'm still watching! Best anime ever! #onepiece #luffy",
    likes: 189,
    comments: 41,
    date: "1 month ago"
  },
  {
    id: 6,
    image: "https://rukminim2.flixcart.com/image/850/1000/kz4gh3k0/poster/l/1/g/medium-one-punch-man-saitama-one-punch-man-matte-finish-poster-original-imagb787k93huvvk.jpeg",
    description: "My anime figure collection keeps growing... My wallet keeps shrinking 😅 #figures #collection #otaku",
    likes: 203,
    comments: 37,
    date: "1 month ago"
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Cover Photo */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={profileData.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Profile Info Section */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 -mt-24 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <img 
              src={profileData.avatar} 
              alt={profileData.displayName} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 mt-4 md:mt-12">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{profileData.displayName}</h1>
              {profileData.verified && (
                <Badge variant="secondary" className="bg-blue-500 text-white">
                  <Verified className="w-4 h-4 mr-1" /> Verified
                </Badge>
              )}
            </div>
            
            <div className="text-muted-foreground mb-4">
              @{profileData.username}
            </div>
            
            <div className="flex flex-wrap gap-8 mb-4">
              <div>
                <span className="font-bold">{profileData.stats.posts}</span> Posts
              </div>
              <div>
                <span className="font-bold">{profileData.stats.followers}</span> Followers
              </div>
              <div>
                <span className="font-bold">{profileData.stats.following}</span> Following
              </div>
            </div>
            
            <p className="whitespace-pre-line text-muted-foreground mb-4">
              {profileData.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 md:mt-12">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="mt-8"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Posts Grid */}
          <TabsContent value="posts">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Card className="overflow-hidden">
                    {/* Post Image */}
                    <div className="relative aspect-square">
                      <img 
                        src={post.image} 
                        alt={`Post ${post.id}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src={profileData.avatar} 
                            alt={profileData.username} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-semibold">{profileData.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      
                      <p className="mb-3 text-sm line-clamp-2">{post.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button>
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button>
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <p>Your saved posts will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <p>Your recent activity will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}