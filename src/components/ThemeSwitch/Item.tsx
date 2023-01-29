import Icon from '../Icon'
import * as Select from '@radix-ui/react-select'
import { getIconName } from './index'
import styles from './Item.module.css'

export function Item({ theme }: { theme: string }) {
  return (
    <Select.Item value={theme} className={styles.item}>
      <Select.ItemIndicator className={styles.itemIndicator}>
        <Icon name="Check" />
      </Select.ItemIndicator>

      <Select.Icon className={styles.itemIcon}>
        <Icon name={getIconName(theme)} />
      </Select.Icon>

      <Select.ItemText className={styles.itemText}>{theme}</Select.ItemText>
    </Select.Item>
  )
}
