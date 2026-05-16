import useReveal from '../hooks/useReveal'

const TESTIMONIALS = [
  {
    quote: 'NovaSaaS cut our sprint planning from 3 hours to 20 minutes. The AI automation is genuinely magical.',
    initials: 'SL', name: 'Sarah Lin', role: 'VP Engineering, Acme Corp',
  },
  {
    quote: 'We replaced 4 tools with NovaSaaS. Our team is more focused and ships twice as fast.',
    initials: 'MK', name: 'Marcus Kim', role: 'Co-founder, DevCo',
  },
  {
    quote: 'The analytics alone are worth it. I finally understand exactly where we lose time each week.',
    initials: 'AR', name: 'Aisha Rahman', role: 'Product Lead, Stackify',
  },
]

function TestimonialCard({ quote, initials, name, role }) {
  const ref = useReveal()
  return (
    <div className="testimonial" ref={ref}>
      <div className="stars" aria-label="5 stars">★★★★★</div>
      <blockquote>"{quote}"</blockquote>
      <div className="t-author">
        <div className="t-avatar" aria-hidden="true">{initials}</div>
        <div>
          <div className="t-name">{name}</div>
          <div className="t-role">{role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="section-tag">Testimonials</div>
      <div className="section-title">Loved by builders worldwide</div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map(t => <TestimonialCard key={t.name} {...t} />)}
      </div>
    </section>
  )
}
