import { Link } from 'react-router-dom'
import { FileText, Twitter, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">E-Chukti</span>
            </Link>
            <p className="text-sm text-neutral-400">
              Smart Contract Automation Platform for Bangladesh. Simplify your legal documentation.
            </p>
            <div className="flex gap-4 mt-4">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#templates">Templates</FooterLink>
              <FooterLink href="#ai-generator">AI Generator</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#cookies">Cookie Policy</FooterLink>
              <FooterLink href="#disclaimer">Disclaimer</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © 2026 E-Chukti. All rights reserved.
          </p>
          <p className="text-sm text-neutral-400">
            Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-sm hover:text-white transition-colors">
        {children}
      </a>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
    >
      {icon}
    </a>
  )
}
