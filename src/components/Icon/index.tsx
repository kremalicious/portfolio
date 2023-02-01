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
  Sun,
  Twitter
} from 'lucide-react'
import Mastodon from '../../images/mastodon.svg'
import styles from './index.module.css'

export default function Icon({ name, ...props }: { name: string }) {
  const components = {
    Email: Mail,
    Link: Compass,
    Download: ArrowDownCircle,
    'Info & Download': ArrowDownCircle,
    Styleguide: FileText,
    Blog: Feather,
    ArrowDownCircle,
    GitHub: Github,
    Twitter,
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
    Contrast
  }

  const IconMapped = components[name]

  return IconMapped ? (
    <IconMapped className={`${styles.icon} ${styles[name]}`} {...props} />
  ) : null
}
