import { useState } from 'react'
import { Calendar, Clock, Home, CheckCircle } from 'lucide-react'

export default function Customer() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  })

  // Only allow Sunday (0) to Thursday (4)
  const isAllowedDay = (dateString) => {
    if (!dateString) return false
    const day = new Date(dateString + 'T12:00:00').getDay()
    return day >= 0 && day <= 4 // Sunday = 0, Thursday = 4
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isAllowedDay(formData.date)) {
      alert('Please select a day between Sunday and Thursday.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Received!</h2>
          <p className="text-gray-600 mb-6">
            We’ve received your cleaning request for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
            We’ll confirm with you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Book Another Cleaning
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Returning Customer Booking
          </h1>
          <p className="text-gray-600">
            Welcome back! Select a day and time that works for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Service Address *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, ZIP"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Date * <span className="text-gray-500 font-normal">(Sunday – Thursday only)</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none"
                />
              </div>
              {formData.date && !isAllowedDay(formData.date) && (
                <p className="text-red-500 text-sm mt-1">Please choose a day between Sunday and Thursday.</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Time * <span className="text-gray-500 font-normal">(9:00 AM – 3:00 PM)</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none appearance-none"
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Special Notes / Requests</label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Anything we should know? (pets, focus areas, gate code, etc.)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blush-400 focus:border-blush-400 outline-none resize-none"
              />
            </div>

            <button type="submit" className="w-full btn-primary text-lg py-4">
              Request Cleaning
            </button>

            <p className="text-center text-sm text-gray-500">
              Available Sunday – Thursday • 9:00 AM – 3:00 PM
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
