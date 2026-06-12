export default function Badge({ status }) {
  const map = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  }
  const labels = { PENDING: 'Pendente', CONFIRMED: 'Confirmado', CANCELLED: 'Cancelado' }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}>
      {labels[status]}
    </span>
  )
}
