import { useConfig } from "@/hooks/use-config";
import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { Loader2, Heart, Sparkles, Feather } from "lucide-react";
import { usePartner } from "@/hooks/use-partner";

// Memoized loading component
const LoadingScreen = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="will-change-transform"
    >
      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-4 sm:mt-6 font-handwriting text-lg sm:text-xl text-pink-600"
    >
      Preparing something special for you...
    </motion.p>
  </div>
));

LoadingScreen.displayName = "LoadingScreen";

// Memoized decorative element
const VintageSparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform pointer-events-none"
    style={{ left, top }}
    animate={{
      opacity: [0, 0.15, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <Feather className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400/30" />
  </motion.div>
));

VintageSparkle.displayName = "VintageSparkle";

export default function FinalNote() {
  const { data: config, isLoading } = useConfig();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { name } = usePartner();

  // Instant scroll reset
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const fullText = "My love comes from a deep heart that still hopes, still waits. I miss the respect we shared and dream of a day when everything becomes normal again. We went through lot of tough time and came back but one thing i can promise i will be there for you till my last breathe. Thanks for believing me again and trusting me again. I am definitely saying i will not bow you down in your life, be the way you are, and give me respect only when you think that it is time. Happy Valentine's Day nana—this is just one of many celebrations I wish we’ll share together.";

  // Optimized typing effect
  useEffect(() => {
    if (isLoading) return;

    let index = 0;
    const typingSpeed = 35; // Slightly faster for better UX

    const timer = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
        return;
      }

      setDisplayedText(fullText.slice(0, index + 1));
      index++;
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [fullText, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Simplified background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Single soft vintage glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-rose-300 rounded-full blur-[100px] will-change-transform"
        />

        {/* Reduced floating vintage elements - only 5 */}
        {[...Array(5)].map((_, i) => (
          <VintageSparkle
            key={i}
            delay={i * 0.8}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
          />
        ))}
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-amber-50/90 to-rose-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-amber-200/50 p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Vintage paper texture overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMyIgLz48L3N2Zz4=')] opacity-30" />

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-amber-300/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-amber-300/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-amber-300/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-amber-300/40 rounded-br-lg" />

          <div className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-center space-y-3 sm:space-y-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block will-change-transform"
              >
                <Feather className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600/50" />
              </motion.div>

              <h1 className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-rose-600 to-pink-600">
                My Dearest {name || "Love"}
              </h1>

              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400 fill-rose-300/50" />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent via-amber-400/50 to-transparent" />
              </div>
            </motion.div>

            {/* Letter Content with Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative"
            >
              <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed sm:leading-loose text-center px-2 sm:px-4">
                {displayedText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-rose-400 ml-1"
                  />
                )}
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-right space-y-3 sm:space-y-4 pt-4 sm:pt-6"
            >
              <div className="flex items-center justify-end gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="will-change-transform"
                  >
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400/50 fill-rose-300/50" />
                  </motion.div>
                ))}
              </div>

              <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                Forever Yours
              </p>

              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center justify-end gap-2"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/60" />
                <span className="font-serif text-xs sm:text-sm text-gray-500 italic">
                  Valentine's Day {new Date().getFullYear()}
                </span>
              </motion.div>
            </motion.div>

            {/* Decorative bottom element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, scale: isTypingComplete ? 1 : 0.8 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex items-center justify-center gap-2 pt-4 sm:pt-6"
            >
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="will-change-transform"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400/50" />
              </motion.div>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Memory Lane Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 40 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 sm:mt-16 md:mt-20 space-y-8 sm:space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-rose-600">
              Our Memory Lane
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
              <Heart className="w-5 h-5 text-rose-400 fill-rose-300/30" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
            </div>
          </div>

          {/* Memory Wall Section (Redesigned for High Density) */}
          <div className="relative py-10 px-2 sm:px-4 bg-white/40 backdrop-blur-md rounded-[3rem] border-2 border-rose-100/50 shadow-2xl overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='%23e11d48' fill-opacity='1'/%3E%3C/svg%3E")` }} />

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 auto-rows-max">
              {[...Array(16)].map((_, i) => {
                const rotation = (i * 13) % 10 - 5; // pseudo-random rotation
                const isGrayscale = i % 3 === 0; // Filter every 3rd image
                const delay = (i * 0.1) % 1;

                return (
                  <motion.div
                    key={`wall-${i}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: rotation * 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                    viewport={{ once: true, margin: "50px" }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 50,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ delay, duration: 0.6 }}
                    className="relative aspect-square"
                  >
                    {/* Tape/Pin effect */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/40 backdrop-blur-sm border border-white/20 rotate-3 z-20 hidden sm:block shadow-sm" />

                    <div className="w-full h-full bg-white p-1.5 sm:p-2 rounded-lg shadow-xl border border-rose-50 overflow-hidden transform-gpu">
                      <img
                        src={`/memory${i + 1}.jpg`}
                        alt={`Memory ${i + 1}`}
                        className={`w-full h-full object-cover rounded-md transition-all duration-700 ${isGrayscale ? 'grayscale hover:grayscale-0' : 'hover:scale-105'}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating decorative labels in between */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[20%] left-[10%] bg-pink-500/80 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-handwriting shadow-lg -rotate-12"
              >
                Best Moments
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-[25%] right-[15%] bg-rose-500/80 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-handwriting shadow-lg rotate-12"
              >
                Forever Us
              </motion.div>
            </div>
          </div>

          {/* Animated Collage / Slideshow Section (The Dynamic Layer) */}
          <div className="relative space-y-8">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-50/50 to-transparent blur-3xl" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full bg-gradient-to-br from-rose-100/30 to-pink-100/30 rounded-3xl overflow-hidden border-2 border-rose-200/40 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`photo-stream-v2-${i}`}
                    className="absolute w-40 h-40 sm:w-56 sm:h-56"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      x: (Math.random() - 0.5) * 250 + "%",
                      y: (Math.random() - 0.5) * 250 + "%",
                      rotate: (Math.random() - 0.5) * 60
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1.1, 1, 0.9],
                      x: (Math.random() - 0.5) * 200 + "%",
                      y: (Math.random() - 0.5) * 200 + "%",
                      rotate: (Math.random() - 0.5) * 40
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      delay: i * 2,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-2xl border-4 border-white rotate-3 group overflow-hidden">
                      <img
                        src={`/memory${i + 1}.jpg`}
                        className={`w-full h-full object-cover rounded shadow-inner transition-all duration-1000 ${i % 2 === 0 ? 'grayscale group-hover:grayscale-0' : ''}`}
                        alt=""
                      />
                    </div>
                  </motion.div>
                ))}

                <div className="relative z-10 text-center px-6 pointer-events-none">
                  <motion.h3
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-rose-600 drop-shadow-xl"
                  >
                    Our Everlasting Loop
                  </motion.h3>
                  <p className="font-serif text-sm sm:text-base text-rose-500/80 mt-2 italic bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
                    Every frame, a story. Every moment, forever.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Video Section (Enhanced with frame) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video bg-white p-3 sm:p-5 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.15)] border-4 border-rose-50 overflow-hidden group"
            >
              <video
                src="/memory_video.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl shadow-inner grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 text-white text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="space-y-3"
                >
                  <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    The melody of us…
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className={`w-5 h-5 text-amber-300 opacity-${(i + 1) * 20} filter drop-shadow-lg`} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Final floating message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-6 sm:mt-16 space-y-4 sm:space-y-6 pb-24"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </motion.div>
            <motion.p
              animate={{
                scale: [1, 1.1, 1],
                color: ["#db2777", "#e11d48", "#db2777"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-handwriting text-3xl sm:text-4xl md:text-5xl"
            >
              Happy Valentine's Day ♡
            </motion.p>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </motion.div>
          </div>

          <p className="text-base sm:text-lg text-gray-500 italic max-w-md mx-auto px-4">
            "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
        </motion.div>
      </div>
    </div>
  );
}