import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useOrderModal } from '../../context/useOrderModal'

/**
 * SmoothScroll: Wraps the application with Studio Freight / Darkroom Engineering Lenis
 * for ultra-smooth, weighted inertial scrolling at 60-120fps.
 */
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const { isOpen } = useOrderModal()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let animationFrameId

    function raf(time) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  // When order modal is open, pause background Lenis scroll
  useEffect(() => {
    if (lenisRef.current) {
      if (isOpen) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [isOpen])

  return children
}
