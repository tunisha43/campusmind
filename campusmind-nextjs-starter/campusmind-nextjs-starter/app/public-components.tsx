
import Link from "next/link";
import { ArrowRight, Check, Mail, MapPin, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="site-header">
      <div className="landing-container nav-inner">
        <Link href="/" className="landing-brand">
          <span className="brand-mark">🎓</span>
          <span>Campus<span>Mind</span></span>
        </Link>
        <nav className="desktop-nav">
          <Link href="/">Home</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link className="nav-active" href="/pricing">Pricing</Link>
          <Link href="/about">About Us</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/login" className="nav-login">Log in</Link>
          <Link href="/signup" className="nav-start">Get Started <ArrowRight size={16}/></Link>
        </div>
        <details className="mobile-nav">
          <summary>☰</summary>
          <div>
            <Link href="/">Home</Link><Link href="/#features">Features</Link>
            <Link href="/#how-it-works">How It Works</Link><Link href="/pricing">Pricing</Link>
            <Link href="/about">About Us</Link><Link href="/contact">Contact</Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="landing-brand"><span className="brand-mark">🎓</span><span>Campus<span>Mind</span></span></Link>
          <p>Your AI-powered academic partner.<br/>Study smarter. Create better.<br/>Achieve more.</p>
          <div className="socials"><span>f</span><span>𝕏</span><span>◎</span><span>in</span></div>
        </div>
        <div><h4>Product</h4><Link href="/#features">Features</Link><Link href="/#how-it-works">How It Works</Link><Link href="/pricing">Pricing</Link><Link href="/faq">FAQ</Link></div>
        <div><h4>Company</h4><Link href="/about">About Us</Link><Link href="/contact">Contact Us</Link></div>
        <div><h4>Legal</h4><Link href="#">Terms of Service</Link><Link href="#">Privacy Policy</Link><Link href="#">Refund Policy</Link></div>
        <div className="newsletter"><h4>Stay Updated</h4><p>Get tips, updates and offers straight to your email.</p><div className="email-box"><input placeholder="Enter your email" aria-label="Email"/><button aria-label="Subscribe"><ArrowRight size={18}/></button></div></div>
      </div>
      <div className="copyright">© 2026 CampusMind. All rights reserved.</div>
    </footer>
  );
}

export const PublicShell = ({ children }: { children: React.ReactNode }) => (
  <main><PublicHeader/>{children}<PublicFooter/></main>
);
