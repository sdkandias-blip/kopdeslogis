const LINKS = ['Privacy', 'Terms', 'Security', 'Changelog', 'Blog']

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">NovaSaaS</div>
      <nav className="footer-links" aria-label="Footer navigation">
        {LINKS.map(l => <a key={l} href="#">{l}</a>)}
      </nav>
      <div className="footer-copy">© 2026 NovaSaaS, Inc.</div>
    </footer>
  )
}
