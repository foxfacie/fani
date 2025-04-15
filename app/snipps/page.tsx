"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  PlayCircle, PauseCircle, Volume2, VolumeX, 
  ChevronUp, ChevronDown, MoreVertical
} from "lucide-react";
import {
  fadeIn,
  staggerContainer,
  popUp,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "@/components/animation-variants";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle 
} from "@/components/anime-theme";
import LoadingAnimation from "@/components/LoadingAnimation";
import { cn } from "@/lib/utils";

// Define asset paths
const ASSET_BASE = "/assets/snipps";

// Add these interfaces at the top
interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followers: number;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  timestamp: string;
}

interface Snipp {
  id: number;
  user: User;
  caption: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: Comment[];
  shares: number;
  saved: boolean;
  audio: string;
  tags: string[];
  duration: number;
  views: number;
  timestamp: string;
}

// Update the snippsData with more realistic data
const snippsData: Snipp[] = [
  {
    id: 1,
    user: {
      id: "user1",
      name: "AnimeGirl24",
      avatar: `${ASSET_BASE}/avatars/avatar1.jpg`,
      isVerified: true,
      followers: 125000
    },
    caption: "Just finished this epic scene! What do you think of my animation skills? #AnimeCreator #DigitalArt",
    videoUrl: `http://videohostconnection.wuaze.com/1.mp4`,
    thumbnailUrl: `http://videohostconnection.wuaze.com/img.jpg`,
    likes: 15432,
    comments: [
      {
        id: "comment1",
        user: {
          id: "user2",
          name: "MangaFan",
          avatar: `${ASSET_BASE}/avatars/avatar2.jpg`,
          isVerified: false,
          followers: 5000
        },
        text: "This is amazing! The animation is so smooth!",
        likes: 234,
        timestamp: "2h ago"
      },
      {
        id: "comment2",
        user: {
          id: "user3",
          name: "AnimePro",
          avatar: `${ASSET_BASE}/avatars/avatar3.jpg`,
          isVerified: true,
          followers: 50000
        },
        text: "Great work! The character design is on point!",
        likes: 156,
        timestamp: "1h ago"
      }
    ],
    shares: 432,
    saved: true,
    audio: "Original Sound - AnimeGirl24",
    tags: ["AnimeCreator", "DigitalArt", "Animation"],
    duration: 15,
    views: 125000,
    timestamp: "3h ago"
  },
  {
    id: 2,
    user: {
      id: "user4",
      name: "MangaRobot",
      avatar: `${ASSET_BASE}/avatars/avatar2.jpg`,
      isVerified: false,
      followers: 25000
    },
    caption: "This new anime opening is fire! Had to recreate this scene from the latest episode 🔥",
    videoUrl: `${ASSET_BASE}/videos/video2.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb2.jpg`,
    likes: 8743,
    comments: [
      {
        id: "comment3",
        user: {
          id: "user5",
          name: "AnimeFan",
          avatar: `${ASSET_BASE}/avatars/avatar4.jpg`,
          isVerified: false,
          followers: 1000
        },
        text: "The animation is so smooth!",
        likes: 45,
        timestamp: "1h ago"
      }
    ],
    shares: 123,
    saved: false,
    audio: "Anime Opening Theme - Season 5",
    tags: ["AnimeOpening", "FanArt", "DrawingProcess"],
    duration: 20,
    views: 50000,
    timestamp: "5h ago"
  },
  {
    id: 3,
    user: {
      id: "user6",
      name: "SakuraCosplay",
      avatar: `${ASSET_BASE}/avatars/avatar3.jpg`,
      isVerified: true,
      followers: 75000
    },
    caption: "My Sakura cosplay photoshoot! What character should I do next?",
    videoUrl: `${ASSET_BASE}/videos/video3.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb3.jpg`,
    likes: 23567,
    comments: [
      {
        id: "comment4",
        user: {
          id: "user7",
          name: "CosplayPro",
          avatar: `${ASSET_BASE}/avatars/avatar5.jpg`,
          isVerified: true,
          followers: 100000
        },
        text: "Amazing cosplay! You should do Hinata next!",
        likes: 89,
        timestamp: "2h ago"
      }
    ],
    shares: 578,
    saved: true,
    audio: "Naruto OST - Sakura's Theme",
    tags: ["Cosplay", "Sakura", "Naruto", "AnimeConvention"],
    duration: 30,
    views: 150000,
    timestamp: "1d ago"
  },
  {
    id: 4,
    user: {
      id: "user8",
      name: "OtakuWorld",
      avatar: `${ASSET_BASE}/avatars/avatar4.jpg`,
      isVerified: true,
      followers: 200000
    },
    caption: "Here's my manga collection tour! Been collecting for over 10 years now!",
    videoUrl: `${ASSET_BASE}/videos/video4.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb4.jpg`,
    likes: 32156,
    comments: [
      {
        id: "comment5",
        user: {
          id: "user9",
          name: "MangaCollector",
          avatar: `${ASSET_BASE}/avatars/avatar6.jpg`,
          isVerified: false,
          followers: 5000
        },
        text: "Impressive collection! What's your favorite series?",
        likes: 67,
        timestamp: "3h ago"
      }
    ],
    shares: 976,
    saved: false,
    audio: "Lofi Hip Hop - Manga Reading Beats",
    tags: ["MangaCollection", "Otaku", "BookShelfTour"],
    duration: 45,
    views: 200000,
    timestamp: "2d ago"
  },
  {
    id: 5,
    user: {
      id: "user10",
      name: "AnimeFanboy",
      avatar: `${ASSET_BASE}/avatars/avatar5.jpg`,
      isVerified: false,
      followers: 15000
    },
    caption: "My reaction to the plot twist in Attack on Titan season finale! No spoilers but OMG!!!",
    videoUrl: `${ASSET_BASE}/videos/video5.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb5.jpg`,
    likes: 45678,
    comments: [
      {
        id: "comment6",
        user: {
          id: "user11",
          name: "AOTFan",
          avatar: `${ASSET_BASE}/avatars/avatar7.jpg`,
          isVerified: true,
          followers: 30000
        },
        text: "I know right! That twist was insane!",
        likes: 123,
        timestamp: "1h ago"
      }
    ],
    shares: 2143,
    saved: true,
    audio: "Attack on Titan OST - Final Season",
    tags: ["AttackOnTitan", "AnimeReaction", "SeasonFinale"],
    duration: 25,
    views: 300000,
    timestamp: "1d ago"
  },
  {
    id: 6,
    user: {
      id: "user12",
      name: "MangaArtist",
      avatar: `${ASSET_BASE}/avatars/avatar6.jpg`,
      isVerified: true,
      followers: 85000
    },
    caption: "Time-lapse of me drawing this week's manga chapter! 20 hours of work in 30 seconds!",
    videoUrl: `${ASSET_BASE}/videos/video6.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb6.jpg`,
    likes: 18934,
    comments: [
      {
        id: "comment7",
        user: {
          id: "user13",
          name: "ArtFan",
          avatar: `${ASSET_BASE}/avatars/avatar8.jpg`,
          isVerified: false,
          followers: 3000
        },
        text: "Your drawing skills are amazing! What pen do you use?",
        likes: 78,
        timestamp: "5h ago"
      }
    ],
    shares: 321,
    saved: false,
    audio: "Time-lapse Background Music",
    tags: ["MangaArtist", "DrawingTimelapse", "BehindTheScenes"],
    duration: 30,
    views: 125000,
    timestamp: "2d ago"
  },
  {
    id: 7,
    user: {
      id: "user14",
      name: "VoiceActorPro",
      avatar: `${ASSET_BASE}/avatars/avatar7.jpg`,
      isVerified: true,
      followers: 120000
    },
    caption: "Voice acting session for the new isekai anime coming next season! Can you guess which character I'm playing?",
    videoUrl: `${ASSET_BASE}/videos/video7.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb7.jpg`,
    likes: 29876,
    comments: [
      {
        id: "comment8",
        user: {
          id: "user15",
          name: "VoiceActingFan",
          avatar: `${ASSET_BASE}/avatars/avatar9.jpg`,
          isVerified: false,
          followers: 2000
        },
        text: "You sound amazing! Can't wait for the anime!",
        likes: 145,
        timestamp: "6h ago"
      }
    ],
    shares: 765,
    saved: true,
    audio: "Original Recording - VoiceActorPro",
    tags: ["VoiceActing", "AnimeVA", "BehindTheScenes", "Isekai"],
    duration: 40,
    views: 180000,
    timestamp: "3d ago"
  },
  {
    id: 8,
    user: {
      id: "user16",
      name: "AnimeCon",
      avatar: `${ASSET_BASE}/avatars/avatar8.jpg`,
      isVerified: true,
      followers: 250000
    },
    caption: "Highlights from last weekend's anime convention! So many amazing cosplayers!",
    videoUrl: `${ASSET_BASE}/videos/video8.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb8.jpg`,
    likes: 37652,
    comments: [
      {
        id: "comment9",
        user: {
          id: "user17",
          name: "CosplayLover",
          avatar: `${ASSET_BASE}/avatars/avatar10.jpg`,
          isVerified: false,
          followers: 5000
        },
        text: "I was there! Such an amazing convention!",
        likes: 234,
        timestamp: "1d ago"
      }
    ],
    shares: 1098,
    saved: false,
    audio: "Convention Crowd Mix",
    tags: ["AnimeConvention", "Cosplay", "ConventionHighlights"],
    duration: 60,
    views: 300000,
    timestamp: "4d ago"
  },
  {
    id: 9,
    user: {
      id: "user18",
      name: "FigureCollector",
      avatar: `${ASSET_BASE}/avatars/avatar9.jpg`,
      isVerified: false,
      followers: 45000
    },
    caption: "My limited edition figure just arrived! Only 500 made worldwide!",
    videoUrl: `${ASSET_BASE}/videos/video9.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb9.jpg`,
    likes: 12543,
    comments: [
      {
        id: "comment10",
        user: {
          id: "user19",
          name: "FigureFan",
          avatar: `${ASSET_BASE}/avatars/avatar11.jpg`,
          isVerified: false,
          followers: 2500
        },
        text: "So jealous! I've been looking for that figure everywhere!",
        likes: 56,
        timestamp: "1d ago"
      }
    ],
    shares: 234,
    saved: true,
    audio: "Unboxing Excitement - Original",
    tags: ["FigureCollection", "Unboxing", "LimitedEdition"],
    duration: 25,
    views: 95000,
    timestamp: "3d ago"
  },
  {
    id: 10,
    user: {
      id: "user20",
      name: "AnimeChef",
      avatar: `${ASSET_BASE}/avatars/avatar10.jpg`,
      isVerified: true,
      followers: 180000
    },
    caption: "Made ramen from Naruto in real life! Here's my attempt at Ichiraku ramen!",
    videoUrl: `${ASSET_BASE}/videos/video10.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb10.jpg`,
    likes: 42198,
    comments: [
      {
        id: "comment11",
        user: {
          id: "user21",
          name: "RamenLover",
          avatar: `${ASSET_BASE}/avatars/avatar12.jpg`,
          isVerified: false,
          followers: 3000
        },
        text: "That looks delicious! Can you share the recipe?",
        likes: 189,
        timestamp: "12h ago"
      }
    ],
    shares: 1876,
    saved: true,
    audio: "Cooking ASMR - Original",
    tags: ["AnimeFood", "Ramen", "Naruto", "FoodRecreation"],
    duration: 45,
    views: 350000,
    timestamp: "2d ago"
  },
  {
    id: 11,
    user: {
      id: "user22",
      name: "AnimePianist",
      avatar: `${ASSET_BASE}/avatars/avatar11.jpg`,
      isVerified: true,
      followers: 90000
    },
    caption: "Playing the emotional OST from 'Your Lie in April' - this anime soundtrack always makes me cry 🎹😢",
    videoUrl: `${ASSET_BASE}/videos/video11.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb11.jpg`,
    likes: 28765,
    comments: [
      {
        id: "comment12",
        user: {
          id: "user23",
          name: "MusicLover",
          avatar: `${ASSET_BASE}/avatars/avatar13.jpg`,
          isVerified: false,
          followers: 5000
        },
        text: "This is beautiful! You're so talented!",
        likes: 124,
        timestamp: "8h ago"
      }
    ],
    shares: 987,
    saved: true,
    audio: "Your Lie in April Piano Cover",
    tags: ["AnimePiano", "YourLieInApril", "AnimeMusic", "PianoCover"],
    duration: 35,
    views: 200000,
    timestamp: "4d ago"
  },
  {
    id: 12,
    user: {
      id: "user24",
      name: "MangaTheory",
      avatar: `${ASSET_BASE}/avatars/avatar12.jpg`,
      isVerified: false,
      followers: 65000
    },
    caption: "My theory about the One Piece ending that will blow your mind! I think I figured out what the One Piece actually is!",
    videoUrl: `${ASSET_BASE}/videos/video12.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb12.jpg`,
    likes: 56789,
    comments: [
      {
        id: "comment13",
        user: {
          id: "user25",
          name: "OnePieceFan",
          avatar: `${ASSET_BASE}/avatars/avatar14.jpg`,
          isVerified: false,
          followers: 10000
        },
        text: "Mind blown! This makes so much sense!",
        likes: 345,
        timestamp: "2d ago"
      }
    ],
    shares: 2345,
    saved: false,
    audio: "One Piece Theme Remix",
    tags: ["OnePiece", "AnimeTheory", "MangaSpoilers"],
    duration: 55,
    views: 450000,
    timestamp: "1w ago"
  },
  {
    id: 13,
    user: {
      id: "user26",
      name: "AnimeDancer",
      avatar: `${ASSET_BASE}/avatars/avatar13.jpg`,
      isVerified: true,
      followers: 135000
    },
    caption: "Recreated the dance from the new spy anime opening! Took me 2 weeks to learn this choreography!",
    videoUrl: `${ASSET_BASE}/videos/video13.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb13.jpg`,
    likes: 34567,
    comments: [
      {
        id: "comment14",
        user: {
          id: "user27",
          name: "DanceFan",
          avatar: `${ASSET_BASE}/avatars/avatar15.jpg`,
          isVerified: false,
          followers: 8000
        },
        text: "Your moves are so perfect! Just like the anime!",
        likes: 231,
        timestamp: "3d ago"
      }
    ],
    shares: 1234,
    saved: true,
    audio: "Spy×Family Opening Theme",
    tags: ["AnimeDance", "DanceCover", "SpyFamily", "ChoreographyChallenge"],
    duration: 40,
    views: 280000,
    timestamp: "5d ago"
  },
  {
    id: 14,
    user: {
      id: "user28",
      name: "MechaFan",
      avatar: `${ASSET_BASE}/avatars/avatar14.jpg`,
      isVerified: false,
      followers: 45000
    },
    caption: "Built this mecha model from scratch! It's based on Gundam Wing and took over 3 months to complete 🤖",
    videoUrl: `${ASSET_BASE}/videos/video14.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb14.jpg`,
    likes: 19876,
    comments: [
      {
        id: "comment15",
        user: {
          id: "user29",
          name: "GundamCollector",
          avatar: `${ASSET_BASE}/avatars/avatar16.jpg`,
          isVerified: true,
          followers: 25000
        },
        text: "The detail on this is incredible! How did you paint it?",
        likes: 87,
        timestamp: "2d ago"
      }
    ],
    shares: 543,
    saved: false,
    audio: "Gundam Wing OST - Battle Theme",
    tags: ["Gundam", "MechaModel", "ModelBuilding", "GundamWing"],
    duration: 30,
    views: 150000,
    timestamp: "6d ago"
  },
  {
    id: 15,
    user: {
      id: "user30",
      name: "AnimeAmv",
      avatar: `${ASSET_BASE}/avatars/avatar15.jpg`,
      isVerified: true,
      followers: 220000
    },
    caption: "My latest AMV featuring Demon Slayer! Edited in 4K with custom effects! 🎬",
    videoUrl: `${ASSET_BASE}/videos/video15.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb15.jpg`,
    likes: 67890,
    comments: [
      {
        id: "comment16",
        user: {
          id: "user31",
          name: "VideoEditor",
          avatar: `${ASSET_BASE}/avatars/avatar17.jpg`,
          isVerified: true,
          followers: 40000
        },
        text: "The transitions in this AMV are so clean! What software did you use?",
        likes: 432,
        timestamp: "1d ago"
      }
    ],
    shares: 3210,
    saved: true,
    audio: "Demon Slayer AMV - Custom Edit",
    tags: ["AMV", "DemonSlayer", "VideoEditing", "AnimeMusic"],
    duration: 50,
    views: 500000,
    timestamp: "1w ago"
  },
  {
    id: 16,
    user: {
      id: "user32",
      name: "MangaTranslator",
      avatar: `${ASSET_BASE}/avatars/avatar16.jpg`,
      isVerified: true,
      followers: 75000
    },
    caption: "Behind the scenes of manga translation! Here's how we localize Japanese puns for English readers.",
    videoUrl: `${ASSET_BASE}/videos/video16.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb16.jpg`,
    likes: 12345,
    comments: [
      {
        id: "comment17",
        user: {
          id: "user33",
          name: "LanguageNerd",
          avatar: `${ASSET_BASE}/avatars/avatar18.jpg`,
          isVerified: false,
          followers: 8000
        },
        text: "This is fascinating! Japanese wordplay is so hard to translate.",
        likes: 56,
        timestamp: "1d ago"
      }
    ],
    shares: 432,
    saved: false,
    audio: "Original Audio - Translation Process",
    tags: ["MangaTranslation", "Localization", "BehindTheScenes", "LanguageFacts"],
    duration: 45,
    views: 120000,
    timestamp: "3d ago"
  },
  {
    id: 17,
    user: {
      id: "user34",
      name: "AnimeGamer",
      avatar: `${ASSET_BASE}/avatars/avatar17.jpg`,
      isVerified: false,
      followers: 95000
    },
    caption: "Playing the new Genshin Impact update! These new anime-style characters are amazing! 🎮",
    videoUrl: `${ASSET_BASE}/videos/video17.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb17.jpg`,
    likes: 45678,
    comments: [
      {
        id: "comment18",
        user: {
          id: "user35",
          name: "GenshinPlayer",
          avatar: `${ASSET_BASE}/avatars/avatar19.jpg`,
          isVerified: false,
          followers: 12000
        },
        text: "That new character looks so OP! What build are you using?",
        likes: 234,
        timestamp: "5h ago"
      }
    ],
    shares: 1567,
    saved: true,
    audio: "Genshin Impact OST - Battle Theme",
    tags: ["GenshinImpact", "AnimeGames", "GameplayFootage", "Gaming"],
    duration: 35,
    views: 280000,
    timestamp: "2d ago"
  },
  {
    id: 18,
    user: {
      id: "user36",
      name: "AnimeSongCover",
      avatar: `${ASSET_BASE}/avatars/avatar18.jpg`,
      isVerified: true,
      followers: 150000
    },
    caption: "Singing cover of 'Unravel' from Tokyo Ghoul! This song is so emotionally powerful! 🎤",
    videoUrl: `${ASSET_BASE}/videos/video18.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb18.jpg`,
    likes: 34562,
    comments: [
      {
        id: "comment19",
        user: {
          id: "user37",
          name: "MusicCritic",
          avatar: `${ASSET_BASE}/avatars/avatar20.jpg`,
          isVerified: true,
          followers: 50000
        },
        text: "Your voice suits this song perfectly! Amazing cover!",
        likes: 187,
        timestamp: "12h ago"
      }
    ],
    shares: 987,
    saved: false,
    audio: "Unravel Cover - AnimeSongCover",
    tags: ["TokyoGhoul", "Unravel", "AnimeSongs", "VocalCover"],
    duration: 40,
    views: 180000,
    timestamp: "3d ago"
  },
  {
    id: 19,
    user: {
      id: "user38",
      name: "CosplayTutorials",
      avatar: `${ASSET_BASE}/avatars/avatar19.jpg`,
      isVerified: true,
      followers: 180000
    },
    caption: "How I made Rem's weapon from Re:Zero! Full cosplay prop tutorial! ⚔️",
    videoUrl: `${ASSET_BASE}/videos/video19.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb19.jpg`,
    likes: 28765,
    comments: [
      {
        id: "comment20",
        user: {
          id: "user39",
          name: "Cosplayer101",
          avatar: `${ASSET_BASE}/avatars/avatar21.jpg`,
          isVerified: false,
          followers: 5000
        },
        text: "Thank you for this tutorial! I've been trying to make this prop for months!",
        likes: 123,
        timestamp: "2d ago"
      }
    ],
    shares: 876,
    saved: true,
    audio: "DIY Tutorial Background Music",
    tags: ["CosplayTutorial", "ReZero", "PropMaking", "Rem"],
    duration: 60,
    views: 200000,
    timestamp: "5d ago"
  },
  {
    id: 20,
    user: {
      id: "user40",
      name: "AnimeAnalyst",
      avatar: `${ASSET_BASE}/avatars/avatar20.jpg`,
      isVerified: true,
      followers: 220000
    },
    caption: "Breaking down the symbolism in Evangelion - things you might have missed! 🧠",
    videoUrl: `${ASSET_BASE}/videos/video20.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb20.jpg`,
    likes: 47653,
    comments: [
      {
        id: "comment21",
        user: {
          id: "user41",
          name: "EvaFan",
          avatar: `${ASSET_BASE}/avatars/avatar22.jpg`,
          isVerified: false,
          followers: 7000
        },
        text: "Your analysis changed how I see the whole series! Mind blown!",
        likes: 345,
        timestamp: "3d ago"
      }
    ],
    shares: 2134,
    saved: true,
    audio: "Evangelion OST - Analytical Mix",
    tags: ["Evangelion", "AnimeAnalysis", "Symbolism", "AnimeTheory"],
    duration: 75,
    views: 450000,
    timestamp: "1w ago"
  },
  {
    id: 21,
    user: {
      id: "user42",
      name: "MangaReviewer",
      avatar: `${ASSET_BASE}/avatars/avatar21.jpg`,
      isVerified: true,
      followers: 135000
    },
    caption: "Reviewing the latest chapter of My Hero Academia - this arc is insane! 📚",
    videoUrl: `${ASSET_BASE}/videos/video21.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb21.jpg`,
    likes: 34567,
    comments: [
      {
        id: "comment22",
        user: {
          id: "user43",
          name: "MHAFan",
          avatar: `${ASSET_BASE}/avatars/avatar23.jpg`,
          isVerified: false,
          followers: 4000
        },
        text: "I can't believe what happened to Deku in this chapter!",
        likes: 234,
        timestamp: "2d ago"
      }
    ],
    shares: 876,
    saved: true,
    audio: "Hero Academia OST - Review Background",
    tags: ["MyHeroAcademia", "MangaReview", "BokuNoHero", "MangaAnalysis"],
    duration: 45,
    views: 180000,
    timestamp: "4d ago"
  },
  {
    id: 22,
    user: {
      id: "user44",
      name: "AnimeTravel",
      avatar: `${ASSET_BASE}/avatars/avatar22.jpg`,
      isVerified: true,
      followers: 320000
    },
    caption: "Visited the real locations from Your Name in Tokyo! The anime locations exist in real life! ✈️",
    videoUrl: `${ASSET_BASE}/videos/video22.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb22.jpg`,
    likes: 56789,
    comments: [
      {
        id: "comment23",
        user: {
          id: "user45",
          name: "TravelOtaku",
          avatar: `${ASSET_BASE}/avatars/avatar24.jpg`,
          isVerified: false,
          followers: 15000
        },
        text: "I want to go there so badly! Adding this to my Japan itinerary!",
        likes: 345,
        timestamp: "3d ago"
      }
    ],
    shares: 2345,
    saved: true,
    audio: "Your Name OST - Dreamy Piano",
    tags: ["YourName", "AnimeLocations", "Tokyo", "TravelVlog"],
    duration: 60,
    views: 400000,
    timestamp: "1w ago"
  },
  {
    id: 23,
    user: {
      id: "user46",
      name: "AnimeMerch",
      avatar: `${ASSET_BASE}/avatars/avatar23.jpg`,
      isVerified: true,
      followers: 180000
    },
    caption: "Unboxing the limited edition Jujutsu Kaisen collector's box! Only 1000 made worldwide! 📦",
    videoUrl: `${ASSET_BASE}/videos/video23.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb23.jpg`,
    likes: 32456,
    comments: [
      {
        id: "comment24",
        user: {
          id: "user47",
          name: "CollectorOtaku",
          avatar: `${ASSET_BASE}/avatars/avatar25.jpg`,
          isVerified: false,
          followers: 8000
        },
        text: "That Gojo figure is incredible! How much did this box cost?",
        likes: 167,
        timestamp: "1d ago"
      }
    ],
    shares: 987,
    saved: false,
    audio: "Jujutsu Kaisen Opening - Unboxing Remix",
    tags: ["JujutsuKaisen", "Unboxing", "AnimeMerchandise", "CollectorsEdition"],
    duration: 30,
    views: 150000,
    timestamp: "5d ago"
  },
  {
    id: 24,
    user: {
      id: "user48",
      name: "AnimeMemes",
      avatar: `${ASSET_BASE}/avatars/avatar24.jpg`,
      isVerified: false,
      followers: 450000
    },
    caption: "Anime characters when they push up their glasses... 😂",
    videoUrl: `${ASSET_BASE}/videos/video24.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb24.jpg`,
    likes: 87654,
    comments: [
      {
        id: "comment25",
        user: {
          id: "user49",
          name: "MemeLord",
          avatar: `${ASSET_BASE}/avatars/avatar26.jpg`,
          isVerified: false,
          followers: 25000
        },
        text: "The Death Note one killed me! So accurate! 😂",
        likes: 456,
        timestamp: "6h ago"
      }
    ],
    shares: 5678,
    saved: true,
    audio: "Anime Meme Compilation Music",
    tags: ["AnimeMemes", "FunnyAnime", "AnimeHumor", "AnimeLogic"],
    duration: 20,
    views: 800000,
    timestamp: "3d ago"
  },
  {
    id: 25,
    user: {
      id: "user50",
      name: "AnimeHistory",
      avatar: `${ASSET_BASE}/avatars/avatar25.jpg`,
      isVerified: true,
      followers: 120000
    },
    caption: "The evolution of anime art styles from 1960 to 2023 - see how animation has changed! 🎨",
    videoUrl: `${ASSET_BASE}/videos/video25.mp4`,
    thumbnailUrl: `${ASSET_BASE}/thumbnails/thumb25.jpg`,
    likes: 43210,
    comments: [
      {
        id: "comment26",
        user: {
          id: "user51",
          name: "AnimationStudier",
          avatar: `${ASSET_BASE}/avatars/avatar27.jpg`,
          isVerified: true,
          followers: 35000
        },
        text: "The 90s anime style will always be my favorite.",
        likes: 234,
        timestamp: "4d ago"
      }
    ],
    shares: 1543,
    saved: false,
    audio: "Documentary Music - Animation History",
    tags: ["AnimeHistory", "Animation", "ArtStyleEvolution", "AnimeDocumentary"],
    duration: 90,
    views: 350000,
    timestamp: "2w ago"
  }
];

export default function SnippsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSnippIndex, setActiveSnippIndex] = useState(0);
  const [snipps, setSnipps] = useState<Snipp[]>(snippsData);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLiking, setIsLiking] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Pause all videos except the active one
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === activeSnippIndex) {
          if (isPlaying) {
            videoRef.play().catch(error => {
              console.error("Error playing video:", error);
              // User interaction may be required for autoplay
              setIsPlaying(false);
            });
          } else {
            videoRef.pause();
          }
        } else {
          videoRef.pause();
        }
      }
    });
  }, [activeSnippIndex, isPlaying]);

  // Handle video loading events
  const handleVideoLoad = (id: number) => {
    setLoadedVideos(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Set scrolling state to show loading UI
    if (!isScrolling) {
      setIsScrolling(true);
    }
    
    // Clear the previous timer
    const scrollTimer = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
    
    // Calculate which snippet is most visible
    const container = event.currentTarget;
    const scrollTop = container.scrollTop;
    const snippHeight = container.clientHeight;
    const index = Math.round(scrollTop / snippHeight);
    
    if (index !== activeSnippIndex && index >= 0 && index < snipps.length) {
      // Mark this video as loading if not already loaded
      if (!loadedVideos[snipps[index].id]) {
        setLoadedVideos(prev => ({
          ...prev,
          [snipps[index].id]: false
        }));
      }
      
      setActiveSnippIndex(index);
    }
    
    return () => clearTimeout(scrollTimer);
  };

  const toggleLike = (id: number) => {
    setIsLiking(prev => ({ ...prev, [id]: true }));
    setSnipps(prevSnipps => 
      prevSnipps.map(snipp => 
        snipp.id === id 
          ? { ...snipp, likes: snipp.likes + (snipps.find(s => s.id === id)?.likes === snipp.likes ? 1 : -1) } 
          : snipp
      )
    );
    setTimeout(() => setIsLiking(prev => ({ ...prev, [id]: false })), 500);
  };

  const toggleSave = (id: number) => {
    setIsSaving(prev => ({ ...prev, [id]: true }));
    setSnipps(prevSnipps => 
      prevSnipps.map(snipp => 
        snipp.id === id 
          ? { ...snipp, saved: !snipp.saved } 
          : snipp
      )
    );
    setTimeout(() => setIsSaving(prev => ({ ...prev, [id]: false })), 500);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // Apply mute setting to all videos
    videoRefs.current.forEach(videoRef => {
      if (videoRef) {
        videoRef.muted = !isMuted;
      }
    });
  };

  const toggleComments = (id: number) => {
    setShowComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = (id: number) => {
    if (!newComment[id]?.trim()) return;
    
    const newCommentObj: Comment = {
      id: `comment${Date.now()}`,
      user: {
        id: "currentUser",
        name: "You",
        avatar: `${ASSET_BASE}/avatars/current-user.jpg`,
        isVerified: true,
        followers: 1000
      },
      text: newComment[id],
      likes: 0,
      timestamp: "Just now"
    };

    setSnipps(prevSnipps => 
      prevSnipps.map(snipp => 
        snipp.id === id 
          ? { ...snipp, comments: [...snipp.comments, newCommentObj] } 
          : snipp
      )
    );
    setNewComment(prev => ({ ...prev, [id]: "" }));
  };

  const shareSnipp = (id: number) => {
    setSnipps(prevSnipps => 
      prevSnipps.map(snipp => 
        snipp.id === id 
          ? { ...snipp, shares: snipp.shares + 1 } 
          : snipp
      )
    );
    // In a real app, this would open a share dialog
    alert("Share functionality would open a share dialog here");
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  const navigateSnipp = (direction: 'up' | 'down') => {
    const newIndex = direction === 'up' 
      ? Math.max(0, activeSnippIndex - 1)
      : Math.min(snipps.length - 1, activeSnippIndex + 1);
    
    setActiveSnippIndex(newIndex);
    
    // Scroll to the new snippet
    const snippContainer = document.getElementById('snipp-container');
    if (snippContainer) {
      snippContainer.scrollTo({
        top: newIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <motion.div 
      className={withAnimeTheme("min-h-screen bg-gradient-to-br from-background via-background to-background/95")}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <AnimeThemeStyles />
      
      {/* Header */}
      <motion.div className="fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-background to-transparent pointer-events-none" variants={fadeInUp}>
        <motion.h1 className="text-2xl font-bold anime-gradient-text" variants={fadeInUp}>
          Snipps
        </motion.h1>
        
        <div className="flex items-center space-x-4 pointer-events-auto">
          <Button variant="outline" size="sm" className="rounded-full bg-background/40 backdrop-blur-sm border-primary/20">
            For You
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            Following
          </Button>
        </div>
      </motion.div>

      {/* Centered Container for YouTube Shorts-like experience */}
      <div className="flex justify-center items-center min-h-screen pt-16 pb-4">
        {/* Snipps Vertical Feed - Now with fixed width and hidden scrollbar */}
        <div 
          id="snipp-container"
          className="h-[90vh] w-[420px] overflow-y-scroll snap-y snap-mandatory rounded-xl border-2 border-primary/20 shadow-xl relative bg-black scrollbar-hide" 
          onScroll={handleScroll}
        >
          <style jsx global>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            
            /* Hide scrollbar for IE, Edge and Firefox */
            .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}</style>
          
          {snipps.map((snipp, index) => (
            <div 
              key={snipp.id} 
              className="h-full w-full snap-start snap-always relative overflow-hidden"
            >
              {/* Video with loading state */}
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                {/* Loading spinner shown before video loads */}
                {(!loadedVideos[snipp.id] && activeSnippIndex === index) && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  </div>
                )}
                
                {/* Blur thumbnail while loading */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-center bg-cover transition-opacity duration-300 filter blur-sm",
                    loadedVideos[snipp.id] ? "opacity-0" : "opacity-100"
                  )}
                  style={{ 
                    backgroundImage: `url(${snipp.thumbnailUrl || snipp.user.avatar})`, 
                    backgroundSize: '400%' 
                  }}
                />
                
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={snipp.videoUrl}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                    loadedVideos[snipp.id] ? "opacity-100" : "opacity-0",
                    isScrolling && "scale-[0.98] blur-[1px] transition-all duration-150"
                  )}
                  loop
                  muted={isMuted}
                  playsInline
                  preload={Math.abs(index - activeSnippIndex) <= 1 ? "auto" : "none"}
                  onClick={() => togglePlayPause()}
                  onLoadedData={() => handleVideoLoad(snipp.id)}
                  poster={snipp.thumbnailUrl || snipp.user.avatar}
                />
              </div>
              
              {/* Overlay for video controls */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 flex flex-col justify-between p-4",
                isScrolling && "opacity-50 transition-opacity duration-150"
              )}>
                
                {/* Video Controls */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-background/20 backdrop-blur-sm text-white"
                    onClick={() => togglePlayPause()}
                  >
                    {isPlaying ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-background/20 backdrop-blur-sm text-white"
                    onClick={() => toggleMute()}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>
                
                {/* User Info, Caption & Audio */}
                <motion.div 
                  className="mb-16"
                  variants={slideInLeft}
                  initial="hidden"
                  animate={activeSnippIndex === index && !isScrolling ? "visible" : "hidden"}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                      <img src={snipp.user.avatar} alt={snipp.user.name} />
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-bold text-white text-sm">{snipp.user.name}</p>
                        {snipp.user.isVerified && (
                          <span className="ml-1 text-primary text-xs">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-white/70">{snipp.audio}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-auto rounded-full text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-2"
                      onClick={() => alert("Follow functionality would be implemented here")}
                    >
                      Follow
                    </Button>
                  </div>
                  
                  <p className="text-xs text-white mb-2 line-clamp-2">{snipp.caption}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {snipp.tags.map(tag => (
                      <span key={tag} className="text-xs text-primary">#{tag}</span>
                    ))}
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="absolute right-4 bottom-20 flex flex-col space-y-4"
                  variants={slideInRight}
                  initial="hidden"
                  animate={activeSnippIndex === index && !isScrolling ? "visible" : "hidden"}
                >
                  <motion.button 
                    className="flex flex-col items-center"
                    onClick={() => toggleLike(snipp.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={cn(
                      "w-6 h-6 mb-1 transition-colors duration-300", 
                      snipps.find(s => s.id === snipp.id)?.likes !== snipp.likes 
                        ? "text-red-500 fill-red-500" 
                        : "text-white",
                      isLiking[snipp.id] && "animate-pulse"
                    )} />
                    <span className="text-xs text-white">{formatNumber(snipp.likes)}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex flex-col items-center"
                    onClick={() => toggleComments(snipp.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle className="w-6 h-6 mb-1 text-white" />
                    <span className="text-xs text-white">{formatNumber(snipp.comments.length)}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex flex-col items-center"
                    onClick={() => shareSnipp(snipp.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-6 h-6 mb-1 text-white" />
                    <span className="text-xs text-white">{formatNumber(snipp.shares)}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex flex-col items-center"
                    onClick={() => toggleSave(snipp.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className={cn(
                      "w-6 h-6 mb-1 transition-colors duration-300", 
                      snipp.saved 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-white",
                      isSaving[snipp.id] && "animate-pulse"
                    )} />
                    <span className="text-xs text-white">Save</span>
                  </motion.button>
                </motion.div>

                {/* Comments Section */}
                {showComments[snipp.id] && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 rounded-t-xl"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Comments</h3>
                      <button 
                        className="text-white/70 hover:text-white"
                        onClick={() => toggleComments(snipp.id)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto space-y-4">
                      {snipp.comments.map(comment => (
                        <div key={comment.id} className="flex space-x-2">
                          <Avatar className="w-8 h-8">
                            <img src={comment.user.avatar} alt={comment.user.name} />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="text-white font-semibold text-sm">{comment.user.name}</p>
                              {comment.user.isVerified && (
                                <span className="ml-1 text-primary text-xs">✓</span>
                              )}
                            </div>
                            <p className="text-white/80 text-sm">{comment.text}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-white/50 text-xs">{comment.timestamp}</span>
                              <button className="text-white/50 text-xs hover:text-white">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        value={newComment[snipp.id] || ""}
                        onChange={(e) => setNewComment(prev => ({ ...prev, [snipp.id]: e.target.value }))}
                        placeholder="Add a comment..."
                        className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentSubmit(snipp.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        Post
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              <div className={cn(
                "absolute left-1/2 transform -translate-x-1/2 bottom-4 flex flex-col items-center",
                isScrolling && "opacity-0 transition-opacity duration-150"
              )}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateSnipp('up')}
                  disabled={activeSnippIndex === 0}
                  className={cn(
                    "rounded-full text-white/70 hover:text-white mb-2 h-6 w-6",
                    activeSnippIndex === 0 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigateSnipp('down')}
                  disabled={activeSnippIndex === snipps.length - 1}
                  className={cn(
                    "rounded-full text-white/70 hover:text-white h-6 w-6",
                    activeSnippIndex === snipps.length - 1 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute top-0 left-0 right-0 flex justify-center p-2 gap-1">
                {snipps.slice(0, 5).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1 bg-white/30 rounded-full transition-all",
                      i === activeSnippIndex % 5 ? "w-6 bg-white" : "w-3"
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 