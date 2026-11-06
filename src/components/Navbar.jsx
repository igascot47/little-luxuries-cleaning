import { Link } from 'react-router-dom'
import { UserCheck } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blush-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo / Home Link */}
        <Link to="/" className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <span>Little Luxuries</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blush-500 transition-colors">
            Home
          </Link>
          
          <Link to="/book" className="text-sm font-medium text-gray-600 hover:text-blush-500 transition-colors">
            Book Now
          </Link>

          {/* Returning Customer Button */}
          <Link 
            to="/customer" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blush-600 bg-blush-50 border border-blush-200 px-3 py-1.5 rounded-full hover:bg-blush-100 transition-colors"
          >
            <UserCheck size={16} />
            Returning Customer
          </Link>
        </nav>

      </div>
    </header>
  )
}
