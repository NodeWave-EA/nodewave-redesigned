import type { Link } from '~/types'

export const navLinks: Pick<Link, 'label' | 'to' | 'icon'>[] = [
  { label: 'Home', to: '/', icon: 'i-line-md-home-simple-twotone' },
  { label: 'About', to: '/about', icon: 'i-line-md-alert-circle-loop' },
  { label: 'Contact', to: '/contact', icon: 'i-line-md-email-multiple' },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'i-line-md-text-box-twotone-to-text-box-multiple-twotone-transition'
  },
  { label: 'Store', to: '/store', icon: 'i-lucide-store' }
]
