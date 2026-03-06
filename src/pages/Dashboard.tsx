import { motion } from 'framer-motion'
import { FileText, Clock, AlertCircle, TrendingUp, Plus, Eye, Edit, Download } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const stats = [
    { icon: FileText, label: 'Total Contracts', value: '47', change: '+12%', color: 'bg-blue-500' },
    { icon: Clock, label: 'Active', value: '28', change: '+8%', color: 'bg-green-500' },
    { icon: AlertCircle, label: 'Expiring Soon', value: '5', change: '+2', color: 'bg-orange-500' },
    { icon: TrendingUp, label: 'This Month', value: '12', change: '+15%', color: 'bg-purple-500' },
  ]

  const contractData = [
    { name: 'Active', value: 28, color: '#10B981' },
    { name: 'Draft', value: 8, color: '#F59E0B' },
    { name: 'Expired', value: 7, color: '#EF4444' },
    { name: 'Pending', value: 4, color: '#6B7280' },
  ]

  const monthlyData = [
    { name: 'Jan', contracts: 8 },
    { name: 'Feb', contracts: 12 },
    { name: 'Mar', contracts: 10 },
    { name: 'Apr', contracts: 15 },
    { name: 'May', contracts: 14 },
    { name: 'Jun', contracts: 12 },
  ]

  const recentContracts = [
    { id: 1, title: 'Employment Agreement - John Doe', status: 'active', date: '2026-02-20', type: 'Employment' },
    { id: 2, title: 'Service Agreement - ABC Corp', status: 'pending', date: '2026-02-18', type: 'Service' },
    { id: 3, title: 'NDA - Tech Solutions Ltd', status: 'active', date: '2026-02-15', type: 'NDA' },
    { id: 4, title: 'Vendor Agreement - XYZ Supplies', status: 'expiring', date: '2026-03-01', type: 'Vendor' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-neutral-600 mt-1">Welcome back! Here's your contract overview</p>
          </div>
          <Link to="/ai-generator">
            <Button icon={<Plus className="w-5 h-5" />}>
              Create New Contract
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Contract Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contractData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart */}
          <Card>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="contracts" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Contracts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900">Recent Contracts</h3>
            <Link to="/contracts">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Contract</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentContracts.map((contract) => (
                  <motion.tr
                    key={contract.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                    className="border-b border-neutral-100"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-900">{contract.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-neutral-600">{contract.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          contract.status === 'active' ? 'success' :
                          contract.status === 'pending' ? 'warning' :
                          contract.status === 'expiring' ? 'danger' : 'default'
                        }
                      >
                        {contract.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-600">{contract.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-neutral-600" />
                        </button>
                        <Link to={`/contracts/${contract.id}/edit`}>
                          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-neutral-600" />
                          </button>
                        </Link>
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/ai-generator">
            <Card hover className="cursor-pointer">
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-1">AI Generator</h4>
                <p className="text-sm text-neutral-600">Create with AI</p>
              </div>
            </Card>
          </Link>
          <Link to="/templates">
            <Card hover className="cursor-pointer">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-1">Templates</h4>
                <p className="text-sm text-neutral-600">Browse library</p>
              </div>
            </Card>
          </Link>
          <Link to="/contracts">
            <Card hover className="cursor-pointer">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-1">Renewals</h4>
                <p className="text-sm text-neutral-600">Check reminders</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
