import type { NavLink } from '~/types/navLink'

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' },
  { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-book' },
  { label: 'Store', to: '/store', icon: 'i-lucide-shopping-cart' }
]
