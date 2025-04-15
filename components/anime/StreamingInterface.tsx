"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Plus, Star, Calendar, Clock } from "lucide-react";

const continueWatching = [
  {
    id: 1,
    title: "Jujutsu Kaisen",
    cover: "https://i.imgur.com/MiCZdPj.jpg",
    rating: "9.2",
    progress: 85,
    type: "anime",
    episodes: 24,
    currentEpisode: 20,
    status: "Airing",
    nextEpisode: "2 days",
  },
  {
    id: 2,
    title: "Demon Slayer",
    cover: "https://i.imgur.com/LrJpCZD.jpg",
    rating: "9.0",
    progress: 100,
    type: "anime",
    episodes: 26,
    currentEpisode: 26,
    status: "Completed",
    nextEpisode: null,
  },
];

const seasonal = [
  {
    id: 1,
    title: "My Hero Academia Season 7",
    cover: "https://i.imgur.com/6OQRC8Z.jpg",
    rating: "8.7",
    status: "Coming Soon",
    releaseDate: "14 days",
  },
  {
    id: 2,
    title: "Solo Leveling",
    cover: "https://i.imgur.com/Feg9pIF.jpg",
    rating: "9.1",
    status: "Coming Soon",
    releaseDate: "7 days",
  },
  {
    id: 3,
    title: "Haikyuu!! Final Season",
    cover: "https://i.imgur.com/Kd9KK6o.jpg",
    rating: "8.9",
    status: "Coming Soon",
    releaseDate: "21 days",
  },
  {
    id: 4,
    title: "Blue Lock Season 2",
    cover: "https://i.imgur.com/ewE5IqW.jpg",
    rating: "8.5",
    status: "Coming Soon",
    releaseDate: "28 days",
  },
  {
    id: 5,
    title: "Chainsaw Man Season 2",
    cover: "https://i.imgur.com/uYspw0X.jpg",
    rating: "9.3",
    status: "Coming Soon",
    releaseDate: "35 days",
  },
  {
    id: 6,
    title: "Spy x Family Season 3",
    cover: "https://i.imgur.com/8ShRsKA.jpg",
    rating: "8.8",
    status: "Coming Soon",
    releaseDate: "42 days",
  },
];

export function StreamingInterface() {
  return (
    <div className="min-h-screen p-6 bg-[#121212]">
      {/* Continue Watching Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Continue Watching</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {continueWatching.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden border-0 bg-black/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-white">{item.rating}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <span className="text-sm text-gray-300">
                        Episode {item.currentEpisode}/{item.episodes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">
                        {item.progress}% complete
                      </span>
                      {item.nextEpisode && (
                        <span className="text-sm text-gray-300">
                          Next episode in {item.nextEpisode}
                        </span>
                      )}
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full mb-4">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      {item.progress === 100 ? "Rewatch" : "Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Winter 2024 Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white">Winter 2024</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {seasonal.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden border-0 bg-black/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-white">{item.status}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {item.releaseDate}
                      </span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to List
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}