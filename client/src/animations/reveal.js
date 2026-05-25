export const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};
