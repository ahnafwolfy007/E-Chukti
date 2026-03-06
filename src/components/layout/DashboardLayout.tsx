import { ReactNode, useState } from 'react'
import { Menu, Bell, User, Search } from 'lucide-react'
import Sidebar from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search contracts..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-neutral-100 rounded-lg">
                <Bell className="w-6 h-6 text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block font-medium text-neutral-700">John Doe</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
