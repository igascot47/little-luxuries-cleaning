import BookingCalendar from '../components/BookingCalendar'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Booking() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-blush-50 to-white min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blush-500 hover:underline mb-6"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
            Book Your Cleaning
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Select an available day and time slot. You’ll receive a confirmation and can
            cancel or reschedule later.
          </p>
        </div>

        <BookingCalendar />
      </div>
    </section>
  )
}
