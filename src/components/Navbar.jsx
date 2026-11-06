import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, User } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Added "Login / Sign-in" link pointing to your /customer page
  const links = [
    { to: '/', label: 'Home' },
    { to: '/#services', label: 'Services' },
    { to: '/book', label: 'Book Now' },
    { to: '/#about', label: 'About' },
    { to: '/#contact', label: 'Contact' },
    { to: '/customer', label: 'Login / Sign-in' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // This function handles smooth scrolling for hash links
  const handleClick = (to) => {
    setOpen(false) // close mobile menu

    if (to.includes('#')) {
      const id = to.split('#')[1]
      // Small delay so the page can render if needed
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blush-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Text only - logo removed */}
          <Link to="/" className="flex items-center gap-2 group">
            <div>
              <span className="font-script text-2xl text-blush-500 leading-none">Little Luxuries</span>
              <p className="text-[10px] tracking-widest text-gray-500 uppercase -mt-1">Cleaning Co.</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleClick(link.to)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive(link.to)
                    ? 'bg-blush-100 text-blush-600'
                    : 'text-gray-600 hover:text-blush-500 hover:bg-blush-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/book" className="ml-2 btn-primary text-sm py-2 px-5">
              <Sparkles size={16} />
              Book Online
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full text-blush-500 hover:bg-blush-50"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-blush-100 px-4 py-4 space-y-1 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleClick(link.to)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium
                ${isActive(link.to) ? 'bg-blush-100 text-blush-600' : 'text-gray-600 hover:bg-blush-50'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="block mt-3 btn-primary text-center"
          >
            <Sparkles size={16} className="inline mr-1" />
            Book Online
          </Link>
        </div>
      )}
    </nav>
  )
}
