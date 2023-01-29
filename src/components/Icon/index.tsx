// https://featherstyles.com
// import * as Feather from 'react-feather'
import {
  ArrowDownCircle,
  Award,
  BookOpen,
  Briefcase,
  Check,
  ChevronDown,
  Compass,
  Dribbble,
  Edit,
  FileText,
  GitHub,
  Globe,
  Image,
  Info,
  Key,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Rss,
  Star,
  Sun,
  Twitter
} from 'react-feather'
import Mastodon from '../../images/mastodon.svg'
import styles from './index.module.css'

export default function Icon({ name, ...props }: { name: string }) {
  const components = {
    Dribbble,
    Email: Mail,
    Link: Compass,
    Download: ArrowDownCircle,
    'Info & Download': ArrowDownCircle,
    Styleguide: FileText,
    Blog: Edit,
    Keybase: Key,
    ArrowDownCircle,
    Edit,
    GitHub,
    Twitter,
    Rss,
    Sun,
    Moon,
    Compass,
    FileText,
    Key,
    Image,
    Mail,
    MapPin,
    Globe,
    Briefcase,
    Award,
    BookOpen,
    Star,
    Info,
    Mastodon,
    ChevronDown,
    Check,
    Monitor
  }

  const IconMapped = components[name]
  // const IconComp = Feather[name]
  if (!IconMapped) return null

  return <IconMapped className={`${styles.icon} ${styles[name]}`} {...props} />
}
