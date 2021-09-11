export const fadeIn = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    duration: '0.6',
    delay: '0.6',
    when: 'beforeChildren'
  },
  exit: {
    opacity: 0,
    transition: { duration: '0.2' }
  }
}

export const moveInTop = {
  initial: {
    y: '-2rem',
    transition: { type: 'spring' }
  },
  enter: {
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    y: '-2rem',
    transition: { type: 'spring', duration: '0.2' }
  }
}

export const moveInBottom = {
  initial: {
    y: '2rem',
    transition: { type: 'spring' }
  },
  enter: {
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    y: '2rem',
    transition: { type: 'spring', duration: '0.2' }
  }
}
