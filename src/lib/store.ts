"use client";

import { create } from "zustand";

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  timestamp: string;
  niche: string;
  videoUrl: string;
  isYouTube?: boolean;
};

export type YouTubeVideoType = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
};

type NicheStore = {
  selectedNiches: string[];
  videos: VideoType[];
  searchQuery: string;
  setSelectedNiches: (niches: string[]) => void;
  setSearchQuery: (query: string) => void;
  addVideo: (video: VideoType) => void;
  clearVideos: () => void;
  filteredVideos: () => VideoType[];
  fetchYouTubeVideos: (niche: string) => Promise<void>;
};

export const useNicheStore = create<NicheStore>((set, get) => ({
  selectedNiches: [],
  videos: [],
  searchQuery: "",
  setSelectedNiches: (niches) => set({ selectedNiches: niches }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addVideo: (video) => set((state) => ({ videos: [...state.videos, video] })),
  clearVideos: () => set({ videos: [] }),
  fetchYouTubeVideos: async (niche: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(niche + " art")}&type=video&maxResults=10&order=viewCount&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
      const data = await response.json();
      
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const statsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
      const statsData = await statsResponse.json();
      
      const videos = data.items.map((item: any, index: number) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        views: statsData.items[index]?.statistics.viewCount || '0',
        timestamp: new Date(item.snippet.publishedAt).toLocaleDateString(),
        niche: 'art',
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        isYouTube: true
      }));

      set((state) => ({
        videos: [...state.videos.filter(v => !v.isYouTube), ...videos]
      }));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  },
  filteredVideos: () => {
    const { videos, selectedNiches, searchQuery } = get();
    return videos
      .filter((video) => selectedNiches.includes(video.niche))
      .filter((video) => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
          video.title.toLowerCase().includes(searchLower) ||
          video.channel.toLowerCase().includes(searchLower)
        );
      });
  },
}));
