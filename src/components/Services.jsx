
import { Home, Sparkles, Building2, AppWindow, Truck, Briefcase } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Regular Cleanings',
    desc: 'Keep your home consistently fresh with our recurring tidy-up visits. Perfect for busy lives.',
    color: 'from-blush-100 to-blush-50',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleans',
    desc: 'A thorough top-to-bottom refresh — baseboards, appliances, light fixtures and every hidden corner.',
    color: 'from-mint-100 to-mint-50',
  },
  {
    icon: Truck,
    title: 'Move-Out Cleans',
    desc: 'Leave your old place spotless for the next tenant or inspection. We handle the stress so you don’t have to.',
    color: 'from-blush-100 to-blush-50',
  },
  {
    icon: AppWindow,
    title: 'Window Cleaning',
    desc: 'Crystal-clear windows inside and out. Let the light pour in again.',
    color: 'from-mint-100 to-mint-50',
  },
  {
    icon: Building2,
    title: 'Brand New Buildings',
    desc: 'Post-construction or just-finished homes deserve a final polish. We make them move-in ready.',
    color: 'from-blush-100 to-blush-50',
  },
  {
    icon: Briefcase,
    title: 'Office Cleaning',
    desc: 'Professional spaces that look as good as they perform. Flexible after-hours options available.',
    color: 'from-mint-100 to-mint-50',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">
          Every service is delivered with care, attention to detail, and a touch of luxury.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="card p-6 group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="text-blush-500" size={26} />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
