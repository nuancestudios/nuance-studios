/**
 * Single source of truth for outbound links.
 * Change it here and every link on the site follows.
 */

export const EMAIL = 'contact@nuancestudios.in'

export const INSTAGRAM = 'https://www.instagram.com/nu.ancestudios/'

/** Nav / footer anchors that are plain on-page sections, not external links. */
export const isExternal = (href = '') => /^https?:\/\//.test(href)
