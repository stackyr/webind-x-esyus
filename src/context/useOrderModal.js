import { useContext } from 'react'
import { OrderModalContext } from './orderModalCore'

export function useOrderModal() {
  const context = useContext(OrderModalContext)
  if (!context) {
    throw new Error('useOrderModal must be used within an OrderModalProvider')
  }
  return context
}
