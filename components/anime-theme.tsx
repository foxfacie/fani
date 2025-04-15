"use client";

import { cn } from "@/lib/utils";

export function AnimeThemeStyles() {
  return (
    <style jsx global>{`
      .animeTheme {
        --shadow-color: rgba(138, 43, 226, 0.35);
        --highlight-color: rgba(255, 107, 107, 0.7);
        --gradient-primary: linear-gradient(45deg, #ff6b6b, #8a2be2, #4158d0);
        --border-glow: 0 0 15px var(--shadow-color);
      }
      
      .animeTheme .anime-title {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: -0.5px;
        font-weight: 800;
        text-transform: uppercase;
        text-shadow: 3px 3px 0 var(--shadow-color);
      }
      
      .animeTheme .text-shadow-glow {
        text-shadow: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(138, 43, 226, 0.3), 0 0 30px rgba(138, 43, 226, 0.2), 3px 3px 0 rgba(138, 43, 226, 0.6);
      }
      
      .animeTheme .anime-subtitle {
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      
      .animeTheme .anime-button {
        transform: skew(-5deg);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .animeTheme .anime-button:hover {
        transform: skew(-5deg) scale(1.05);
        box-shadow: 0 0 15px var(--shadow-color);
      }
      
      .animeTheme .anime-bubble {
        border-width: 3px;
        box-shadow: 3px 3px 0 var(--shadow-color);
      }
      
      .animeTheme .anime-gradient-text {
        background: var(--gradient-primary);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-weight: 800;
      }
      
      .animeTheme .anime-border {
        border-width: 3px;
        border-style: solid;
      }
      
      .animeTheme .anime-glow {
        box-shadow: var(--border-glow);
      }
      
      .animeTheme .anime-card {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        border-width: 3px;
      }
      
      .animeTheme .anime-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--border-glow);
      }
      
      .animeTheme .anime-glass {
        background-color: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(138, 43, 226, 0.15);
        transition: all 0.3s ease;
      }
      
      .animeTheme .anime-glass:hover {
        box-shadow: 0 8px 32px rgba(138, 43, 226, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .animeTheme .anime-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to bottom right, 
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 40%, 
          rgba(255, 255, 255, 0) 50%
        );
        transform: rotate(-45deg);
        pointer-events: none;
      }
      
      .animeTheme .anime-card:hover::before {
        animation: shine 1.5s forwards;
      }
      
      @keyframes shine {
        100% {
          top: 150%;
          left: 150%;
        }
      }
      
      .animeTheme .anime-gradient-border {
        position: relative;
        border: none;
      }
      
      .animeTheme .anime-gradient-border::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        background: var(--gradient-primary);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
      
      .animeTheme .anime-section {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        border-width: 2px;
      }
      
      @keyframes pulse-border {
        0% { border-color: rgba(138, 43, 226, 0.7); }
        50% { border-color: rgba(65, 88, 208, 0.9); }
        100% { border-color: rgba(138, 43, 226, 0.7); }
      }
      
      .animeTheme .pulse-border {
        animation: pulse-border 2s infinite;
      }
      
      .animeTheme .anime-rating {
        background: rgba(255, 215, 0, 0.8);
        color: #000;
        font-weight: bold;
        border-radius: 4px;
        padding: 2px 6px;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      }
      
      .animeTheme .anime-badge {
        transform: skew(-10deg);
        font-weight: bold;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-size: 0.7rem;
      }
      
      .animeTheme .anime-input {
        border-width: 2px;
        transition: all 0.3s ease;
      }
      
      .animeTheme .anime-input:focus {
        border-color: #8a2be2;
        box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.25);
        transform: translateY(-2px);
      }
    `}</style>
  );
}

export function withAnimeTheme(baseClassName: string) {
  return cn(baseClassName, "animeTheme");
}

export function AnimeGradientText({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <span className={cn("anime-gradient-text", className)}>
      {children}
    </span>
  );
}

export function AnimeTitle({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <h2 className={cn("anime-title", className)}>
      {children}
    </h2>
  );
}

export function AnimeCard({ 
  children, 
  className,
  glowOnHover = true
}: { 
  children: React.ReactNode, 
  className?: string,
  glowOnHover?: boolean
}) {
  return (
    <div className={cn("anime-card", glowOnHover && "hover:anime-glow", className)}>
      {children}
    </div>
  );
}

export function AnimeButton({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <div className={cn("anime-button", className)}>
      {children}
    </div>
  );
} 