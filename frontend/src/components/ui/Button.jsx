export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-[3px]'
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  }
  const variants = {
    primary:   'bg-primary hover:bg-primary-dark text-white focus:ring-primary/[.18]',
    secondary: 'bg-white border border-card-border text-ink hover:bg-canvas focus:ring-ink/[.08]',
    danger:    'bg-[#b03a2e] hover:bg-[#9a2f24] text-white focus:ring-red-500/[.18]',
    ghost:     'text-ink-light hover:bg-canvas hover:text-ink focus:ring-ink/[.08]',
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
