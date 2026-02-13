import { motion, useMotionValue, useTransform } from "framer-motion";
import { type Memory } from "@shared/schema";
import { Heart } from "lucide-react";

interface PolaroidCardProps {
  memory: Memory;
  index: number;
}

export function PolaroidCard({ memory, index }: PolaroidCardProps) {
  // Generate stable random rotation based on ID if not provided
  const rotation = memory.rotation || (memory.id % 10) - 5;

  // 3D Tilt values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.08,
        zIndex: 20,
        transition: { duration: 0.3 }
      }}
      className="relative group bg-white p-4 pb-12 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-xs mx-auto overflow-hidden"
      style={{
        rotate: `${rotation}deg`,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 border border-gray-100 shadow-inner">
        <img
          src={memory.url}
          alt={memory.caption}
          className={`w-full h-full object-cover transition-all duration-700 ${index % 3 === 0 ? 'grayscale contrast-110 hover:grayscale-0' : 'sepia-[.2] contrast-105 group-hover:sepia-0'}`}
          style={{ transform: "translateZ(20px)" }}
        />

        {/* Shine/Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:animate-shimmer"
          style={{ transform: "translateZ(30px)" }}
        />

        {/* Floating Heart Icon on Hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2 z-30"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="bg-pink-500/80 backdrop-blur-sm rounded-full p-2 shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center px-4" style={{ transform: "translateZ(10px)" }}>
        <p className="font-handwriting text-xl text-gray-700 leading-tight">
          {memory.caption}
        </p>
        {memory.date && (
          <p className="font-serif text-xs text-gray-400 mt-1 italic">{memory.date}</p>
        )}
      </div>

      {/* Tape effect */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-[2px] shadow-sm transform -rotate-1 skew-x-12 z-20 pointer-events-none"
        style={{ transform: "translateZ(50px) translateX(-50%) rotate(-1deg) skewX(12deg)" }}
      ></div>
    </motion.div>
  );
}
