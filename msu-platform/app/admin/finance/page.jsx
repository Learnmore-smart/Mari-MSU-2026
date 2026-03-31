import AdminLayout from '@/components/admin/AdminLayout'
import { getAllFinanceRecords, getAllReimbursements, getAllBudgetRequests, getAdminStats } from '@/lib/data'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { KPICard } from '@/components/admin/KPICard'
import { DollarSign, TrendingUp, Clock, CreditCard } from 'lucide-react'

export const metadata = {
  title: 'Finance - MSU Admin',
}

export default function AdminFinancePage() {
  const stats = getAdminStats()
  const financeRecords = getAllFinanceRecords()
  const reimbursements = getAllReimbursements()
  const budgetRequests = getAllBudgetRequests()

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
        <p className="text-gray-600">Track income, expenses, reimbursements, and budget requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Income"
          value={formatCurrency(stats.totalIncome)}
          icon={TrendingUp}
        />
        <KPICard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          icon={DollarSign}
        />
        <KPICard
          title="Balance"
          value={formatCurrency(stats.balance)}
          icon={CreditCard}
        />
        <KPICard
          title="Pending Reimbursements"
          value={formatCurrency(stats.pendingReimbursements)}
          icon={Clock}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {financeRecords.map((record) => (
              <div key={record.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{record.description}</p>
                  <p className="text-sm text-gray-500">{record.category} • {formatDate(record.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.type === 'income' ? '+' : '-'}{formatCurrency(record.amount)}
                  </p>
                  <span className={getStatusColor(record.status)}>{record.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Pending Reimbursements</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {reimbursements.map((reimb) => (
              <div key={reimb.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{reimb.description}</p>
                  <p className="text-sm text-gray-500">{reimb.requester} • {reimb.club}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(reimb.amount)}</p>
                  <span className={getStatusColor(reimb.status)}>{reimb.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Budget Requests</h2>
          <Button size="sm">New Request</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.club}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {request.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(request.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(request.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusColor(request.status)}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {request.status === 'Pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="primary">Approve</Button>
                        <Button size="sm" variant="danger">Reject</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
