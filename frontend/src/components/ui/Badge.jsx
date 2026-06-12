export default function Badge({ status }) {
  const styles = {
    PENDING:   { dot: 'bg-amber-400',   pill: 'bg-amber-50 border border-amber-200 text-amber-700' },
    CONFIRMED: { dot: 'bg-primary',     pill: 'bg-primary-subtle border border-primary/20 text-green-800' },
    CANCELLED: { dot: 'bg-red-400',     pill: 'bg-red-50 border border-red-200 text-red-700' },
  }
  const labels = { PENDING: 'Pendente', CONFIRMED: 'Confirmado', CANCELLED: 'Cancelado' }
  const s = styles[status] || styles.PENDING
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {labels[status] ?? status}
    </span>
  )
}
