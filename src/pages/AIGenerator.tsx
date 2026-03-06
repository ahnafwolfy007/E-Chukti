import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Sparkles, Check, FileText, Home, Briefcase, Users, FileCode } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getContractTemplate, ContractField, getAllContractTypes } from '../data/contractTemplates'

export default function AIGenerator() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [selectedContractType, setSelectedContractType] = useState('')
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleGenerate = () => {
    const template = getContractTemplate(selectedContractType)
    if (!template) return

    setGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const contractDocument = template.generateDocument(formData)

      
      // Store in localStorage for the editor
      localStorage.setItem('currentContract', JSON.stringify({
        id: Date.now(),
        type: selectedContractType,
        content: contractDocument,
        data: formData,
        createdAt: new Date().toISOString()
      }))
      
      setGenerating(false)
      setStep(3)
      toast.success('Contract generated successfully!')
    }, 2000)
  }

  const contractTypes = getAllContractTypes()
  const template = getContractTemplate(selectedContractType)

  const iconMap: Record<string, any> = {
    service: <Briefcase />,
    employment: <Users />,
    rent: <Home />,
    freelance: <FileCode />
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            contractTypes={contractTypes}
            selectedType={selectedContractType}
            onSelect={setSelectedContractType}
            iconMap={iconMap}
          />
        )
      case 2:
        return (
          <Step2
            template={template}
            formData={formData}
            setFormData={setFormData}
            generating={generating}
            handleGenerate={handleGenerate}
          />
        )
      case 3:
        return <Step3 navigate={navigate} />
      default:
        return null
    }
  }

  const canContinue = () => {
    if (step === 1) return !!selectedContractType
    if (step === 2) {
      // Check if all required fields are filled
      if (!template) return false
      return template.fields
        .filter(f => f.required)
        .every(f => formData[f.id] && formData[f.id].trim() !== '')
    }
    return true
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">AI Contract Generator</h1>
              <p className="text-neutral-600">Create legal contracts for Bangladesh in minutes</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-2 rounded-full flex-1 transition-all ${
                    s <= step ? 'bg-primary-500' : 'bg-neutral-200'
                  }`}
                />
                {s < 3 && <ChevronRight className="w-4 h-4 text-neutral-400 mx-1" />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
              Select Type
            </span>
            <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
              Fill Details
            </span>
            <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
              Complete
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        {/* Navigation Buttons */}
        {step < 3 && !generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between mt-8"
          >
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                icon={<ChevronLeft className="w-5 h-5" />}
              >
                Back
              </Button>
            )}
            {step < 2 && (
              <Button
                onClick={() => setStep(step + 1)}
                className="ml-auto"
                disabled={!canContinue()}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}

function Step1({ contractTypes, selectedType, onSelect, iconMap }: any) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Select Contract Type</h2>
        <p className="text-neutral-600 mb-6">
          Choose the type of contract you want to create for Bangladesh
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contractTypes.map((type: any) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(type.id)}
              className={`p-6 rounded-lg border-2 text-left transition-all ${
                selectedType === type.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  selectedType === type.id ? 'bg-primary-100' : 'bg-neutral-100'
                }`}>
                  {iconMap[type.id] && (
                    <div className={selectedType === type.id ? 'text-primary-600' : 'text-neutral-600'}>
                      {iconMap[type.id]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 mb-1">{type.title}</h3>
                  <p className="text-sm text-neutral-600">{type.description}</p>
                </div>
                {selectedType === type.id && (
                  <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

function Step2({ template, formData, setFormData, generating, handleGenerate }: any) {
  if (!template) return null

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value })
  }

  const renderField = (field: ContractField) => {
    const commonProps = {
      label: field.label + (field.required ? ' *' : ''),
      value: formData[field.id] || '',
      onChange: (e: any) => handleFieldChange(field.id, e.target.value),
      placeholder: field.placeholder
    }

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {commonProps.label}
            </label>
            <textarea
              value={commonProps.value}
              onChange={commonProps.onChange}
              placeholder={commonProps.placeholder}
              required={field.required}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32 resize-none"
            />
          </div>
        )
      
      case 'select':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {commonProps.label}
            </label>
            <select
              value={commonProps.value}
              onChange={commonProps.onChange}
              required={field.required}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )
      
      case 'date':
        return (
          <div key={field.id} className="mb-6">
            <Input
              {...commonProps}
              type="date"
              required={field.required}
            />
          </div>
        )
      
      case 'number':
        return (
          <div key={field.id} className="mb-6">
            <Input
              {...commonProps}
              type="number"
              required={field.required}
            />
          </div>
        )
      
      default:
        return (
          <div key={field.id} className="mb-6">
            <Input
              {...commonProps}
              type="text"
              required={field.required}
            />
          </div>
        )
    }
  }

  const requiredFieldsFilled = template.fields
    .filter((f: ContractField) => f.required)
    .every((f: ContractField) => formData[f.id] && formData[f.id].trim() !== '')

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{template.title}</h2>
        <p className="text-neutral-600 mb-6">
          Fill in all required fields to generate your contract
        </p>

        {generating ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Sparkles className="w-16 h-16 text-primary-500" />
            </motion.div>
            <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-2">
              Generating Your Contract...
            </h3>
            <p className="text-neutral-600">Creating a professional legal document</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {template.fields.map((field: ContractField) => renderField(field))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-600">
                    * Required fields
                  </p>
                  {!requiredFieldsFilled && (
                    <p className="text-sm text-orange-600 mt-1">
                      Please fill in all required fields
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleGenerate}
                className="w-full"
                size="lg"
                disabled={!requiredFieldsFilled}
              >
                <Sparkles className="w-5 h-5" />
                Generate Contract
              </Button>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  )
}

function Step3({ navigate }: any) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Contract Generated!</h2>
        <p className="text-neutral-600 mb-8">
          Your contract has been successfully generated and is ready for review and download.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/contracts/new/edit')} size="lg">
            <FileText className="w-5 h-5" />
            Review & Download PDF
          </Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')} size="lg">
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
