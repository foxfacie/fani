"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Film,
  Tv,
  BookOpen,
  Music,
  Radio,
  Heart,
  BookMarked,
  Users,
  Settings,
  Bell,
  MessageSquare,
  Video,
  User,
} from "lucide-react";
import { 
  AnimeThemeStyles, 
  withAnimeTheme, 
  AnimeGradientText, 
  AnimeTitle 
} from "@/components/anime-theme";
import { AnimatedLogo } from "@/components/animated-logo";

// Add custom anime nav styles
const animeNavStyles = `
  .anime-nav-item {
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    position: relative;
  }

  .anime-nav-item:hover {
    letter-spacing: 1px;
  }

  .anime-nav-item::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
    opacity: 0;
  }

  .anime-nav-item:hover::after {
    width: 80%;
    opacity: 1;
  }

  .anime-nav-active {
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 0 0 8px var(--highlight-color);
  }

  .anime-nav-connection {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 3px 3px 0 var(--shadow-color);
    background: var(--gradient-primary);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .anime-nav-fanmix {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 800;
    letter-spacing: 1px;
  }
`;

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Film, label: "Movies", href: "/movies" },
  { icon: Tv, label: "TV Shows", href: "/tv" },
  { icon: BookOpen, label: "Anime & Manga", href: "/anime" },
  { icon: Music, label: "Music", href: "/music" },
  { icon: Video, label: "Snipps", href: "/snipps" },
  { icon: Radio, label: "Podcasts", href: "/podcasts" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: BookMarked, label: "My Lists", href: "/lists" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={withAnimeTheme("w-64 border-r h-screen fixed left-0 top-0 bg-background flex flex-col z-30")}>
      <AnimeThemeStyles />
      <style jsx global>{animeNavStyles}</style>
      
      <div className="p-4 flex-shrink-0">
        <AnimatedLogo />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary-foreground anime-gradient-border"
                    : "hover:bg-primary/5"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className={cn(
                  "anime-nav-item",
                  isActive && "anime-nav-active"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/10 flex-shrink-0">
        <Link
          href="/messages"
          className="w-full px-4 py-3 rounded-lg flex items-center justify-center gap-3
            bg-primary hover:bg-primary/90 text-primary-foreground
            transition-colors duration-200
            font-bold text-base uppercase
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
        </Link>
      </div>
    </aside>
  );
}