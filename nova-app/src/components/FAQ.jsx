import { useState } from 'react'
import useReveal from '../hooks/useReveal'

const FAQS = [
  { q: 'Is NovaSaaS really free to use?', a: 'Yes. NovaSaaS is free for individuals and small teams. No hidden fees, no credit card required, and no artificial feature limits for core workflows.' },
  { q: 'How does the AI automation work?', a: "NovaSaaS observes your team's recurring actions and proposes automation rules. You review and approve each one. No data leaves your environment without consent." },
  { q: 'Which tools can I integrate?', a: 'NovaSaaS supports 200+ integrations including Slack, GitHub, Linear, Notion, Jira, Figma, and Zapier. New integrations are added weekly based on community votes.' },
  { q: 'Is my data secure?', a: 'Absolutely. All data is encrypted at rest and in transit. We are SOC 2 Type II certified and support SSO, SAML, and RBAC for access control.' },
  { q: 'How is NovaSaaS different from Notion or Linear?', a: 'NovaSaaS is an orchestration layer — it sits on top of your existing tools and connects them intelligently. Think of it as the connective tissue that makes your whole stack smarter.' },
]

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="5" y1="1" x2="5" y2="9"/><line x1="1" y1="5" x2="9" y2="5"/>
  </svg>
)

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal()
  return (
    <div className={`faq-item${open ? ' open' : ''}`} ref={ref}>
      <button
        className="faq-q"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {q}
        <div className="faq-icon"><PlusIcon /></div>
      </button>
      <div className="faq-a" aria-hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="section-tag">FAQ</div>
      <div className="section-title">Questions? Answered.</div>
      <p className="section-sub">Everything you need to know about NovaSaaS.</p>
      <div className="faq-list">
        {FAQS.map(item => <FaqItem key={item.q} {...item} />)}
      </div>
    </section>
  )
}
