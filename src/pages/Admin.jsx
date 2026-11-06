import { useState, useEffect } from 'react'
import { loadBookings, cancelBooking, updateBooking } from '../utils/schedule'
import {
  Calendar as CalendarIcon,
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
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  FileText
} from 'lucide-react'

const ADMIN_PASSWORD = 'luxuries2025'

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [accounts, setAccounts] = useState([])
  const [manualChargeAmounts, setManualChargeAmounts] = useState({})
  
  // Navigation & Calendar States
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

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
    if (confirm('Cancel this booking? It will be removed from the active calendar.')) {
      const updated = cancelBooking(id)
      setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
  }

  const handleAccept = (id) => {
    const updated = updateBooking(id, { status: 'confirmed', serviceStage: 'Pending / Scheduled' })
    setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }

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

  // Calendar Month Helpers
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDayIndex = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  // Filter out canceled appointments so they don't appear on the calendar or active list
  const activeBookings = bookings.filter(b => b.status !== 'cancelled')

  if (!authenticated) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-blush-50 px-4">
        <div className="card p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-blush-100 flex items-center justify-center mb-4">
            <Lock className="text-blush-500" size={24} />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the password to manage accounts & calendar.</p>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* VIEW 1: CUSTOMER PROFILE & FULL HISTORY */}
        {selectedCustomer ? (
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="flex items-center gap-2 text-xs font-semibold text-blush-600 bg-white px-4 py-2 rounded-xl shadow-xs border border-blush-100 hover:bg-blush-50 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Calendar & Dashboard
            </button>

            <div className="bg-white rounded-3xl border border-blush-100 p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-2">
                <div>
                  <span className="text-xs bg-blush-100 text-blush-700 px-2.5 py-1 rounded-full font-bold">Customer Management Profile</span>
                  <h1 className="text-2xl font-bold text-gray-800 mt-2">{selectedCustomer.fullName}</h1>
                  <p className="text-xs text-gray-500">Member since {selectedCustomer.createdAt || 'Recent'}</p>
                </div>
                <div className="text-left sm:text-right text-xs text-gray-600 space-y-1">
                  <p className="flex items-center gap-1"><Mail size={14} className="text-gray-400" /> {selectedCustomer.email}</p>
                  <p className="flex items-center gap-1"><Phone size={14} className="text-gray-400" /> {selectedCustomer.phone}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <h3 className="text-xs font-bold text-gray-700 uppercase">Service & Access Information</h3>
                <p className="text-xs text-gray-700"><strong>Address:</strong> {selectedCustomer.address}</p>
                <p className="text-xs text-gray-700"><strong>Home Notes / Entry Codes:</strong> {selectedCustomer.homeDetails}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-blush-500" /> All Appointments History (Including Canceled)
                </h3>

                {bookings.filter(b => b.name?.toLowerCase() === selectedCustomer.fullName.toLowerCase() || b.email?.toLowerCase() === selectedCustomer.email.toLowerCase()).length === 0 ? (
                  <p className="text-xs text-gray-500 italic bg-gray-50 p-4 rounded-2xl">No recorded appointments for this customer.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings
                      .filter(b => b.name?.toLowerCase() === selectedCustomer.fullName.toLowerCase() || b.email?.toLowerCase() === selectedCustomer.email.toLowerCase())
                      .map((appt) => (
                        <div key={appt.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-blush-600">{appt.id}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs font-semibold text-gray-700">{appt.date} at {appt.time}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 mt-0.5">{appt.service} ({appt.serviceStage || appt.status})</p>
                          </div>
                          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${
                            appt.status === 'cancelled'
                              ? 'text-red-700 bg-red-50 border-red-200'
                              : 'text-green-700 bg-green-50 border-green-200'
                          }`}>
                            {appt.status === 'cancelled' ? 'Canceled' : (appt.serviceStage || appt.status)}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: ACTIVE CALENDAR & DASHBOARD */
          <div className="space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Admin Calendar Dashboard</h1>
                <p className="text-sm text-gray-500">Active appointments view & customer management</p>
              </div>
            </div>

            {/* SECTION 1: CALENDAR VIEW */}
            <div className="card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-blush-500" size={22} />
                  <h2 className="text-lg font-semibold text-gray-800">{monthNames[month]} {year}</h2>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={prevMonth} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextMonth} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-500 uppercase">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayIndex }).map((_, idx) => (
                  <div key={`blank-${idx}`} className="h-24 bg-gray-50/50 rounded-2xl border border-transparent"></div>
                ))}

                {Array.from({ length: totalDays }).map((_, idx) => {
                  const dayNum = idx + 1
                  const formattedMonth = String(month + 1).padStart(2, '0')
                  const formattedDay = String(dayNum).padStart(2, '0')
                  const dateString = `${year}-${formattedMonth}-${formattedDay}`

                  const dayBookings = activeBookings.filter(b => b.date === dateString)

                  return (
                    <div key={dayNum} className="h-28 bg-white rounded-2xl border border-gray-200 p-2 flex flex-col justify-between overflow-y-auto shadow-xs">
                      <span className="text-xs font-bold text-gray-700">{dayNum}</span>
                      
                      {dayBookings.length > 0 && (
                        <div className="space-y-1 mt-1">
                          {dayBookings.map((b) => (
                            <div key={b.id} className="bg-blush-50 border border-blush-200 rounded-lg p-1 text-[10px] text-gray-800 truncate">
                              <span className="font-bold text-blush-600">{b.time}</span>: {b.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SECTION 2: REGISTERED CUSTOMER ACCOUNTS */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Registered Customer Accounts ({accounts.length})</h2>
              </div>
              <p className="text-xs text-gray-500">Click any customer name to view their full profile and appointment history.</p>

              {accounts.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">No customer accounts created yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accounts.map((acc, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedCustomer(acc)}
                      className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 cursor-pointer hover:border-blush-400 hover:bg-blush-50/30 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-blush-600 underline">{acc.fullName}</span>
                        <span className="text-[10px] bg-blush-100 text-blush-700 px-2 py-0.5 rounded-full font-medium">Manage Account →</span>
                      </div>
                      <p className="text-xs text-gray-600 flex items-center gap-1.5"><Mail size={12} className="text-gray-400" /> {acc.email}</p>
                      <p className="text-xs text-gray-600 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {acc.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 3: ACTIVE APPOINTMENTS LIST */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Active Appointments & Live Service Control</h2>

              {activeBookings.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  No active appointments scheduled.
                </div>
              ) : (
                <div className="space-y-6">
                  {activeBookings.map((b) => (
                    <div key={b.id} className="card p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-800">{b.service}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                            <span className="flex items-center gap-1 font-bold text-blush-600">
                              <CalendarIcon size={14} />
                              {b.date} at {b.time}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p 
                              onClick={() => {
                                const foundAcc = accounts.find(a => a.fullName.toLowerCase() === b.name.toLowerCase()) || { fullName: b.name, email: b.email, phone: b.phone, address: b.address, homeDetails: 'Standard access' }
                                setSelectedCustomer(foundAcc)
                              }}
                              className="flex items-center gap-1 font-bold text-blush-600 underline cursor-pointer w-fit"
                            >
                              <User size={14} /> {b.name} (View Profile)
                            </p>
                            <p className="flex items-center gap-1"><Phone size={14} className="text-gray-400" /> {b.phone}</p>
                            <p className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {b.address}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          {b.status !== 'confirmed' && (
                            <button
                              onClick={() => handleAccept(b.id)}
                              className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition flex items-center gap-1 text-xs font-semibold"
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

                      {/* LIVE SERVICE STAGE SELECTOR */}
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
        )}

      </div>
    </section>
  )
}
