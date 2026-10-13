import { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'
import {
  getUpcomingWorkingDays,
  getAvailableSlots,
  getBookedIsos,
  saveBooking,
} from '../utils/schedule'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

const SERVICES = [
  'Regular Cleaning',
  'Deep Clean',
  'Move-Out Clean',
  'Window Cleaning',
  'Brand New Building',
  'Office Cleaning',
]

export default function BookingCalendar() {
  const [workingDays, setWorkingDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: SERVICES[0],
    notes: '',
  })
  const [bookedIsos, setBookedIsos] = useState([])
  const [weekOffset, setWeekOffset] = useState(0)

  useEffect(() => {
    const days = getUpcomingWorkingDays(35)
    setWorkingDays(days)
    setBookedIsos(getBookedIsos())
  }, [])

  useEffect(() => {
    if (selectedDate) {
      setSlots(getAvailableSlots(selectedDate, bookedIsos))
      setSelectedSlot(null)
    }
  }, [selectedDate, bookedIsos])

  const visibleDays = workingDays.slice(weekOffset * 7, weekOffset * 7 + 14)

  const handleSelectDate = (day) => {
    setSelectedDate(day)
    setStep(2)
  }

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot)
    setStep(3)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setStep(4)
  }

  const handlePayment = () => {
    const booking = {
      ...form,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedSlot.label,
      slotIso: selectedSlot.iso,
      createdAt: new Date().toISOString(),
    }
    saveBooking(booking)
    setBookedIsos(getBookedIsos())
    setStep(5)
  }

  const reset = () => {
    setSelectedDate(null)
    setSelectedSlot(null)
    setStep(1)
    setForm({ name: '', email: '', phone: '', address: '', service: SERVICES[0], notes: '' })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${step >= s ? 'bg-blush-400 text-white' : 'bg-blush-100 text-blush-300'}`}
            >
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            {s < 4 && (
              <div className={`w-8 h-0.5 ${step > s ? 'bg-blush-400' : 'bg-blush-100'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="card p-6 md:p-8 animate-fade-in">
          <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <CalendarIcon className="text-blush-400" size={22} />
            Choose a day
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            We work Sunday–Wednesday one week, then Thursday the following week. Hours 8 AM – 3 PM.
          </p>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
              disabled={weekOffset === 0}
              className="p-2 rounded-full hover:bg-blush-50 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-600">Available days</span>
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-2 rounded-full hover:bg-blush-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {visibleDays.map((day) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleSelectDate(day)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all duration-200
                    ${isSelected
                      ? 'border-blush-400 bg-blush-50 shadow-md'
                      : 'border-blush-100 hover:border-blush-300 hover:bg-blush-50/50'
                    }`}
                >
                  <p className="text-xs text-blush-400 font-medium uppercase tracking-wide">
                    {format(day, 'EEE')}
                  </p>
                  <p className="text-2xl font-semibold text-gray-800">{format(day, 'd')}</p>
                  <p className="text-xs text-gray-500">{format(day, 'MMM yyyy')}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 2 && selectedDate && (
        <div className="card p-6 md:p-8 animate-fade-in">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-blush-500 hover:underline mb-4 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Change date
          </button>
          <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <Clock className="text-blush-400" size={22} />
            Pick a time
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')} · 8 AM – 3 PM
          </p>

          {slots.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No remaining slots on this day. Please choose another date.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.iso}
                  onClick={() => handleSelectSlot(slot)}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all
                    ${selectedSlot?.iso === slot.iso
                      ? 'border-blush-400 bg-blush-50 text-blush-600'
                      : 'border-blush-100 hover:border-blush-300 text-gray-700'
                    }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="card p-6 md:p-8 animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="text-sm text-blush-500 hover:underline mb-4 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Change time
          </button>
          <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <User className="text-blush-400" size={22} />
            Your details
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {format(selectedDate, 'EEE, MMM d')} at {selectedSlot.label}
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Service</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
              >
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Full name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-300" />
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-300" />
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-300" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Service address</label>
              <div className="relative">
                <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-300" />
                <input
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
                  placeholder="123 Main St, City"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50 resize-none"
                placeholder="Gate code, pets, special requests…"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="card p-6 md:p-8 animate-fade-in">
          <button
            onClick={() => setStep(3)}
            className="text-sm text-blush-500 hover:underline mb-4 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Edit details
          </button>
          <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <CreditCard className="text-blush-400" size={22} />
            Payment
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Secure payment powered by Stripe (demo mode for now).
          </p>

          <div className="bg-blush-50 rounded-2xl p-5 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{form.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium">
                {format(selectedDate, 'MMM d')} · {selectedSlot.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Address</span>
              <span className="font-medium text-right max-w-[60%]">{form.address}</span>
            </div>
            <div className="border-t border-blush-200 pt-2 flex justify-between text-base">
              <span className="font-medium">Total (demo)</span>
              <span className="font-semibold text-blush-500">$0.00</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4 text-center">
            In production this connects to Stripe Checkout. For the demo, click below to confirm.
          </p>
          <button onClick={handlePayment} className="btn-primary w-full">
            <Sparkles size={18} />
            Confirm Booking (Demo)
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="card p-8 text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-mint-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="text-mint-500" size={40} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">You’re all set!</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            We’ve reserved <strong>{format(selectedDate, 'EEEE, MMM d')}</strong> at{' '}
            <strong>{selectedSlot.label}</strong> for your {form.service.toLowerCase()}.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation will appear in your email (demo). You can cancel or reschedule from
            the confirmation link or by contacting us.
          </p>
          <button onClick={reset} className="btn-secondary">
            Book another cleaning
          </button>
        </div>
      )}
    </div>
  )
}
