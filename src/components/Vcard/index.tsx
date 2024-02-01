'use client'

import meta from '../../../_content/meta.json'

export default function Vcard() {
  const { name, label, email } = meta.author

  const vCardMeta = {
    ...meta,
    /// photoSrc,
    name,
    label,
    email,
    profiles: meta.profiles
  }

  const handleAddressbookClick = (e) => {
    e.preventDefault()

    import('./_utils').then(({ init }) => {
      init(vCardMeta)
    })
  }

  return (
    <a
      // href is kinda fake, only there for usability
      // so user knows what to expect when hovering the link before clicking
      href={meta.addressbook}
      onClick={handleAddressbookClick}
    >
      Add to addressbook
    </a>
  )
}
