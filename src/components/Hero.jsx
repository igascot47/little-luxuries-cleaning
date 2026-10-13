import { Link } from 'react-router-dom'
import { Sparkles, Calendar, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush-50 via-softpink/40 to-mint-50 py-16 md:py-24">
      <div className="sparkle top-20 left-[15%]" style={{ animationDelay: '0s' }} />
      <div className="sparkle top-40 right-[20%]" style={{ animationDelay: '0.6s' }} />
      <div className="sparkle bottom-32 left-[25%]" style={{ animationDelay: '1.2s' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-blush-500 text-xs font-medium mb-4 border border-blush-100">
            <Star size={12} className="fill-blush-400 text-blush-400" />
            Professional • Friendly • Thorough
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-tight mb-4">
            Sparkling clean,{' '}
            <span className="font-script text-blush-500 text-5xl md:text-6xl lg:text-7xl">with a little luxury</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
            From regular tidy-ups to deep cleans, move-outs and brand-new buildings —
            we treat every space like our own. Soft, thorough, and always inviting.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary">
              <Calendar size={18} />
              Book Your Cleaning
            </Link>
            <a href="#services" className="btn-secondary">
              <Sparkles size={18} />
              Our Services
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 border border-blush-100 text-sm">
            <div className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
            <span className="text-gray-600">
              Open <strong className="text-blush-500">8 AM – 3 PM</strong> · Alternating schedule
            </span>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blush-200/40 to-mint-200/40 rounded-full blur-3xl scale-110" />
           
          </div>
        </div>
      </div>
    </section>
  )
}
