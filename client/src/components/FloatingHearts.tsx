import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart as HeartIcon } from "lucide-react";

interface Heart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Increased count and better visibility for "magical" effect on all pages
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: 0.4 + Math.random() * 0.6, // Slightly larger
      duration: 12 + Math.random() * 15, // A bit faster for more life
      delay: Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-40px] will-change-transform"
          initial={{ y: 0, x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: "-115vh",
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ scale: heart.scale }}
        >
          <HeartIcon className="w-5 h-5 text-pink-400/40 fill-pink-300/30 filter drop-shadow-sm" />
        </motion.div>
      ))}
    </div>
  );
}
