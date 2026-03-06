import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Eye, FileText } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Badge from '../components/common/Badge'
import Modal from '../components/common/Modal'

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)

  const categories = ['all', 'employment', 'service', 'nda', 'vendor', 'lease', 'partnership']

  const templates = [
    { id: 1, name: 'Employment Contract', category: 'employment', price: 0, downloads: 1234, rating: 4.8, preview: 'Standard employment agreement template with all necessary clauses...' },
    { id: 2, name: 'Service Agreement', category: 'service', price: 0, downloads: 987, rating: 4.7, preview: 'Professional service agreement for service providers...' },
    { id: 3, name: 'Non-Disclosure Agreement', category: 'nda', price: 0, downloads: 2341, rating: 4.9, preview: 'Comprehensive NDA template to protect confidential information...' },
    { id: 4, name: 'Vendor Agreement', category: 'vendor', price: 500, downloads: 543, rating: 4.6, preview: 'Vendor contract template for supplier relationships...' },
    { id: 5, name: 'Office Lease Agreement', category: 'lease', price: 750, downloads: 432, rating: 4.8, preview: 'Commercial lease agreement for office spaces...' },
    { id: 6, name: 'Partnership Agreement', category: 'partnership', price: 1000, downloads: 234, rating: 4.9, preview: 'Partnership contract with profit sharing clauses...' },
    { id: 7, name: 'Independent Contractor Agreement', category: 'employment', price: 500, downloads: 876, rating: 4.7, preview: 'Agreement for independent contractors and freelancers...' },
    { id: 8, name: 'Consulting Agreement', category: 'service', price: 600, downloads: 654, rating: 4.8, preview: 'Professional consulting services contract template...' },
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Template Library</h1>
          <p className="text-neutral-600 mt-1">Choose from professionally crafted contract templates</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search templates..."
                icon={<Search className="w-5 h-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" icon={<Filter className="w-5 h-5" />}>
              Filter
            </Button>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  {template.price === 0 ? (
                    <Badge variant="success">Free</Badge>
                  ) : (
                    <Badge variant="warning">৳{template.price}</Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {template.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div>{template.downloads} downloads</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setPreviewTemplate(template)}
                    icon={<Eye className="w-4 h-4" />}
                  >
                    Preview
                  </Button>
                  <Button size="sm" variant="primary" className="flex-1">
                    Use Template
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Preview Modal */}
        <Modal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          title={previewTemplate?.name}
          size="lg"
          footer={
            <>
              <Button variant="ghost" onClick={() => setPreviewTemplate(null)}>
                Close
              </Button>
              <Button variant="primary">Use This Template</Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant={previewTemplate?.price === 0 ? 'success' : 'warning'}>
                {previewTemplate?.price === 0 ? 'Free' : `৳${previewTemplate?.price}`}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-neutral-600">{previewTemplate?.rating} rating</span>
              </div>
              <span className="text-sm text-neutral-600">{previewTemplate?.downloads} downloads</span>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-neutral-700">{previewTemplate?.preview}</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6 max-h-96 overflow-y-auto">
              <h4 className="font-semibold text-neutral-900 mb-4">Template Preview</h4>
              <div className="prose prose-sm max-w-none text-neutral-700">
                <p>CONTRACT AGREEMENT</p>
                <p>This agreement is made on [Date] between:</p>
                <p>Party A: [Name]</p>
                <p>Party B: [Name]</p>
                <p className="mt-4">1. TERMS AND CONDITIONS</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <p className="mt-4">2. PAYMENT</p>
                <p>The agreed upon payment shall be...</p>
                <p className="mt-4">3. DURATION</p>
                <p>This agreement shall remain in effect for...</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
