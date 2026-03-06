import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import Button from '../common/Button'

interface NavbarProps {
  variant?: 'transparent' | 'solid'
}

export default function Navbar({ variant = 'transparent' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = variant === 'transparent' && !isScrolled

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${isTransparent ? 'text-white' : 'text-neutral-900'}`}>
              E-Chukti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features" isTransparent={isTransparent}>Features</NavLink>
            <NavLink href="#how-it-works" isTransparent={isTransparent}>How It Works</NavLink>
            <NavLink href="#pricing" isTransparent={isTransparent}>Pricing</NavLink>
            <NavLink href="#about" isTransparent={isTransparent}>About</NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant={isTransparent ? 'ghost' : 'ghost'} className={isTransparent ? 'text-white hover:bg-white/10' : ''}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-neutral-900'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-neutral-900'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <a href="#features" className="text-neutral-700 hover:text-primary-500 py-2">Features</a>
            <a href="#how-it-works" className="text-neutral-700 hover:text-primary-500 py-2">How It Works</a>
            <a href="#pricing" className="text-neutral-700 hover:text-primary-500 py-2">Pricing</a>
            <a href="#about" className="text-neutral-700 hover:text-primary-500 py-2">About</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
              <Link to="/login">
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children, isTransparent }: { href: string; children: React.ReactNode; isTransparent: boolean }) {
  return (
    <a
      href={href}
      className={`font-medium transition-colors ${
        isTransparent
          ? 'text-white hover:text-primary-200'
          : 'text-neutral-700 hover:text-primary-500'
      }`}
    >
      {children}
    </a>
  )
}
