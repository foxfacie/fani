"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Heart, Bookmark, Share } from "lucide-react";

const bookmarkedPosts = [
  {
    id: 1,
    user: {
      name: "Manga Enthusiast",
      username: "@manga_lover",
      avatar: "https://source.unsplash.com/random/100x100?face=1",
    },
    content: "Just finished reading Chainsaw Man. The art style is incredible! 🔥",
    time: "2 days ago",
    engagement: {
      comments: 45,
      likes: 231,
      bookmarks: 23,
    },
  },
  {
    id: 2,
    user: {
      name: "Anime News",
      username: "@anime_updates",
      avatar: "https://source.unsplash.com/random/100x100?face=2",
    },
    content: "Breaking: New season of Demon Slayer announced! Coming this fall! 🗡️",
    time: "1 week ago",
    engagement: {
      comments: 128,
      likes: 542,
      bookmarks: 89,
    },
  },
];

export default function BookmarksPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>

      <Tabs defaultValue="posts">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
          <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="space-y-4">
            {bookmarkedPosts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex space-x-4">
                  <Avatar className="w-10 h-10">
                    <img src={post.user.avatar} alt={post.user.name} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{post.user.name}</span>
                      <span className="text-muted-foreground">{post.user.username}</span>
                      <span className="text-muted-foreground">· {post.time}</span>
                    </div>
                    <p className="mt-2">{post.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="w-5 h-5 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}