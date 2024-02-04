export declare type Meta = {
  name?: string
  label?: string
  email?: string
  profiles?: (
    | { network: string; url: string; username?: undefined }
    | { network: string; username: string; url: string }
  )[]
  description?: string
  img?: string
  url?: string
  author?: { name: string; label: string; email: string; picture: string }
  availability?: { status: boolean; available: string; unavailable: string }
  gpg?: string
  addressbook?: any
  bugs?: string
  allowedHosts?: string[]
  photoSrc?: any
}
