import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLink: string;
}

export default function HeroSection({
  title = "Discover Amazing Content",
  subtitle = "Stream the latest movies, TV shows, and more with our curated collection",
  imageUrl = "/hero-image.jpg",
  ctaLink = "/browse"
}: HeroSectionProps) {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-5xl">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href={ctaLink}>
            <motion.button 
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 animate-pulse-slow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Exploring
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Element */}
        <motion.div 
          className="absolute right-12 top-1/4 animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-24 h-24 rounded-full bg-primary/30 backdrop-blur-md animate-glow"></div>
        </motion.div>
        
        {/* Genre Pills */}
        <motion.div 
          className="flex flex-wrap gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {['Movies', 'TV Shows', 'Anime', 'Games'].map((genre, index) => (
            <motion.span 
              key={genre}
              className={`genre-pill ${
                genre === 'Movies' ? 'genre-movie' : 
                genre === 'TV Shows' ? 'genre-tv' : 
                genre === 'Anime' ? 'genre-anime' : 'genre-game'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
            >
              {genre}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 