import { InputHTMLAttributes, forwardRef, useState } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full px-4 py-3 rounded-lg border transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              icon && 'pl-10',
              error
                ? 'border-red-500 focus:ring-red-500'
                : isFocused
                ? 'border-primary-500'
                : 'border-neutral-300',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-fade-in">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
