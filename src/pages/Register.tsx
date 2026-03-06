import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Building, FileText } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyType: 'sme',
    agreeTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password) {
        toast.error('Please fill in all fields')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      setStep(2)
      return
    }

    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Account created successfully!')
      navigate('/dashboard')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900">E-Chukti</span>
          </Link>

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-neutral-600 mb-8">
            Start managing contracts in minutes
          </p>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary-500' : 'bg-neutral-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-neutral-200'}`}></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="John Doe"
                  icon={<User className="w-5 h-5" />}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  icon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="Create a strong password"
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />

                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />

                <Button type="submit" variant="primary" className="w-full">
                  Continue
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Input
                  type="text"
                  label="Company Name"
                  placeholder="Your Company Ltd."
                  icon={<Building className="w-5 h-5" />}
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, companyType: 'sme' })}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.companyType === 'sme'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-semibold">SME</div>
                      <div className="text-sm text-neutral-600">Small Business</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, companyType: 'enterprise' })}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        formData.companyType === 'enterprise'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-sm text-neutral-600">Large Company</div>
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary-500 hover:text-primary-600">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-500 hover:text-primary-600">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1" loading={loading}>
                    Create Account
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image/Illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center p-12"
      >
        <div className="text-white text-center max-w-md">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="mb-8"
          >
            <div className="w-64 h-64 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center transform rotate-6">
              <FileText className="w-32 h-32" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">
            Join 10,000+ Businesses
          </h2>
          <p className="text-white/80 text-lg">
            Trusted by companies across Bangladesh for streamlined contract management
          </p>
        </div>
      </motion.div>
    </div>
  )
}
