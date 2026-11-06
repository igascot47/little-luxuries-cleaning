import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Home, Clock } from 'lucide-react';

export default function ReturningBooking() {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [submitted, setSubmitted] = useState(false);

  // Simulated saved customer info (can later be connected to a database/account)
  const customerInfo = {
    name: 'Valued Customer',
    address: '123 Luxury Lane, Cleanville, CA',
    homeSize: 'Standard Cleaning Package',
    notes: 'Standard access instructions apply.'
  };

  const availableDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const availableSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDay) {
      alert('Please select an available cleaning day.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 via-softpink/20 to-mint-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-blush-100 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Book your next cleaning instantly using your saved home details.</p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-mint-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your cleaning is scheduled for <span className="font-semibold text-blush-500">{selectedDay} at {selectedTime}</span>.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Saved Home Info Card */}
            <div className="bg-blush-50/50 rounded-2xl p-5 border border-blush-100">
              <div className="flex items-center gap-2 text-blush-600 font-medium mb-3">
                <Home size={20} />
                <span>Saved Home Information</span>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Address:</strong> {customerInfo.address}</p>
                <p><strong>Package:</strong> {customerInfo.homeSize}</p>
                <p><strong>Notes:</strong> {customerInfo.notes}</p>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
              <Clock size={18} className="text-blush-500" />
              <span>Available Hours: <strong>Sunday – Thursday, 9:00 AM – 3:00 PM</strong></span>
            </div>

            {/* Select Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Cleaning Day</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableDays.map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                      selectedDay === day
                        ? 'bg-blush-500 text-white border-blush-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blush-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-blush-400"
              >
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              <Calendar size={18} />
              Confirm Quick Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
