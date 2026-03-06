import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Layers,
  Sparkles,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/contracts', icon: FileText, label: 'My Contracts' },
    { href: '/templates', icon: Layers, label: 'Templates' },
    { href: '/ai-generator', icon: Sparkles, label: 'AI Generator' },
    { href: '/renewals', icon: Bell, label: 'Renewals' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-200 z-50 lg:translate-x-0 lg:static"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-200">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">E-Chukti</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <Link key={link.href} to={link.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1 h-6 bg-primary-500 rounded-full"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-neutral-200">
            <Link to="/login">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
