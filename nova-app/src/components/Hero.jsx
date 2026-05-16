import { useEffect, useRef } from 'react'

const STATS = [
  { num: 50, suffix: 'K+', label: 'Teams onboarded' },
  { num: 4.9, suffix: '★', label: 'Average rating' },
  { num: 2.4, suffix: 'M', label: 'Tasks automated' },
  { num: 99.9, suffix: '%', label: 'Uptime SLA' },
]

function AnimatedCounter({ num, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const dur = 1800
      let start = null
      const step = (ts) => {
        if (!start) start = ts
        const prog = Math.min((ts - start) / dur, 1)
        const ease = 1 - Math.pow(1 - prog, 3)
        el.textContent = (num < 10 ? (num * ease).toFixed(1) : Math.round(num * ease)) + suffix
        if (prog < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      observer.unobserve(el)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [num, suffix])

  return <div className="stat-num" ref={ref}>{num}{suffix}</div>
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="badge">
        <span className="badge-dot" aria-hidden="true" />
        Now in public beta — free forever tier available
      </div>
      <h1 className="hero-title">
        Ship 10× Faster With <span>AI-Powered</span> Workflows
      </h1>
      <p className="hero-sub">
        NovaSaaS unifies your team's tools, automates repetitive tasks, and surfaces insights — so you can focus on what actually moves the needle.
      </p>
      <div className="hero-btns">
        <button className="btn-primary" onClick={() => document.getElementById('cta-email')?.focus()}>
          Start for free →
        </button>
        <button className="btn-ghost">Watch demo</button>
      </div>
      <div className="hero-stats" aria-label="Key statistics">
        {STATS.map(({ num, suffix, label }) => (
          <div className="stat" key={label}>
            <AnimatedCounter num={num} suffix={suffix} />
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
