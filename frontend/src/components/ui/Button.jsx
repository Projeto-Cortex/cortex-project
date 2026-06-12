export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  }
  const variants = {
    primary:   'bg-primary hover:bg-primary-dark text-white shadow-sm',
    secondary: 'bg-white border border-card-border text-ink hover:bg-canvas shadow-sm',
    danger:    'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    ghost:     'text-ink-light hover:bg-canvas hover:text-ink',
  }
  return (
    <button
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
