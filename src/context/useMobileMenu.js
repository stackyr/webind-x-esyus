import { useContext } from 'react'
import { MobileMenuContext } from './mobileMenuCore'

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider')
  }
  return context
}
