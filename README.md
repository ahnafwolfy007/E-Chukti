# 🎨 E-Chukti - Smart Contract Automation Platform

A modern, minimalistic, and highly responsive platform for **E-Chukti** - Digital Contract Platform for Bangladesh. Built with React 18, TypeScript, Tailwind CSS, and professional PDF generation capabilities.

![E-Chukti](https://img.shields.io/badge/E--Chukti-Frontend-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

---

## ✨ Features

### 🎯 Core Functionality
- **Landing Page** - Beautiful hero section with parallax effects and smooth animations
- **Authentication** - Multi-step registration and secure login
- **Dashboard** - Analytics, charts, and contract overview
- **Contract Management** - Create, edit, and manage contracts with localStorage
- **AI Generator** - 3-step wizard for contract generation with dynamic form fields
- **Template Library** - Browse and use professional contract templates
- **Contract Editor** - Split-view editor with live preview and markdown rendering
- **Settings** - Comprehensive user and company settings

### 📄 Contract Templates (Bangladesh Standards)
- **Service Agreement** - Client-Provider service contracts
- **Employment Agreement** - Employer-Employee contracts
- **House Rent Agreement** - Landlord-Tenant rental contracts
- **Freelance Agreement** - Client-Freelancer project contracts

### 🖨️ PDF Export Features
- **Quick PDF** - Instant download with jsPDF (basic formatting)
- **High-Quality PDF** - Professional LaTeX-style formatting:
  - 1-inch margins (25.4mm) matching format.tex
  - 1.15 line spacing (LaTeX standard)
  - Professional headers with page numbers
  - Centered titles and proper typography
  - Bold text support with inline formatting
  - List items with proper indentation
  - Professional footers

### 🎨 Design Features
- **Minimalistic Design** - Clean, spacious, and user-friendly interface
- **Smooth Animations** - Framer Motion powered transitions
- **Scroll Effects** - Parallax, fade-in, and reveal animations
- **Glass Morphism** - Modern glassmorphism effects
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Mode Ready** - Theme system prepared for dark mode
- **Accessibility** - WCAG compliant, keyboard navigation support

### 🚀 Technical Features
- **React 18** - Latest React with Hooks and Context
- **TypeScript** - Full type safety and IntelliSense
- **Tailwind CSS** - Utility-first styling with custom configuration
- **Framer Motion** - Professional animation library
- **React Router v6** - Client-side routing with nested routes
- **Recharts** - Interactive data visualization
- **React Hot Toast** - Beautiful toast notifications
- **Zustand** - Lightweight state management
- **jsPDF 2.5.1** - PDF generation with LaTeX-quality output
- **KaTeX** - LaTeX math rendering support

---

## 📁 Project Structure

```
Development Prototype/
├── public/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   └── layout/           # Layout components
│   │       ├── DashboardLayout.tsx
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── pages/                # Page components
│   │   ├── AIGenerator.tsx
│   │   ├── ContractEditor.tsx
│   │   ├── Contracts.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Settings.tsx
│   │   └── Templates.tsx
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the prototype folder:**
   ```bash
   cd "Development Prototype"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Primary Blue**: `#2563EB` - Main brand color
- **Primary Blue Light**: `#3B82F6` - Hover states
- **Primary Blue Dark**: `#1E40AF` - Active states

#### Secondary Colors
- **Purple**: `#7C3AED` - Accent elements
- **Green**: `#10B981` - Success states
- **Orange**: `#F59E0B` - Warning states
- **Red**: `#EF4444` - Error states

### Typography
- **Font Family**: Inter (body), Poppins (headings)
- **Font Sizes**: 12px - 60px (responsive scale)
- **Font Weights**: 300 - 800

### Spacing
- Uses consistent spacing scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

### Animations
- **Fade In**: Smooth fade-in effect
- **Fade Up**: Fade with upward motion
- **Slide In**: Horizontal slide animation
- **Scale In**: Scale with fade effect
- **Float**: Continuous floating animation
- **Bounce Soft**: Subtle bounce effect

---

## 📄 Pages Overview

### 1. Landing Page (`/`)
- Hero section with animated gradient background
- Features showcase with icon cards
- How it works timeline
- AI showcase section
- Statistics section
- Pricing cards
- Call-to-action section
- Footer with links

**Features:**
- Parallax scroll effects
- Animated counters
- Hover card effects
- Smooth section transitions

### 2. Login Page (`/login`)
- Email and password inputs
- Remember me checkbox
- Social login buttons (Google, Facebook)
- Responsive split layout
- Animated side illustration

### 3. Register Page (`/register`)
- Multi-step registration (2 steps)
- Personal information
- Company details
- Account type selection
- Progress indicator
- Form validation

### 4. Dashboard (`/dashboard`)
- Welcome section with stats cards
- Pie chart for contract status
- Bar chart for monthly trends
- Recent contracts table
- Quick action cards

**Stats Displayed:**
- Total contracts
- Active contracts
- Expiring soon
- Created this month

### 5. Contracts Page (`/contracts`)
- List and grid view toggle
- Search and filter functionality
- Sortable table
- Status badges
- Quick actions (view, edit, download, delete)
- Pagination

### 6. AI Generator (`/ai-generator`)
- Multi-step wizard (5 steps)
- Contract type selection
- Basic information form
- Clause selection
- Review and generate
- Success screen

**Features:**
- Progress indicator
- Form validation
- Loading animation during generation
- Smooth step transitions

### 7. Contract Editor (`/contracts/:id/edit`)
- Split-view editor
- Live preview panel
- Auto-save indicator
- Toolbar with actions (save, download, print)
- Word count display
- Version info

### 8. Templates Library (`/templates`)
- Category filter tabs
- Search functionality
- Template cards with ratings
- Free and premium badges
- Preview modal
- Download stats

### 9. Settings Page (`/settings`)
- Tabbed interface (6 sections)
- Profile settings
- Company settings
- Notification preferences
- Billing and subscription
- Security settings
- Theme preferences

---

## 🎭 Component Library

### Common Components

#### Button
Fully customizable button with variants and loading state.
```tsx
<Button variant="primary" size="lg" loading={false}>
  Click Me
</Button>
```

**Variants:** `primary`, `secondary`, `ghost`, `danger`  
**Sizes:** `sm`, `md`, `lg`

#### Card
Container component with optional hover effect.
```tsx
<Card hover>
  Content goes here
</Card>
```

#### Input
Form input with label, error state, and icon support.
```tsx
<Input
  label="Email"
  type="email"
  icon={<Mail />}
  error="Invalid email"
/>
```

#### Modal
Accessible modal dialog with animations.
```tsx
<Modal
  isOpen={true}
  onClose={() => {}}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

#### Badge
Status indicator badge.
```tsx
<Badge variant="success">Active</Badge>
```

**Variants:** `success`, `warning`, `danger`, `info`, `default`

---

## 🔧 Customization

### Updating Colors
Edit `tailwind.config.js` to change the color palette:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR',
      },
    },
  },
}
```

### Adding New Animations
Add to `tailwind.config.js`:

```js
animation: {
  'my-animation': 'myAnim 1s ease-in-out',
},
keyframes: {
  myAnim: {
    '0%': { /* start */ },
    '100%': { /* end */ },
  },
}
```

### Creating New Pages
1. Create a new file in `src/pages/`
2. Add route in `src/App.tsx`
3. Use `DashboardLayout` for authenticated pages

---

## 📱 Responsive Breakpoints

```css
mobile: 320px       /* Small phones */
mobile-lg: 425px    /* Large phones */
tablet: 768px       /* Tablets */
laptop: 1024px      /* Small laptops */
desktop: 1280px     /* Desktops */
desktop-xl: 1536px  /* Large screens */
```

---

## ♿ Accessibility

This prototype follows WCAG 2.1 Level AA guidelines:
- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ Color contrast ratios meet standards
- ✅ Focus indicators visible
- ✅ Semantic HTML structure
- ✅ Skip to main content link
- ✅ Form error messages associate with inputs

---

## 🎨 Design References

This prototype follows modern design principles inspired by:
- **Linear.app** - Minimalism and keyboard shortcuts
- **Notion.so** - Clean interface and hierarchy
- **Stripe.com** - Professional gradients and CTAs
- **Vercel.com** - Elegant hover effects
- **Framer.com** - Best-in-class animations

---

## 🚧 Future Enhancements

- [ ] Dark mode implementation
- [ ] Internationalization (i18n) for Bengali language
- [ ] Real-time collaboration features
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced search with filters
- [ ] Drag-and-drop file uploads
- [ ] Contract version comparison
- [ ] Email notifications integration
- [ ] Calendar view for renewals
- [ ] Export to multiple formats (PDF, DOCX, HTML)

---

## 🐛 Known Issues

Currently, there are no known issues. If you find any bugs, please document them.

---

## 📚 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.3.3 | Type Safety |
| Vite | 5.1.0 | Build Tool |
| Tailwind CSS | 3.4.1 | Styling |
| Framer Motion | 11.0.3 | Animations |
| React Router | 6.22.0 | Routing |
| Recharts | 2.12.0 | Charts |
| Lucide React | 0.344.0 | Icons |
| React Hot Toast | 2.4.1 | Notifications |
| Zustand | 4.5.0 | State Management |

---

## 📝 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 💡 Tips for Development

1. **Hot Reload**: Changes are reflected instantly in development mode
2. **Component Isolation**: Test components individually before integration
3. **TypeScript**: Use strict typing for better code quality
4. **Responsive Testing**: Test on multiple screen sizes
5. **Performance**: Use React DevTools Profiler to identify bottlenecks
6. **Accessibility**: Test with keyboard navigation and screen readers

---

## 📄 License

This is a development prototype for E-Chukti project.

---

## 👥 Contributing

This is a prototype project. For production implementation:
1. Connect to actual backend APIs
2. Implement proper authentication
3. Add comprehensive error handling
4. Include unit and integration tests
5. Set up CI/CD pipeline
6. Add analytics tracking
7. Implement SEO optimization

---

## 📞 Support

For questions or support regarding this prototype, refer to the main project documentation or contact the development team.

---

## 🎉 Acknowledgments

Built following Shneiderman's 8 Golden Rules of Interface Design and modern web development best practices. Special attention given to user experience, accessibility, and performance.

---

**Last Updated:** February 24, 2026  
**Version:** 1.0.0  
**Status:** ✅ Development Prototype Complete
