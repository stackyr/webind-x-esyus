import React, { useState, useEffect } from 'react'

export function TypewriterText({
  words = [
    'Built for the real world.',
    'Engineered with liquid precision.',
    'High-velocity SaaS platforms.',
    'Enterprise cloud software.',
    'Native iOS & Android apps.',
    'Conversion-driven websites.'
  ],
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2200,
  className = '',
}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]
    let timer

    if (isDeleting) {
      if (currentText === '') {
        timer = setTimeout(() => {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }, 280)
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        }, deletingSpeed)
      }
    } else {
      if (currentText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{currentText}</span>
      <span
        aria-hidden="true"
        className="inline-block w-[3px] h-[0.85em] ml-1.5 bg-gradient-to-b from-sky-400 via-cyan-400 to-indigo-500 rounded-full animate-blink align-middle shadow-[0_0_12px_rgba(56,189,248,0.9)]"
      />
    </span>
  )
}
