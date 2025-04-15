import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-primary/30"
          animate={{ 
            rotate: 360,
            borderWidth: [4, 2, 4],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-primary"
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "linear" 
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              delay: 0.2,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-lg font-medium text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
} 