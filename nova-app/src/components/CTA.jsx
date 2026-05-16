import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      setSubmitted(true)
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <section className="cta-section">
      <div className="cta-box">
        <h2>Ready to ship faster?</h2>
        <p>Join 50,000+ teams already using NovaSaaS. Always free — no credit card, no limits.</p>
        {submitted ? (
          <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.1rem' }}>
            You're on the list! We'll be in touch soon.
          </p>
        ) : (
          <div className="cta-form">
            <input
              id="cta-email"
              className={`cta-input${error ? ' error' : ''}`}
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              aria-label="Work email address"
            />
            <button className="btn-primary" onClick={handleSubmit}>
              Get early access
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
