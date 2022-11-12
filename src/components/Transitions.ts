export const fadeIn = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    duration: 0.3,
    when: 'beforeChildren'
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

export const moveInTop = {
  initial: {
    y: '-2rem',
    transition: { type: 'spring' }
  },
  enter: {
    y: 0,
    transition: { type: 'spring', duration: 0.3, stiffness: 120 }
  },
  exit: {
    y: '-2rem',
    transition: { type: 'spring', delay: 0.1, duration: 0.2 }
  }
}

export const moveInBottom = {
  initial: {
    y: '2rem',
    transition: { type: 'spring' }
  },
  enter: {
    y: 0,
    transition: { type: 'spring', duration: 0.3, stiffness: 120 }
  },
  exit: {
    y: '2rem',
    transition: { type: 'spring', delay: 0.1, duration: 0.2 }
  }
}

export function getAnimationProps(shouldReduceMotion, isSsr = false) {
  return {
    initial: `${shouldReduceMotion || isSsr ? 'enter' : 'initial'}`,
    animate: `${shouldReduceMotion || isSsr ? null : 'enter'}`,
    exit: `${shouldReduceMotion || isSsr ? null : 'exit'}`
  }
}
