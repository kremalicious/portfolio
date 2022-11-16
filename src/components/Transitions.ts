export const moveInTop = {
  initial: {
    opacity: 0,
    y: -50,
    transition: { type: 'spring' }
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.3,
      stiffness: 120
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      duration: 0.2
    }
  }
}

export const moveInBottom = {
  initial: {
    opacity: 0,
    y: 20,
    transition: { type: 'spring' }
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.4,
      stiffness: 120
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring'
    }
  }
}

export function getAnimationProps(shouldReduceMotion: boolean) {
  return {
    initial: `${shouldReduceMotion ? 'enter' : 'initial'}`,
    animate: `${shouldReduceMotion ? null : 'enter'}`,
    exit: `${shouldReduceMotion ? null : 'exit'}`
  }
}
