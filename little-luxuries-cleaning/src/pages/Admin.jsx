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
  RefreshCw,
  Lock,
} from 'lucide-react'

const ADMIN_PASSWORD = 'luxuries2025' // Change this!

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (authenticated) {
      setBookings(loadBookings().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
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
    if (confirm('Cancel this booking? The customer will need to be notified.')) {
      const updated = cancelBooking(id)
      setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
  }

  const handleRescheduleNote = (id) => {
    const note = prompt('Add a reschedule note (e.g. “Moved to Oct 15 at 10 AM”):')
    if (note) {
      const updated = updateBooking(id, { rescheduleNote: note, status: 'rescheduled' })
      setBookings(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
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
          <p className="text-sm text-gray-500 mb-6">Enter the password to manage bookings.</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Bookings Dashboard</h1>
            <p className="text-sm text-gray-500">Manage customer appointments</p>
          </div>
          <div className="flex gap-2">
            {['all', 'confirmed', 'cancelled', 'rescheduled'].map((f) => (
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
          <div className="card p-12 text-center text-gray-500">
            No bookings yet. When customers book, they’ll appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div key={b.id} className="card p-5">
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
                      {b.notes && <p className="text-xs text-gray-400 italic">Notes: {b.notes}</p>}
                      {b.rescheduleNote && (
                        <p className="text-xs text-amber-600">Reschedule: {b.rescheduleNote}</p>
                      )}
                    </div>
                  </div>

                  {b.status === 'confirmed' && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleRescheduleNote(b.id)}
                        className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                        title="Mark as rescheduled"
                      >
                        <RefreshCw size={18} />
                      </button>
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                        title="Cancel booking"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
