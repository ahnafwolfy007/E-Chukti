import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  hover?: boolean
  className?: string
  onClick?: () => void
}

export default function Card({ children, hover = false, className, onClick }: CardProps) {
  const CardComponent = onClick ? motion.button : motion.div

  return (
    <CardComponent
      whileHover={hover ? { y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={clsx(
        'bg-white rounded-xl p-6 shadow-smooth transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </CardComponent>
  )
}
