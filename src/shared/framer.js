import theme from '../styled/theme';

export const backdropVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level3 },
  },
};

export const sidebarVariants = {
  hidden: {
    pointerEvents: 'none',
    left: '100%',
    x: 0,
  },
  visible: {
    x: '-100%',
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level3, ease: [0.3, 0.74, 0.26, 0.94] },
  },
};

export const submenuVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level1, ease: [0.3, 0.64, 0.53, 0.94] },
  },
};

export const slideVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    transition: { duration: theme.durations.level4, ease: 'easeInOut' },
  },
};

export const slideForegroundVariants = {
  visible: {
    transition: {
      staggerChildren: theme.durations.level3,
      delayChildren: theme.durations.level3,
    },
  },
};

export const slideForegroundElementVariants = {
  hidden: {
    opacity: 0,
    x: '-10%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 1.4,
      damping: 10,
    },
  },
  exit: {
    x: '10%',
    transition: { ease: 'easeInOut' },
  },
};

export const imageSliderVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(3px)',
    transition: { duration: theme.durations.level2 },
    pointerEvents: 'initial',
  },
};

export const SCSliderVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: theme.durations.level1, duration: theme.durations.level1 },
  },
};