import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Download, Printer, Clock, Eye, FileText, X, Sparkles } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { generatePDF } from '../utils/pdfGenerator'
import { compileLatexToPdf } from '../utils/latexGenerator'

export default function ContractEditor() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [contractData, setContractData] = useState<any>(null)
  const [autoSaving, setAutoSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)

  // Helper function to render inline markdown formatting (bold, italic)
  const renderInlineFormatting = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let currentIndex = 0
    let partKey = 0

    // Process bold text **text**
    const boldRegex = /\*\*(.+?)\*\*/g
    let match

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index))
      }
      // Add the bold text
      parts.push(<strong key={`bold-${partKey++}`}>{match[1]}</strong>)
      currentIndex = match.index + match[0].length
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex))
    }

    return parts.length > 0 ? parts : text
  }

  useEffect(() => {
    // Load contract from localStorage
    const savedContract = localStorage.getItem('currentContract')
    if (savedContract) {
      const contract = JSON.parse(savedContract)
      setContractData(contract)
      setContent(contract.content)
    } else {
      toast.error('No contract found')
      setTimeout(() => navigate('/ai-generator'), 2000)
    }
  }, [navigate])

  const handleSave = () => {
    setAutoSaving(true)
    setTimeout(() => {
      // Update localStorage
      if (contractData) {
        const updated = {
          ...contractData,
          content,
          lastModified: new Date().toISOString()
        }
        localStorage.setItem('currentContract', JSON.stringify(updated))
        setContractData(updated)
      }
      setAutoSaving(false)
      toast.success('Contract saved successfully!')
    }, 1000)
  }

  const handleDownloadPDF = () => {
    if (!content) {
      toast.error('No content to download')
      return
    }

    try {
      const filename = `${contractData?.type || 'contract'}_${Date.now()}.pdf`
      generatePDF(content, filename)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
    }
  }

  const handleDownloadHighQualityPDF = async () => {
    if (!content) {
      toast.error('No content to download')
      return
    }

    setIsCompiling(true)
    const toastId = toast.loading('Generating high-quality PDF...')
    
    try {
      const filename = `${contractData?.type || 'contract'}_HQ_${Date.now()}.pdf`
      
      // Pass markdown content directly, not LaTeX
      await compileLatexToPdf(content, filename)
      toast.dismiss(toastId)
      toast.success('High-quality PDF downloaded successfully!', { duration: 4000 })
    } catch (error) {
      toast.dismiss(toastId)
      console.error('LaTeX compilation error:', error)
      toast.error(
        'LaTeX compilation service is temporarily unavailable. Please use Quick PDF instead or try again later.',
        { duration: 6000 }
      )
    } finally {
      setIsCompiling(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const contractTypeNames: Record<string, string> = {
    service: 'Service Agreement',
    employment: 'Employment Agreement',
    rent: 'House Rent Agreement',
    freelance: 'Freelance Agreement'
  }

  if (!contractData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Clock className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
            <p className="text-neutral-600">Loading contract...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Contract Editor</h1>
            <p className="text-neutral-600 mt-1">
              {contractTypeNames[contractData.type] || contractData.type}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info">Draft</Badge>
            {autoSaving ? (
              <span className="text-sm text-neutral-600 flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="text-sm text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Saved
              </span>
            )}
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                onClick={handleSave}
                icon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleDownloadHighQualityPDF}
                icon={<Sparkles className="w-4 h-4" />}
                disabled={isCompiling}
              >
                {isCompiling ? 'Compiling LaTeX...' : 'Download High-Quality PDF'}
              </Button>

              <Button
                variant="ghost"
                onClick={handleDownloadPDF}
                icon={<Download className="w-4 h-4" />}
              >
                Quick PDF
              </Button>

              <Button
                variant="ghost"
                onClick={handlePrint}
                icon={<Printer className="w-4 h-4" />}
              >
                Print
              </Button>
              
              <div className="ml-auto flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  icon={showPreview ? <X className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                >
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </div>
            </div>
            
            {/* Info text */}
            <div className="mt-3 text-xs text-neutral-500 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>High-Quality PDF:</strong> Professional LaTeX-compiled PDF with superior typography (takes 10-15 seconds). 
                <strong className="ml-2">Quick PDF:</strong> Instant download, good for previews.
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`grid grid-cols-1 ${showPreview ? 'lg:grid-cols-2' : ''} gap-6`}
        >
          {/* Editor Panel */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Editor</h3>
              <span className="text-sm text-neutral-500">
                {content.length} characters
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[600px] p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
              placeholder="Edit your contract here..."
            />
          </Card>

          {/* Preview Panel */}
          {showPreview && (
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Preview
              </h3>
              <div className="h-[600px] overflow-y-auto p-6 bg-white border border-neutral-200 rounded-lg">
                <div className="prose prose-sm max-w-none">
                  {content.split('\n').map((line, index) => {
                    const trimmed = line.trim()
                    
                    // Headers
                    if (trimmed.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-2xl font-bold mb-4 mt-6 text-center">
                          {trimmed.substring(2)}
                        </h1>
                      )
                    }
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-xl font-bold mb-3 mt-5 text-primary-600">
                          {trimmed.substring(3)}
                        </h2>
                      )
                    }
                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-lg font-semibold mb-2 mt-4 text-primary-700">
                          {trimmed.substring(4)}
                        </h3>
                      )
                    }
                    
                    // Lists
                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                      const text = trimmed.substring(2)
                      return (
                        <li key={index} className="ml-6 mb-1">
                          {renderInlineFormatting(text)}
                        </li>
                      )
                    }
                    
                    // Horizontal rule
                    if (trimmed === '---') {
                      return <hr key={index} className="my-4 border-neutral-300" />
                    }
                    
                    // Empty lines
                    if (trimmed === '') {
                      return <br key={index} />
                    }
                    
                    // Regular paragraphs with inline formatting
                    return (
                      <p key={index} className="mb-2 text-neutral-700">
                        {renderInlineFormatting(line)}
                      </p>
                    )
                  })}
                </div>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Contract Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-700">Created</h4>
                <p className="text-neutral-900 text-sm">
                  {formatDate(contractData.createdAt)}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-700">Last Modified</h4>
                <p className="text-neutral-900 text-sm">
                  {formatDate(contractData.lastModified || contractData.createdAt)}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-700">Word Count</h4>
                <p className="text-neutral-900 text-sm">
                  {content.split(/\s+/).filter(w => w.length > 0).length} words
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center border-t border-neutral-200 pt-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/contracts')}
          >
            Back to Contracts
          </Button>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                if (confirm('Are you sure you want to discard changes?')) {
                  navigate('/contracts')
                }
              }}
            >
              Discard
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleSave()
                setTimeout(() => navigate('/contracts'), 1500)
              }}
            >
              Save & Close
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
