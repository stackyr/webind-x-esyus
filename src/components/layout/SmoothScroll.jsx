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
    // Ultra-luxurious, slow-smooth gliding inertia configuration
    const lenis = new Lenis({
      lerp: 0.055, // Silky, slow-smooth inertia damping (floating luxury feel)
      wheelMultiplier: 0.85, // Controlled wheel travel per step to prevent abrupt jumps
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: false, // Keep native 120Hz responsive feel on mobile touchscreens
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
      autoResize: true,
      allowNestedScroll: true,
      prevent: (node) => {
        if (!node || !(node instanceof Element)) return false
        return (
          node.hasAttribute?.('data-lenis-prevent') ||
          Boolean(node.closest?.('[data-lenis-prevent]')) ||
          Boolean(node.closest?.('#order-modal-scroll'))
        )
      },
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    // Zero-jank hover bypass: disable hover calculations & repaints while scrolling
    let scrollTimeout = null
    const handleScroll = () => {
      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling')
      }
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 100)
    }

    lenis.on('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })

    let animationFrameId

    function raf(time) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.off('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      document.body.classList.remove('is-scrolling')
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
