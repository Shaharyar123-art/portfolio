// Reusable Framer Motion variants for a premium SaaS & developer aesthetic

// Ultra-smooth easing curve inspired by Apple/Vercel (custom cubic-bezier)
export const EASE_PREMIUM = [0.22, 1, 0.36, 1];

export const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1
};

export const transitionSmooth = {
  ease: EASE_PREMIUM,
  duration: 0.8
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16,
      mass: 0.8
    }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.6
    }
  }
};

// Subtle continuous floating motion for orbs or avatars
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Slow rotate for background accents
export const rotateSlow = {
  animate: {
    rotate: 360,
    transition: {
      duration: 35,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};
