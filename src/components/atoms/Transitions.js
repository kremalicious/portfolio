export const fadeIn = {
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

export const moveInTop = {
  enter: {
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    y: '-2rem',
    transition: { type: 'spring' }
  }
}

export const moveInBottom = {
  enter: {
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    y: '2rem',
    transition: { type: 'spring' }
  }
}
