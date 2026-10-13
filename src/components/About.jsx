import { Clock, Heart, Shield, Sparkles } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Friendly & Warm', text: 'We treat every home like a friend invited us over.' },
  { icon: Sparkles, title: 'Attention to Detail', text: 'No corner left behind — we love the little luxuries.' },
  { icon: Shield, title: 'Trusted & Reliable', text: 'Consistent quality you can count on every visit.' },
  { icon: Clock, title: 'Respect Your Time', text: 'On-time arrivals and efficient, thorough work.' },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-blush-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              A little luxury in every clean
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Little Luxuries Cleaning Co. we believe cleaning should feel special —
              not just another chore. We bring a soft, professional touch to every space,
              whether it’s a weekly refresh, a deep clean, or preparing a brand-new building
              for its first residents.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our schedule is thoughtfully designed so we can give each client our full
              attention. We’re open <strong className="text-blush-500">8 AM – 3 PM</strong> on
              our working days, alternating weeks so you always know when we’re available.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="card p-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blush-100 flex items-center justify-center mb-3">
                  <v.icon className="text-blush-500" size={22} />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 mb-1">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-snug">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
