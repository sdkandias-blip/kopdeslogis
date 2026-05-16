export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">NovaSaaS</div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#how">How it works</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <button className="nav-cta" onClick={() => document.getElementById('cta-email')?.focus()}>
        Get Started Free
      </button>
    </nav>
  )
}
