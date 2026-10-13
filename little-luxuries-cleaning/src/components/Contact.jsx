import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Let’s Chat</h2>
        <p className="section-subtitle">
          Questions about a service or need a custom quote? We’re happy to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="space-y-4">
            <a href="tel:+1234567890" className="card p-5 flex items-center gap-4 hover:border-blush-200">
              <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center shrink-0">
                <Phone className="text-blush-500" size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Call or Text</p>
                <p className="font-medium text-gray-800">(123) 456-7890</p>
              </div>
            </a>
            <a href="mailto:hello@littleluxuriescleaning.com" className="card p-5 flex items-center gap-4 hover:border-blush-200">
              <div className="w-12 h-12 rounded-2xl bg-mint-100 flex items-center justify-center shrink-0">
                <Mail className="text-mint-500" size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="font-medium text-gray-800">hello@littleluxuriescleaning.com</p>
              </div>
            </a>
            <div className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center shrink-0">
                <MapPin className="text-blush-500" size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Service Area</p>
                <p className="font-medium text-gray-800">Your city & surrounding areas</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-blush-400" />
              Send a quick message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Thank you! In a live site this would email you. For now it’s a demo.')
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50"
              />
              <textarea
                placeholder="How can we help?"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-blush-100 focus:outline-none focus:ring-2 focus:ring-blush-300 bg-blush-50/50 resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
