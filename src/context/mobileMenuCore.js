import { createContext } from 'react'

export const MobileMenuContext = createContext({
  isMobileMenuOpen: false,
  openMobileMenu: () => {},
  closeMobileMenu: () => {},
  toggleMobileMenu: () => {},
})
