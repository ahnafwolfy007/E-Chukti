# 🎨 Component Showcase

This document showcases all the reusable components built for the E-Chukti frontend prototype.

---

## 🔘 Button Component

### Location
`src/components/common/Button.tsx`

### Variants
```tsx
// Primary (default)
<Button variant="primary">Primary Button</Button>

// Secondary
<Button variant="secondary">Secondary Button</Button>

// Ghost (transparent)
<Button variant="ghost">Ghost Button</Button>

// Danger (red)
<Button variant="danger">Danger Button</Button>
```

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Icon & Loading
```tsx
<Button icon={<Plus />}>With Icon</Button>
<Button loading={true}>Loading...</Button>
```

### Features
- ✅ Hover scale effect (1.02)
- ✅ Click scale effect (0.98)
- ✅ Disabled state
- ✅ Loading spinner
- ✅ Icon support

---

## 🎴 Card Component

### Location
`src/components/common/Card.tsx`

### Usage
```tsx
// Basic card
<Card>Content here</Card>

// With hover effect
<Card hover>Hover to lift</Card>

// As clickable button
<Card hover onClick={() => {}}>Clickable</Card>
```

### Features
- ✅ Hover lift effect (-8px translateY)
- ✅ Shadow elevation on hover
- ✅ Optional click handler
- ✅ Smooth transitions

---

## 📝 Input Component

### Location
`src/components/common/Input.tsx`

### Usage
```tsx
// Basic input
<Input label="Email" type="email" />

// With icon
<Input 
  label="Search" 
  icon={<Search />} 
  placeholder="Search..."
/>

// With error
<Input 
  label="Password" 
  type="password"
  error="Password is required"
/>
```

### Features
- ✅ Floating label
- ✅ Icon support (left side)
- ✅ Error state with red border
- ✅ Focus ring animation
- ✅ Full TypeScript support

---

## 🪟 Modal Component

### Location
`src/components/common/Modal.tsx`

### Usage
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  <p>Modal content goes here</p>
</Modal>
```

### Sizes
- `sm` - 448px max width
- `md` - 512px max width
- `lg` - 768px max width
- `xl` - 1024px max width

### Features
- ✅ Backdrop blur effect
- ✅ Scale + fade animation
- ✅ ESC key to close
- ✅ Click outside to close
- ✅ Focus trap (accessibility)
- ✅ Scrollable content
- ✅ Optional header and footer

---

## 🏷️ Badge Component

### Location
`src/components/common/Badge.tsx`

### Variants
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Expired</Badge>
<Badge variant="info">Draft</Badge>
<Badge variant="default">Unknown</Badge>
```

### Sizes
```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Features
- ✅ Color-coded variants
- ✅ Scale-in animation
- ✅ Rounded pill shape
- ✅ Flexible sizing

---

## 🧭 Navbar Component

### Location
`src/components/layout/Navbar.tsx`

### Variants
```tsx
// Transparent (for landing page)
<Navbar variant="transparent" />

// Solid (default)
<Navbar variant="solid" />
```

### Features
- ✅ Transparent → Solid on scroll
- ✅ Blur background effect
- ✅ Mobile hamburger menu
- ✅ Slide-in animation
- ✅ Logo with gradient background
- ✅ CTA buttons in navbar

---

## 📱 Sidebar Component

### Location
`src/components/layout/Sidebar.tsx`

### Usage
```tsx
<Sidebar isOpen={true} onClose={() => {}} />
```

### Features
- ✅ Active route indicator
- ✅ Animated indicator slide
- ✅ Hover effect (4px slide-right)
- ✅ Collapsible on mobile
- ✅ Overlay backdrop
- ✅ Logout button at bottom
- ✅ Icons from Lucide React

### Navigation Items
- Dashboard
- My Contracts
- Templates
- AI Generator
- Renewals
- Settings

---

## 📄 Footer Component

### Location
`src/components/layout/Footer.tsx`

### Sections
- **Brand** - Logo and description
- **Product** - Features, pricing, templates
- **Company** - About, contact, careers
- **Legal** - Privacy, terms, cookies
- **Social Links** - Twitter, GitHub, LinkedIn, Email

### Features
- ✅ 4-column grid (responsive)
- ✅ Social media icons
- ✅ Hover effects on links
- ✅ Dark background
- ✅ Bottom copyright bar

---

## 📊 DashboardLayout Component

### Location
`src/components/layout/DashboardLayout.tsx`

### Usage
```tsx
import DashboardLayout from '../components/layout/DashboardLayout'

export default function MyPage() {
  return (
    <DashboardLayout>
      <h1>Page Content</h1>
    </DashboardLayout>
  )
}
```

### Features
- ✅ Fixed sidebar navigation
- ✅ Top bar with search
- ✅ Notifications bell (with badge)
- ✅ User profile dropdown
- ✅ Mobile hamburger menu
- ✅ Scrollable main content area

### Layout Structure
```
┌─────────────────────────────────┐
│         Top Bar               │
├──────┬──────────────────────────┤
│      │                         │
│ Side │   Main Content          │
│ bar  │   (scrollable)          │
│      │                         │
└──────┴──────────────────────────┘
```

---

## 🎨 Design Tokens

### Colors (from Tailwind config)
```css
Primary: #2563EB
Success: #10B981
Warning: #F59E0B
Danger: #EF4444
Neutral-50: #F9FAFB
Neutral-900: #111827
```

### Spacing Scale
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
```

### Typography
```
Font Family: Inter (body), Poppins (headings)
Sizes: xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px), 4xl(36px), 5xl(48px), 6xl(60px)
Weights: 300, 400, 500, 600, 700, 800
```

### Shadows
```css
smooth: 0 2px 15px rgba(0,0,0,0.07)
smooth-lg: 0 10px 25px rgba(0,0,0,0.1)
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
2xl: 24px
full: 9999px (circular)
```

---

## ⚡ Animation Classes

### Pre-built Animations
```css
animate-fade-in      /* Fade in from 0 to 1 opacity */
animate-fade-up      /* Fade + slide up 20px */
animate-slide-in     /* Slide from left */
animate-scale-in     /* Scale + fade from 0.9 */
animate-bounce-soft  /* Gentle bounce */
animate-pulse-slow   /* Slow pulse (3s) */
animate-float        /* Floating up/down */
```

### Usage
```tsx
<div className="animate-fade-up">
  Content appears with fade and slide up
</div>
```

---

## 🔧 Utility Classes

### Glass Morphism
```tsx
<div className="glass">
  Frosted glass effect
</div>
```

### Gradient Text
```tsx
<h1 className="gradient-text">
  Gradient colored text
</h1>
```

### Custom Scrollbar
Applied globally, styled in `index.css`

---

## 📱 Responsive Utilities

### Breakpoints
```tsx
// Mobile first
<div className="md:grid-cols-2 lg:grid-cols-3">
  // 1 column mobile, 2 tablet, 3 desktop
</div>
```

### Visibility
```tsx
// Hidden on mobile, visible on desktop
<div className="hidden md:block">Desktop only</div>

// Visible on mobile, hidden on desktop
<div className="md:hidden">Mobile only</div>
```

---

## 🎯 Best Practices

### Component Usage
1. **Import from common folder**
   ```tsx
   import Button from '@/components/common/Button'
   ```

2. **Use TypeScript props**
   ```tsx
   interface MyComponentProps {
     title: string
     onClick?: () => void
   }
   ```

3. **Follow naming conventions**
   - PascalCase for components
   - camelCase for functions/variables
   - UPPER_CASE for constants

4. **Use motion components for animations**
   ```tsx
   import { motion } from 'framer-motion'
   
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
   >
     Animated content
   </motion.div>
   ```

---

## 🎨 Example Combinations

### Form with Validation
```tsx
<div className="space-y-6">
  <Input
    label="Email"
    type="email"
    icon={<Mail />}
    error={errors.email}
  />
  <Input
    label="Password"
    type="password"
    icon={<Lock />}
    error={errors.password}
  />
  <Button 
    variant="primary" 
    className="w-full"
    loading={isSubmitting}
  >
    Sign In
  </Button>
</div>
```

### Card with Action
```tsx
<Card hover>
  <div className="flex items-center gap-4">
    <div className="bg-primary-100 p-3 rounded-lg">
      <FileText className="w-6 h-6 text-primary-600" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">Contract Title</h3>
      <p className="text-sm text-neutral-600">Description</p>
    </div>
    <Badge variant="success">Active</Badge>
  </div>
  <div className="mt-4 flex gap-2">
    <Button size="sm" variant="ghost">View</Button>
    <Button size="sm" variant="primary">Edit</Button>
  </div>
</Card>
```

### Modal Confirmation
```tsx
<Modal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="ghost" onClick={() => setShowConfirm(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this contract?</p>
</Modal>
```

---

## 🎉 Summary

All components are:
- ✅ Fully typed with TypeScript
- ✅ Responsive and mobile-friendly
- ✅ Accessible (ARIA labels, keyboard nav)
- ✅ Animated with Framer Motion
- ✅ Styled with Tailwind CSS
- ✅ Reusable and composable
- ✅ Well-documented

Use them throughout your application for consistency and efficiency!

---

**Last Updated**: February 24, 2026  
**Components**: 10+  
**Status**: ✅ Production Ready
