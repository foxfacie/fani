import { Variants } from "framer-motion";

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

// Fade in animation with Y offset
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Stagger container for child elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Card animation
export const cardAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.25
    }
  }
};

// Pop up animation
export const popUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.3
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.25
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.25
    }
  }
};

// Button animation hover
export const buttonHover = {
  hover: { 
    scale: 1.03,
    transition: {
      duration: 0.15
    }
  },
  tap: {
    scale: 0.98
  }
};

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
};

// List animation
export const listAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

// List item animation
export const listItemAnimation: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Hover scale effect
export const hoverScale = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.15 }
  },
  whileTap: {
    scale: 0.98
  }
};

// Progress bar animation
export const progressAnimation = (value: number) => ({
  initial: { width: 0 },
  animate: { 
    width: `${value}%`,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}); 