"use client";

"use client";

import { NicheSelector } from "@/components/niche-selector";
import { SearchBar } from "@/components/search-bar";
import { VideoTimeline } from "@/components/video-timeline";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        <h1 className="mb-8 text-4xl font-bold text-primary">
          YouTube Timeline Cleanse
        </h1>
        <SearchBar />
        <NicheSelector />
        <VideoTimeline />
      </motion.div>
    </main>
  );
}
