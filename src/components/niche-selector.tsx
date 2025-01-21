"use client";

import { NICHE_CATEGORIES } from "@/lib/constants";
import { useNicheStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Laptop,
  TestTube2,
  Calculator,
  Trophy,
  Music,
  Palette,
  BookOpen,
  Utensils
} from "lucide-react";

const ICON_MAP = {
  Laptop,
  TestTube2,
  Calculator,
  Trophy,
  Music,
  Palette,
  BookOpen,
  Utensils
};

export function NicheSelector() {
  const { selectedNiches, setSelectedNiches, fetchYouTubeVideos } = useNicheStore();

  const toggleNiche = async (nicheId: string) => {
    if (selectedNiches.includes(nicheId)) {
      setSelectedNiches(selectedNiches.filter((id) => id !== nicheId));
    } else {
      setSelectedNiches([...selectedNiches, nicheId]);
      if (nicheId === 'art') {
        await fetchYouTubeVideos('art');
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Select Your Niches</h2>
        {selectedNiches.length > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNiches([])}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Clear All
          </motion.button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {NICHE_CATEGORIES.map((niche) => {
          const Icon = ICON_MAP[niche.icon as keyof typeof ICON_MAP];
          const isSelected = selectedNiches.includes(niche.id);

          return (
            <motion.button
              key={niche.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleNiche(niche.id)}
              aria-pressed={isSelected}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-card-foreground hover:border-primary hover:bg-accent/5",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{niche.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
