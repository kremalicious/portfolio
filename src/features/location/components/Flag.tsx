import styles from './Location.module.css'

type Props = {
  country: {
    name: string
    code: string
  }
}

export function Flag({ country }: Props) {
  if (!country?.name || !country?.code) return null
  // offset between uppercase ascii and regional indicator symbols
  const offset = 127397

  const emoji = country.code.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + offset)
  )

  return (
    <span role="img" aria-label={country.name} className={styles.emoji}>
      {emoji}
    </span>
  )
}
