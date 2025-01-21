"use client";

import { MOCK_VIDEOS } from "@/lib/constants";
import { useNicheStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Clock, Eye, User, Youtube } from "lucide-react";
import { useEffect } from "react";

export function VideoTimeline() {
  const { selectedNiches, addVideo, clearVideos, filteredVideos } = useNicheStore();

  useEffect(() => {
    clearVideos();
    MOCK_VIDEOS.forEach((video) => addVideo(video));
  }, [addVideo, clearVideos]);

  const videos = filteredVideos();

  if (selectedNiches.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-lg text-muted-foreground">
          Select a niche to see relevant videos
        </p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-lg text-muted-foreground">
          Select a niche to see relevant videos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4 rounded-lg border border-border bg-card p-4"
        >
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-32 w-48 overflow-hidden rounded-md transition-transform hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </a>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">{video.title}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {video.channel}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {video.isYouTube 
                    ? new Intl.NumberFormat().format(parseInt(video.views)) 
                    : video.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {video.timestamp}
                </span>
                {video.isYouTube && (
                  <span className="flex items-center gap-1 text-red-500">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
