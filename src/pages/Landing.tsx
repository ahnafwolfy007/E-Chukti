import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  FileText, 
  Sparkles, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  ChevronDown
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar variant="transparent" />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIShowcaseSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-purple-600 to-pink-500">
      {/* Animated Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative container mx-auto px-4 py-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Contract Automation</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Smart Contracts Made
            <br />
            <span className="text-yellow-300">Simple & Fast</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Create, manage, and automate legal contracts in minutes. 
            Perfect for Bangladeshi businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Generate custom contracts in seconds using our advanced AI engine.',
      color: 'bg-purple-500'
    },
    {
      icon: FileText,
      title: 'Smart Templates',
      description: 'Choose from 100+ professionally crafted legal templates.',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-level security with Bangladeshi legal compliance.',
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      title: 'Auto Reminders',
      description: 'Never miss a contract renewal with smart notifications.',
      color: 'bg-orange-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together with your team on contract management.',
      color: 'bg-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track and analyze your contract portfolio in real-time.',
      color: 'bg-indigo-500'
    },
  ]

  return (
    <section id="features" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Everything you need to manage contracts efficiently and effortlessly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full">
        <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-neutral-600">
          {feature.description}
        </p>
      </Card>
    </motion.div>
  )
}

function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      number: '01',
      title: 'Choose Template or Use AI',
      description: 'Select from our library or let AI create a custom contract',
    },
    {
      number: '02',
      title: 'Fill in Details',
      description: 'Add your specific requirements and clauses',
    },
    {
      number: '03',
      title: 'Review & Edit',
      description: 'Make any final adjustments to your contract',
    },
    {
      number: '04',
      title: 'Download & Use',
      description: 'Get your contract ready to sign in multiple formats',
    },
  ]

  return (
    <section id="how-it-works" ref={ref} className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600">
            Get your contract ready in 4 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <Card className="text-center h-full">
                <div className="text-6xl font-bold text-primary-100 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-neutral-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIShowcaseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI That Understands Legal Language
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our advanced AI has been trained on thousands of legal documents to create accurate, 
              compliant contracts tailored to your needs.
            </p>
            <ul className="space-y-4">
              {['Context-aware generation', 'Legal compliance checks', 'Instant customization', 'Multi-language support'].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-neutral-200 rounded w-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-20 bg-gradient-primary rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg animate-bounce-soft">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: '10,000+', label: 'Contracts Created' },
    { value: '2,500+', label: 'Happy Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <section className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying out',
      features: ['5 contracts/month', 'Basic templates', 'Email support', '7-day history'],
    },
    {
      name: 'Pro',
      price: '999',
      description: 'For growing businesses',
      features: ['Unlimited contracts', 'All templates', 'AI generation', 'Priority support', 'Full history', 'Team collaboration'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: ['Everything in Pro', 'Custom templates', 'Dedicated support', 'API access', 'On-premise option', 'SLA guarantee'],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-neutral-600">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className={`h-full ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neutral-900">
                    {plan.price === 'Custom' ? plan.price : `৳${plan.price}`}
                  </span>
                  {plan.price !== 'Custom' && <span className="text-neutral-600">/month</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? 'primary' : 'secondary'} 
                  className="w-full"
                >
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Contract Management?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using E-Chukti to streamline their legal processes.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
