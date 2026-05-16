import useReveal from '../hooks/useReveal'

const FEATURES = [
  {
    colorClass: 'icon-purple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    title: 'AI Automation',
    desc: 'Let AI handle repetitive workflows. NovaSaaS learns your patterns and automates them with one click.',
  },
  {
    colorClass: 'icon-cyan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Real-time Collaboration',
    desc: 'Work simultaneously with your team. Changes sync instantly with conflict-free merging.',
  },
  {
    colorClass: 'icon-green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Advanced Analytics',
    desc: 'Visualize performance metrics, bottlenecks, and team velocity in a unified dashboard.',
  },
  {
    colorClass: 'icon-orange',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: '200+ Integrations',
    desc: 'Connect Slack, GitHub, Jira, Notion, and 196 more tools your team already uses.',
  },
  {
    colorClass: 'icon-pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II, SSO, RBAC, and end-to-end encryption. Security you can trust.',
  },
  {
    colorClass: 'icon-blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global CDN',
    desc: 'Sub-50ms response times from anywhere on the planet. Your team works without limits.',
  },
]

function FeatureCard({ colorClass, icon, title, desc }) {
  const ref = useReveal()
  return (
    <div className="feature-card" ref={ref}>
      <div className={`feature-icon ${colorClass}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-tag">Features</div>
      <div className="section-title">Everything your team needs</div>
      <p className="section-sub">Powerful features designed to eliminate friction and accelerate delivery — from day one.</p>
      <div className="features-grid">
        {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
      </div>
    </section>
  )
}
