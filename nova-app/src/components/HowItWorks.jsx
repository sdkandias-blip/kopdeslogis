import useReveal from '../hooks/useReveal'

const STEPS = [
  { num: 1, title: 'Connect your tools', desc: 'Link your existing stack in seconds. NovaSaaS auto-discovers your workflows.' },
  { num: 2, title: 'Train the AI', desc: "The AI observes your team's patterns and suggests automations tailored to you." },
  { num: 3, title: 'Ship & measure', desc: 'Watch your velocity climb. Track every metric that matters in real time.' },
]

function Step({ num, title, desc }) {
  const ref = useReveal()
  return (
    <div className="step" ref={ref}>
      <div className="step-num" aria-hidden="true">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <div className="how" id="how">
      <div className="how-inner">
        <div className="section-tag">How it works</div>
        <div className="section-title">Up and running in minutes</div>
        <div className="steps">
          {STEPS.map(s => <Step key={s.num} {...s} />)}
        </div>
      </div>
    </div>
  )
}
