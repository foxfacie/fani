"use client";

import { useInfiniteNewAnime } from '@/lib/api/vidapi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Play, Plus, Info } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export function AnimeGrid() {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteNewAnime();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="aspect-[2/3] animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Error loading anime</h3>
        <p className="text-muted-foreground mb-4">Failed to fetch anime data. Please try again later.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data?.pages.map((page) =>
          page.data.map((anime) => (
            <Card
              key={anime.id}
              className="group relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-[2/3] relative">
                <img
                  src={anime.coverImage || `https://i.imgur.com/gJAcwS3.jpg`}
                  alt={anime.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 p-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {anime.episodes ? `${anime.episodes} Episodes` : 'Unknown Episodes'}
                      </span>
                      {anime.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {anime.rating}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{anime.title}</h3>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                      <Button variant="outline" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div ref={ref} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        ) : hasNextPage ? (
          <Button onClick={() => fetchNextPage()} variant="outline">
            Load More
          </Button>
        ) : (
          <p className="text-muted-foreground">No more anime to load</p>
        )}
      </div>
    </div>
  );
}