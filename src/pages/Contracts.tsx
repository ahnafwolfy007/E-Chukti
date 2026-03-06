import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Eye, Edit, Download, Trash2 } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { Link } from 'react-router-dom'

export default function Contracts() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')

  const contracts = [
    { id: 1, title: 'Employment Agreement - John Doe', status: 'active', date: '2026-02-20', expiryDate: '2027-02-20', type: 'Employment', parties: 'John Doe, ABC Corp' },
    { id: 2, title: 'Service Agreement - ABC Corp', status: 'pending', date: '2026-02-18', expiryDate: '2026-08-18', type: 'Service', parties: 'ABC Corp, XYZ Ltd' },
    { id: 3, title: 'NDA - Tech Solutions Ltd', status: 'active', date: '2026-02-15', expiryDate: '2028-02-15', type: 'NDA', parties: 'Tech Solutions, Partner Inc' },
    { id: 4, title: 'Vendor Agreement - XYZ Supplies', status: 'expiring', date: '2026-02-10', expiryDate: '2026-03-10', type: 'Vendor', parties: 'XYZ Supplies, Client Co' },
    { id: 5, title: 'Lease Agreement - Office Space', status: 'active', date: '2026-01-05', expiryDate: '2027-01-05', type: 'Lease', parties: 'Property Owner, Company' },
    { id: 6, title: 'Partnership Agreement - Joint Venture', status: 'draft', date: '2026-02-22', expiryDate: '2029-02-22', type: 'Partnership', parties: 'Partner A, Partner B' },
    { id: 7, title: 'Sales Contract - Equipment Purchase', status: 'active', date: '2026-01-28', expiryDate: '2026-06-28', type: 'Sales', parties: 'Seller, Buyer Company' },
    { id: 8, title: 'Consulting Agreement - IT Services', status: 'expired', date: '2025-12-01', expiryDate: '2026-02-01', type: 'Consulting', parties: 'Consultant, Client' },
  ]

  const filteredContracts = contracts.filter(contract =>
    contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Contracts</h1>
            <p className="text-neutral-600 mt-1">Manage all your contracts in one place</p>
          </div>
          <Link to="/ai-generator">
            <Button>Create New Contract</Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search contracts..."
                icon={<Search className="w-5 h-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" icon={<Filter className="w-5 h-5" />}>
                Filter
              </Button>
              <div className="flex border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-neutral-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Contracts List/Grid */}
        {viewMode === 'list' ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Contract</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Expires</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract, index) => (
                    <motion.tr
                      key={contract.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: '#F9FAFB' }}
                      className="border-b border-neutral-100"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-neutral-900">{contract.title}</div>
                        <div className="text-sm text-neutral-500">{contract.parties}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-neutral-600">{contract.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            contract.status === 'active' ? 'success' :
                            contract.status === 'pending' ? 'warning' :
                            contract.status === 'expiring' ? 'danger' :
                            contract.status === 'draft' ? 'info' : 'default'
                          }
                        >
                          {contract.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">{contract.date}</td>
                      <td className="py-3 px-4 text-sm text-neutral-600">{contract.expiryDate}</td>
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
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract, index) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant={
                        contract.status === 'active' ? 'success' :
                        contract.status === 'pending' ? 'warning' :
                        contract.status === 'expiring' ? 'danger' :
                        contract.status === 'draft' ? 'info' : 'default'
                      }
                    >
                      {contract.status}
                    </Badge>
                    <span className="text-xs text-neutral-500">{contract.type}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{contract.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{contract.parties}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <span>Created: {contract.date}</span>
                    <span>Expires: {contract.expiryDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Link to={`/contracts/${contract.id}/edit`} className="flex-1">
                      <Button size="sm" variant="primary" className="w-full">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm">Previous</Button>
          <Button variant="primary" size="sm">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
          <Button variant="ghost" size="sm">Next</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
