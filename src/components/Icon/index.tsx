import Farcaster from '@/images/farcaster.svg'
import Mastodon from '@/images/mastodon.svg'
// https://lucide.dev
import {
  ArrowDownCircle,
  Check,
  ChevronDown,
  Compass,
  Contrast,
  Feather,
  FileText,
  Github,
  Globe,
  Image,
  Info,
  Mail,
  Moon,
  Star,
  Sun
} from 'lucide-react'
import styles from './index.module.css'

type Props = React.SVGAttributes<{
  name: string
}>

export default function Icon({ name, className, ...props }: Props) {
  const components = {
    // biome-ignore lint/style/useNamingConvention: Components
    Email: Mail,
    // biome-ignore lint/style/useNamingConvention: Components
    Link: Compass,
    // biome-ignore lint/style/useNamingConvention: Components
    Download: ArrowDownCircle,
    'Info & Download': ArrowDownCircle,
    // biome-ignore lint/style/useNamingConvention: Components
    Styleguide: FileText,
    // biome-ignore lint/style/useNamingConvention: Components
    Blog: Feather,
    ArrowDownCircle,
    // biome-ignore lint/style/useNamingConvention: Components
    GitHub: Github,
    Sun,
    Moon,
    Compass,
    FileText,
    Image,
    Mail,
    Globe,
    Star,
    Info,
    Mastodon,
    ChevronDown,
    Check,
    Contrast,
    Farcaster
  }

  const IconMapped = components[name as keyof typeof components]

  return IconMapped ? (
    <IconMapped className={`${styles.icon} ${className || ''}`} {...props} />
  ) : null
}
