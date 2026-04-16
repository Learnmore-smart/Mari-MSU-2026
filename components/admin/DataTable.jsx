import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4 text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FinanceTable({ data }) {
  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value, row) => (
        <span className={row.type === 'income' ? 'text-green-600' : 'text-red-600'}>
          {row.type === 'income' ? '+' : '-'}{formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <span className={getStatusColor(value)}>{value}</span>,
    },
  ]

  return <DataTable columns={columns} data={data} />
}

export function ReimbursementTable({ data, onApprove, onReject }) {
  const columns = [
    {
      key: 'requester',
      label: 'Requester',
    },
    {
      key: 'club',
      label: 'Club',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <span className={getStatusColor(value)}>{value}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        row.status === 'Pending' ? (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="primary"
              onClick={(e) => { e.stopPropagation(); onApprove?.(row); }}
            >
              Approve
            </Button>
            <Button 
              size="sm" 
              variant="danger"
              onClick={(e) => { e.stopPropagation(); onReject?.(row); }}
            >
              Reject
            </Button>
          </div>
        ) : null
      ),
    },
  ]

  return <DataTable columns={columns} data={data} />
}
