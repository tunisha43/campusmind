import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, Clock3, FileText,
  FolderKanban, LockKeyhole, Menu, MessageSquareText, Presentation,
  Sparkles, Target, UserPlus, WalletCards, X
} from "lucide-react";

const features = [
  {
    icon: FileText, title: "Assignment Assistant",
    text: "Get well-structured, original and AI-generated drafts for any assignment in minutes.",
    color: "red"
  },
  {
    icon: BookOpen, title: "Study Assistant",
    text: "Upload your notes or PDFs and get summaries, key points, explanations and practice questions.",
    color: "orange"
  },
  {
    icon: Presentation, title: "PowerPoint Generator",
    text: "Convert any topic or document into professional PowerPoint slides instantly.",
    color: "green"
  },
  {
    icon: FolderKanban, title: "Project Workspace",
    text: "Plan, research, write and organize your projects from start to finish in one place.",
    color: "green"
  }
];

const steps = [
  ["1", UserPlus, "Sign Up", "Create your free account in seconds."],
  ["2", MessageSquareText, "Tell AI Your Need", "Describe your assignment, topic or upload your material."],
  ["3", Sparkles, "Get AI Results", "Receive high-quality, well-structured results instantly."],
  ["4", Check, "Review & Use", "Edit, download and submit with confidence."]
];

const benefits = [
  [Clock3, "Save Time", "Finish assignments and projects faster.", "red"],
  [Target, "Better Quality", "Get well-structured, original and accurate content.", "orange"],
  [BookOpen, "Academic Focused", "Built specifically for university students.", "green"],
  [LockKeyhole, "Secure & Private", "Your data and documents are safe with us.", "red"],
  [WalletCards, "Affordable Plans", "Premium features at student-friendly prices.", "green"]
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="landing-container nav-inner">
          <Link href="/" className="landing-brand">
            <span className="brand-mark">🎓</span>
            <span>Campus<span>Mind</span></span>
          </Link>

          <nav className="desktop-nav">
            <a className="nav-active" href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About Us</a>
          </nav>

          <div className="nav-actions">
            <Link href="/login" className="nav-login">Log in</Link>
            <Link href="/signup" className="nav-start">Get Started <ArrowRight size={16}/></Link>
          </div>

          <button className="mobile-menu" aria-label="Open menu"><Menu size={22}/></button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="landing-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Built for Students. Powered by AI.</div>
            <h1>Study Smarter.<br/>Create Better.<br/><span>Achieve More.</span></h1>
            <p>CampusMind is your all-in-one AI academic assistant. From assignments to research, presentations to projects — we&apos;ve got you covered.</p>

            <div className="hero-buttons">
              <Link href="/signup" className="hero-primary">Get Started for Free <ArrowRight size={18}/></Link>
              <a href="#how-it-works" className="hero-secondary">See How It Works <span>▷</span></a>
            </div>

            <div className="trust-row">
              <div className="avatar-stack">
                <span>👩🏾</span><span>👨🏿</span><span>👩🏽</span><span>👨🏾</span>
              </div>
              <div><strong>Trusted by students across Nigeria</strong><small>Join thousands of smart students today.</small></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glow glow-one"/>
            <div className="glow glow-two"/>
            <div className="student-card">
              <div className="student-photo">
                <div className="student-avatar">👨🏿‍🎓</div>
                <div className="laptop">▰</div>
                <div className="book-stack">📚</div>
              </div>
            </div>
            <div className="float-card ai-card"><strong>AI</strong><small>Powered</small></div>
            <div className="float-card time-card"><Clock3 size={18}/><strong>Save</strong><small>Time</small></div>
            <div className="float-card grade-card"><span>↗</span><strong>Boost</strong><small>Grades</small></div>
          </div>
        </div>
      </section>

      <section id="features" className="feature-wrap landing-container">
        <div className="feature-grid">
          {features.map(([Icon, title, text, color]) => (
            <article className="feature-card" key={title as string}>
              <div className={`feature-icon ${color}`}><Icon size={23}/></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#how-it-works">Learn more <ArrowRight size={14}/></a>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how-section landing-container">
        <div className="how-inner">
          <h2>How CampusMind Works</h2>
          <div className="steps-grid">
            {steps.map(([number, Icon, title, text], i) => (
              <div className="step" key={title as string}>
                <div className="step-icon"><Icon size={22}/><b>{number}</b></div>
                <div><h3>{title}</h3><p>{text}</p></div>
                {i < steps.length - 1 && <ArrowRight className="step-arrow" size={22}/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="benefits landing-container">
        <h2>Why Students Love <span>CampusMind</span></h2>
        <div className="benefit-grid">
          {benefits.map(([Icon, title, text, color]) => (
            <article className="benefit" key={title as string}>
              <div className={`benefit-icon ${color}`}><Icon size={21}/></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="cta landing-container">
        <div className="cta-icon">🎓</div>
        <div><h2>Ready to take your academics to the next level?</h2><p>Join CampusMind today and experience the future of smart studying.</p></div>
        <Link href="/signup" className="cta-button">Get Started Now <ArrowRight size={18}/></Link>
      </section>

      <footer className="landing-footer">
        <div className="landing-container footer-grid">
          <div className="footer-brand">
            <Link href="/" className="landing-brand"><span className="brand-mark">🎓</span><span>Campus<span>Mind</span></span></Link>
            <p>Your AI-powered academic partner.<br/>Study smarter. Create better.<br/>Achieve more.</p>
            <div className="socials"><span>f</span><span>𝕏</span><span>◎</span><span>in</span></div>
          </div>
          <div><h4>Product</h4><a href="#features">Features</a><a href="#how-it-works">How It Works</a><a href="#pricing">Pricing</a><a href="#">FAQ</a></div>
          <div><h4>Company</h4><a href="#about">About Us</a><a href="#">Blog</a><a href="#">Careers</a><a href="#">Contact Us</a></div>
          <div><h4>Legal</h4><a href="#">Terms of Service</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a></div>
          <div className="newsletter"><h4>Stay Updated</h4><p>Get tips, updates and offers straight to your email.</p><div className="email-box"><input placeholder="Enter your email" aria-label="Email"/><button aria-label="Subscribe"><ArrowRight size={18}/></button></div></div>
        </div>
        <div className="copyright">© 2026 CampusMind. All rights reserved.</div>
      </footer>
    </main>
  );
}
