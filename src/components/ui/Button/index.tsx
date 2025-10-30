import styles from './index.module.css'

declare type ButtonProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <a {...props} className={styles.button}>
      {children}
    </a>
  )
}
