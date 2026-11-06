import { useState, useEffect } from 'react'
import { User, Home, CreditCard, Clock, CheckCircle2, MapPin, Lock, ShieldCheck, Calendar, History, Truck } from 'lucide-react'
import { saveBooking, loadBookings } from '../utils/schedule'

export default function Customer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  // Auth Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Profile State
  const [profile, setProfile] = useState({
    fullName: 'Jane Doe',
    phone: '(555) 019-2834',
    address: '742 Evergreen Terrace, Suite 4B',
    homeDetails: '3 Beds, 2 Baths, 1,800 sq ft. Pet inside (small friendly dog). Keypad code: 4921.',
  })

  // Past Cleanings & Schedule History
  const [cleaningsHistory, setCleaningsHistory] = useState([])
  const [bookedSubmitted, setBookedSubmitted] = useState(false)

  const [bookingData, setBookingData] = useState({
    date: '',
    time: '9:00 AM',
    notes: ''
  })

  // Sync schedule bookings from utility
  useEffect(() => {
    const currentBookings = loadBookings()
    setCleaningsHistory(currentBookings)
  }, [bookedSubmitted])

  // Get active stage from latest booking
  const latestBooking = cleaningsHistory[0]
  const currentStage = latestBooking?.serviceStage || 'En Route'

  // Only allow Sunday (0) to Thursday (4)
  const isAllowedDay = (dateString) => {
    if (!dateString) return false
    const day = new Date(dateString + 'T12:00:00').getDay()
    return day >= 0 && day <= 4
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    
    const existingAccounts = JSON.parse(localStorage.getItem('luxury_cleaning_accounts') || '[]')
    const accountExists = existingAccounts.some(acc => acc.email === email)
    
    if (!accountExists) {
      const newAccount = {
        email,
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        homeDetails: profile.homeDetails,
        createdAt: new Date().toLocaleDateString()
      }
      localStorage.setItem('luxury_cleaning_accounts', JSON.stringify([...existingAccounts, newAccount]))
    }

    setIsLoggedIn(true)
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    const existingAccounts = JSON.parse(localStorage.getItem('luxury_cleaning_accounts') || '[]')
    const updatedAccounts = existingAccounts.map(acc => 
      acc.email === email ? { ...acc, fullName: profile.fullName, phone: profile.phone, address: profile.address, homeDetails: profile.homeDetails } : acc
    )
    localStorage.setItem('luxury_cleaning_accounts', JSON.stringify(updatedAccounts))
    alert('Personal information and home details saved!')
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!isAllowedDay(bookingData.date)) {
      alert('Please select a day between Sunday and Thursday.')
      return
    }

    saveBooking({
      name: profile.fullName,
      phone: profile.phone,
      email: email || 'customer@example.com',
      address: profile.address,
      date: bookingData.date,
      time: bookingData.time,
      notes: bookingData.notes,
      service: 'Returning Customer Clean',
      status: 'confirmed',
      serviceStage: 'En Route'
    })

    setBookedSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 via-softpink/20 to-mint-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {!isLoggedIn ? (
          /* ================= LOGIN / SIGN UP FORM ================= */
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-blush-100 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {authMode === 'login' 
                  ? 'Sign in with your email to access your customer portal' 
                  : 'Register using your email to save home info'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blush-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Password *</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blush-500 text-sm"
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3 font-medium text-sm">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              {authMode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('signup')} className="text-blush-500 font-semibold underline">
                    Sign up with email
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-blush-500 font-semibold underline">
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          /* ================= LOGGED IN CUSTOMER PORTAL ================= */
          <div className="space-y-8">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-3xl border border-blush-100 shadow-sm gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Hello, {profile.fullName}!</h1>
                <p className="text-sm text-gray-500">Welcome to your Customer Portal. Manage profile, track services, and request cleans.</p>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-xs font-medium text-gray-500 hover:text-red-500 underline"
              >
                Sign Out
              </button>
            </div>

            {/* LIVE SERVICE STATUS NOTIFICATIONS */}
            <div className="bg-white rounded-3xl border border-blush-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Live Service Status & Notifications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border transition-all ${currentStage === 'En Route' ? 'bg-mint-50 border-mint-400 shadow-xs' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                  <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-gray-800">
                    <Truck size={16} className="text-mint-600" />
                    <span>1. En Route</span>
                  </div>
                  <p className="text-xs text-gray-500">Cleaner is on the way to your property.</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${currentStage === 'Service in Progress' ? 'bg-blush-50 border-blush-400 shadow-xs' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                  <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-gray-800">
                    <Clock size={16} className="text-blush-600 animate-spin" />
                    <span>2. Service in Progress</span>
                  </div>
                  <p className="text-xs text-gray-500">Your space is actively being cleaned.</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${currentStage === 'Completed' ? 'bg-green-50 border-green-400 shadow-xs' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                  <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-gray-800">
                    <CheckCircle2 size={16} className="text-green-600" />
                    <span>3. Completed</span>
                  </div>
                  <p className="text-xs text-gray-500">Service complete! Final balance processed.</p>
                </div>
              </div>
            </div>

            {/* PAST CLEANINGS & REQUEST HISTORY */}
            <div className="bg-white rounded-3xl border border-blush-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <History className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Cleaning Requests & Service History</h2>
              </div>

              {cleaningsHistory.length === 0 ? (
                <p className="text-xs text-gray-500 py-2">No cleaning requests found yet.</p>
              ) : (
                <div className="space-y-3">
                  {cleaningsHistory.map((item, idx) => (
                    <div key={item.id || idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blush-600">{item.id || `CLN-00${idx + 1}`}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs font-semibold text-gray-700">{item.date}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-0.5">{item.service || 'House Cleaning'}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border capitalize ${
                          item.status === 'confirmed' || item.status === 'Completed'
                            ? 'text-green-700 bg-green-50 border-green-200'
                            : item.status === 'cancelled'
                            ? 'text-red-700 bg-red-50 border-red-200'
                            : 'text-amber-700 bg-amber-50 border-amber-200'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* REQUEST NEW CLEANING FORM */}
            <div className="bg-white rounded-3xl border border-blush-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Request a New Cleaning</h2>
              </div>

              {bookedSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Request Sent to Admin!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Requested for {bookingData.date} at {bookingData.time}.
                  </p>
                  <button onClick={() => setBookedSubmitted(false)} className="btn-primary text-sm py-2 px-4">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Select Date * <span className="font-normal lowercase">(Sun – Thu only)</span>
                      </label>
                      <input 
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blush-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Select Time * <span className="font-normal lowercase">(9 AM – 3 PM)</span>
                      </label>
                      <select 
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full p-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-blush-400"
                      >
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Special Notes / Access Info</label>
                    <textarea 
                      rows={2}
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      placeholder="Any specific instructions for this visit?"
                      className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blush-400"
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary py-3 text-sm font-medium">
                    Submit Request to Admin
                  </button>
                </form>
              )}
            </div>

            {/* SAVED PROFILE & HOME DETAILS FORM */}
            <div className="bg-white rounded-3xl border border-blush-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Saved Personal & Home Information</h2>
              </div>

              <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Service Address</label>
                  <input 
                    type="text" 
                    value={profile.address} 
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Saved Home & Entry Details</label>
                  <textarea 
                    rows={3}
                    value={profile.homeDetails} 
                    onChange={(e) => setProfile({...profile, homeDetails: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary py-2.5 px-6 text-sm">
                    Save Profile Info
                  </button>
                </div>
              </form>
            </div>

            {/* PAYMENT METHOD SECTION */}
            <div className="bg-white rounded-3xl border border-blush-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="text-blush-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Payment Method on File</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Card details are privately vaulted. A 50% hold is authorized before cleaning, and the remaining balance is charged upon completion.
              </p>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <Lock size={18} className="text-blush-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Visa ending in •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/28 · Secure Vault</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <ShieldCheck size={14} /> Active
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
