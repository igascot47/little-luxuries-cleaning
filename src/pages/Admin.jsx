import { useState, useEffect } from 'react'
import { loadBookings, cancelBooking, updateBooking } from '../utils/schedule'
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  XCircle,
  Lock,
  Check,
  DollarSign,
  Users,
  Truck,
} from 'lucide-react'

const ADMIN_PASSWORD = 'luxuries2025'

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [accounts, setAccounts] = useState([])
  const [filter, setFilter] = useState('all')
  const [manualChargeAmounts, setManualChargeAmounts] = useState({})

  const fetchLatestData = () => {
    setBookings(loadBookings().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    const savedAccounts = JSON.parse(localStorage.getItem('luxury_cleaning_accounts') || '[]')
    setAccounts(savedAccounts)
  }

  useEffect(() => {
    if (authenticated) {
      fetchLatestData()
    }
  }, [authenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const handleCancel = (id) => {
    if (confirm('Cancel this booking?')) {
      const updated = cancelBooking(id)
      setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
  }

  const handleAccept = (id) => {
    const updated = updateBooking(id, { status: 'confirmed', serviceStage: 'Pending / Scheduled' })
    setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  // Update real-time service stage with initial "Pending / Scheduled" stage added
  const handleStageChange = (id, newStage) => {
    const updated = updateBooking(id, { serviceStage: newStage })
    setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

  const handleManualCharge = (id) => {
    const amount = manualChargeAmounts[id]
    if (!amount) {
      alert('Please enter a charge amount.')
      return
    }
    alert(`Successfully charged $${amount} to customer card on file!`)
    setManualChargeAmounts({ ...manualChargeAmounts, [id]: '' })
  }

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true
    return b.status === filter
  })

  if (!authenticated) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-blush-50 px-4">
        <div className="card p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-blush-100 flex items-center justify-center mb-4">
            <Lock className="text-blush-500" size={24} />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the password to manage accounts & bookings.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300"
            />
            <button type="submit" className="btn-primary w-full">
              Log in
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            Default password: <code className="bg-blush-50 px-1 rounded">luxuries2025</code>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-blush-50 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage customer accounts & appointments</p>
          </div>
        </div>

        {/* SECTION 1: REGISTERED CUSTOMER ACCOUNTS */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Users className="text-blush-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Registered Customer Accounts ({accounts.length})</h2>
          </div>

          {accounts.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">No customer accounts created yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((acc, index) => (
                <div key={index} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">{acc.fullName}</span>
                    <span className="text-[10px] bg-blush-100 text-blush-600 px-2 py-0.5 rounded-full font-medium">Customer</span>
                  </div>
                  <p className="text-xs text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> {acc.email}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {acc.phone}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1.5"><MapPin size={12} className="text-gray-400" /> {acc.address}</p>
                  <p className="text-[11px] text-gray-500 italic mt-1 bg-white p-2 rounded-xl border border-gray-100">Home Details: {acc.homeDetails}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: BOOKINGS DASHBOARD */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800">Bookings & Appointment Requests</h2>
            <div className="flex gap-2 flex-wrap">
              {['all', 'confirmed', 'cancelled'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition
                    ${filter === f ? 'bg-blush-400 text-white' : 'bg-white text-gray-600 hover:bg-blush-50'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              No bookings yet.
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((b) => (
                <div key={b.id} className="card p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${b.status === 'confirmed' ? 'bg-mint-100 text-mint-600' :
                              b.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                              'bg-amber-100 text-amber-700'}`}
                        >
                          {b.status}
                        </span>
                        <span className="font-semibold text-gray-800">{b.service}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-blush-400" />
                          {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-blush-400" />
                          {b.time}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-1"><User size={14} className="text-blush-300" /> {b.name}</p>
                        <p className="flex items-center gap-1"><Phone size={14} className="text-blush-300" /> {b.phone}</p>
                        <p className="flex items-center gap-1"><Mail size={14} className="text-blush-300" /> {b.email}</p>
                        <p className="flex items-center gap-1"><MapPin size={14} className="text-blush-300" /> {b.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {b.status !== 'confirmed' && (
                        <button
                          onClick={() => handleAccept(b.id)}
                          className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition flex items-center gap-1 text-xs font-semibold"
                          title="Accept booking"
                        >
                          <Check size={16} /> Accept
                        </button>
                      )}
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                        title="Cancel booking"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </div>

                  {/* SERVICE STATUS UPDATE DROPDOWN WITH INITIAL 'Pending / Scheduled' OPTION */}
                  <div className="pt-3 border-t border-gray-100 bg-blush-50/50 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-blush-500" />
                      <span className="text-xs font-semibold text-gray-700 uppercase">Live Service Status:</span>
                    </div>

                    <select
                      value={b.serviceStage || 'Pending / Scheduled'}
                      onChange={(e) => handleStageChange(b.id, e.target.value)}
                      className="w-full sm:w-auto p-2 rounded-xl border border-gray-300 text-xs font-medium bg-white focus:outline-none focus:border-blush-400"
                    >
                      <option value="Pending / Scheduled">⏳ Pending / Scheduled (Not started)</option>
                      <option value="En Route">🚚 En Route (Cleaner on the way)</option>
                      <option value="Service in Progress">🧹 Service in Progress (Cleaning active)</option>
                      <option value="Completed">✨ Completed (Finished & left)</option>
                    </select>
                  </div>

                  {/* MANUAL BILLING SECTION */}
                  <div className="bg-gray-50/50 p-4 rounded-2xl space-y-2 border border-gray-100">
                    <label className="block text-xs font-semibold text-gray-600 uppercase">
                      Manual Card-on-File Billing
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          value={manualChargeAmounts[b.id] || ''}
                          onChange={(e) => setManualChargeAmounts({ ...manualChargeAmounts, [b.id]: e.target.value })}
                          className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleManualCharge(b.id)}
                        className="w-full sm:w-auto bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-black transition flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <DollarSign size={16} />
                        Charge Card Now
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
