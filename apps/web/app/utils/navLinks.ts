import type { Link } from '~/types'

export const navLinks: Pick<Link, 'label' | 'to' | 'icon'>[] = [
  { label: 'Home', to: '/', icon: 'i-lucide-house' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' },
  { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-book' },
  { label: 'Store', to: '/store', icon: 'i-lucide-shopping-cart' }
]
