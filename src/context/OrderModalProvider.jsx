import React, { useState } from 'react'
import { OrderModalContext } from './orderModalCore'

export function OrderModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState({})

  const openOrderModal = (data = {}) => {
    setInitialData(data)
    setIsOpen(true)
  }

  const closeOrderModal = () => {
    setIsOpen(false)
  }

  return (
    <OrderModalContext.Provider
      value={{
        isOpen,
        openOrderModal,
        closeOrderModal,
        initialData,
      }}
    >
      {children}
    </OrderModalContext.Provider>
  )
}
