import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import { Link } from 'react-router-dom'
import { Calendar, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />

      <section className="py-16 bg-gradient-to-r from-blush-400 to-blush-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready for a little luxury?
          </h2>
          <p className="text-blush-100 mb-8 max-w-xl mx-auto">
            Pick a day that works for you and we’ll bring the sparkle.
            Online booking takes less than two minutes.
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blush-500 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <Calendar size={20} />
            Book Your Cleaning
            <Sparkles size={18} />
          </Link>
        </div>
      </section>

      <Contact />
    </>
  )
}
