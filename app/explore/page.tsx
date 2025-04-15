"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, BookOpen, Newspaper } from "lucide-react";

const trendingTopics = [
  { id: 1, title: "One Piece Chapter 1089", posts: "128K posts" },
  { id: 2, title: "Attack on Titan Finale", posts: "98K posts" },
  { id: 3, title: "Jujutsu Kaisen Movie", posts: "87K posts" },
  { id: 4, title: "Demon Slayer Season 4", posts: "76K posts" },
  { id: 5, title: "My Hero Academia", posts: "62K posts" },
];

export default function ExplorePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Input 
          placeholder="Search for manga, users, or topics..." 
          className="w-full rounded-full"
        />
      </div>

      <Tabs defaultValue="trending">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="trending" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="people" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            People
          </TabsTrigger>
          <TabsTrigger value="manga" className="flex-1">
            <BookOpen className="w-4 h-4 mr-2" />
            Manga
          </TabsTrigger>
          <TabsTrigger value="news" className="flex-1">
            <Newspaper className="w-4 h-4 mr-2" />
            News
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <Card key={topic.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">#{index + 1}</span>
                      <h3 className="font-semibold">{topic.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{topic.posts}</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}