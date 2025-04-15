import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface MediaCardProps {
  id: string;
  title: string;
  image: string;
  genre: string;
  year: number;
  index?: number;
}

export default function MediaCard({ id, title, image, genre, year, index = 0 }: MediaCardProps) {
  return (
    <motion.div 
      className="group relative hover-lift rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/watch/${id}`}>
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <motion.div 
            className="absolute bottom-3 left-3 right-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: (index * 0.1) + 0.2 }}
          >
            <h3 className="text-white font-semibold truncate">{title}</h3>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center gap-2">
                <span className={`genre-pill ${genre.toLowerCase().includes('movie') ? 'genre-movie' : 
                                               genre.toLowerCase().includes('tv') ? 'genre-tv' : 
                                               genre.toLowerCase().includes('anime') ? 'genre-anime' : 'genre-game'}`}>
                  {genre}
                </span>
                <span className="text-white/70 text-xs">{year}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute top-2 right-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
          >
            <button className="bg-black/30 hover:bg-black/50 p-1.5 rounded-full text-white">
              <BookmarkIcon className="w-4 h-4" />
            </button>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="bg-black/50 p-3 rounded-full"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            >
              <PlayIcon className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
} 