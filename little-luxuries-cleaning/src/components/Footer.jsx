import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blush-50 to-blush-100 border-t border-blush-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <div>
                <span className="font-script text-xl text-blush-500">Little Luxuries</span>
                <p className="text-[9px] tracking-widest text-gray-500 uppercase -mt-0.5">Cleaning Co.</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional, friendly & thorough cleaning that leaves every space sparkling with a little luxury.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-blush-500 transition">Home</Link></li>
              <li><Link to="/#services" className="text-gray-600 hover:text-blush-500 transition">Services</Link></li>
              <li><Link to="/book" className="text-gray-600 hover:text-blush-500 transition">Book a Cleaning</Link></li>
              <li><Link to="/admin" className="text-gray-600 hover:text-blush-500 transition">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blush-400" />
                <a href="tel:+1234567890" className="hover:text-blush-500">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blush-400" />
                <a href="mailto:hello@littleluxuriescleaning.com" className="hover:text-blush-500">
                  hello@littleluxuriescleaning.com
                </a>
              </li>
              <li className="flex items-center gap-3 mt-4">
                <a href="#" className="p-2 rounded-full bg-white text-blush-400 hover:bg-blush-100 transition" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white text-blush-400 hover:bg-blush-100 transition" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blush-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Little Luxuries Cleaning Co. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-blush-400 fill-blush-400" /> for sparkling homes
          </p>
        </div>
      </div>
    </footer>
  )
}
