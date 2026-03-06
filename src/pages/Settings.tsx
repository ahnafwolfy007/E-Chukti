import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Bell, CreditCard, Shield, Palette } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'company' && <CompanySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'billing' && <BillingSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'preferences' && <PreferencesSettings />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function ProfileSettings() {
  const handleSave = () => {
    toast.success('Profile updated successfully!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Profile Settings</h2>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <Button variant="primary" size="sm">Change Photo</Button>
              <p className="text-sm text-neutral-600 mt-1">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email Address" type="email" defaultValue="john@example.com" />
          <Input label="Phone Number" defaultValue="+880 1234567890" />
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Bio</label>
            <textarea
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-32 resize-none"
              defaultValue="Contract management professional"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function CompanySettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Company Settings</h2>
        <div className="space-y-6">
          <Input label="Company Name" defaultValue="ABC Corporation" />
          <Input label="Business Registration Number" defaultValue="BRN123456789" />
          <Input label="Tax ID" defaultValue="TIN987654321" />
          <Input label="Company Address" defaultValue="123 Business Street, Dhaka" />
          <Input label="Company Website" defaultValue="https://example.com" />

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function NotificationSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Notification Settings</h2>
        <div className="space-y-4">
          {[
            { title: 'Contract Expiry Reminders', desc: 'Get notified 30 days before contract expiry' },
            { title: 'Renewal Alerts', desc: 'Receive alerts for upcoming renewals' },
            { title: 'New Template Releases', desc: 'Be notified when new templates are available' },
            { title: 'Team Activity', desc: 'Get updates on team member activities' },
            { title: 'Email Digest', desc: 'Receive daily summary of contract activities' },
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
              <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500" />
              <div>
                <div className="font-medium text-neutral-900">{item.title}</div>
                <div className="text-sm text-neutral-600">{item.desc}</div>
              </div>
            </label>
          ))}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save Preferences</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function BillingSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Billing & Subscription</h2>
        <div className="space-y-6">
          <div className="p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-neutral-900">Current Plan: Pro</h3>
              <span className="text-2xl font-bold text-primary-600">৳999/mo</span>
            </div>
            <p className="text-sm text-neutral-600">Next billing date: March 24, 2026</p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Payment Method</h3>
            <div className="p-4 border border-neutral-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                  VISA
                </div>
                <div>
                  <div className="font-medium text-neutral-900">•••• 4242</div>
                  <div className="text-sm text-neutral-600">Expires 12/2025</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Update</Button>
            </div>
          </div>

          <div>
            <Button variant="danger">Cancel Subscription</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function SecuritySettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Security Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Change Password</h3>
            <div className="space-y-4">
              <Input type="password" label="Current Password" />
              <Input type="password" label="New Password" />
              <Input type="password" label="Confirm New Password" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Two-Factor Authentication</h3>
            <div className="p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">Enable 2FA</div>
                  <div className="text-sm text-neutral-600">Add an extra layer of security</div>
                </div>
                <Button variant="primary" size="sm">Enable</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Update Security</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function PreferencesSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Preferences</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
            <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>English</option>
              <option>বাংলা (Bengali)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-primary-500 rounded-lg bg-primary-50">
                <div className="text-center">
                  <div className="font-semibold text-neutral-900">Light</div>
                </div>
              </button>
              <button className="p-4 border-2 border-neutral-200 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-neutral-900">Dark</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Date Format</label>
            <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save Preferences</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
