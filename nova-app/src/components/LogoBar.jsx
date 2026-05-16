const BRANDS = ['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Loom']

export default function LogoBar() {
  return (
    <div className="logos" aria-label="Trusted by">
      <div className="logos-label">Trusted by teams at</div>
      <div className="logos-row">
        {BRANDS.map(b => <span key={b}>{b}</span>)}
      </div>
    </div>
  )
}
