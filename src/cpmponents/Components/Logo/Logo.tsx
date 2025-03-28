import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  onClick?: () => void
  className?: string
}

export const Logo = ({ onClick, className = '' }: LogoProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set a timeout to ensure the logo appears consistently
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Move problematic styles to a separate CSS class in index.css
  const logoStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
    fontWeight: 800,
    background: 'linear-gradient(to right, #38BDF8, #A855F7)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.5px',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    minWidth: 'max-content',
    maxWidth: '100%',
  }

  return (
    <motion.div
      ref={logoRef}
      style={logoStyle}
      className={`logo-text ${className}`}
      onClick={onClick}
      suppressHydrationWarning={true}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      Shreyas
    </motion.div>
  )
}

export default Logo 