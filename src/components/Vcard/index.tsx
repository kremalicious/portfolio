'use client'

import meta from '@content/meta.json'
import type { MouseEvent } from 'react'

export default function Vcard() {
  const handleAddressbookClick = (e: MouseEvent) => {
    e.preventDefault()

    import('./_utils').then(({ init }) => init())
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
