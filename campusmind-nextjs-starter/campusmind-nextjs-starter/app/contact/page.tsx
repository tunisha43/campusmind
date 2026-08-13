import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { PublicShell } from "../public-components";

export default function ContactPage() {
  return <PublicShell>
    <section className="subpage-hero">
      <div className="landing-container narrow">
        <div className="eyebrow">We&apos;re here to help</div>
        <h1>Have a question? <span>Let&apos;s talk.</span></h1>
        <p>Whether you have a product question, need support or want to discuss a partnership, send us a message.</p>
      </div>
    </section>

    <section className="landing-container contact-section">
      <div className="contact-info">
        <span className="section-kicker">Contact CampusMind</span>
        <h2>Tell us what you need.</h2>
        <p>We&apos;ll use your message to route your enquiry to the right team.</p>
        <div className="contact-items">
          <div><Mail size={19}/><div><strong>Email</strong><span>support@campusmind.app</span></div></div>
          <div><MessageCircle size={19}/><div><strong>Support</strong><span>For account and product questions</span></div></div>
          <div><MapPin size={19}/><div><strong>Built for students</strong><span>Starting in Nigeria, designed to scale globally.</span></div></div>
        </div>
      </div>
      <form className="contact-form">
        <label>Name<input required placeholder="Your name"/></label>
        <label>Email<input required type="email" placeholder="you@example.com"/></label>
        <label>Subject<select defaultValue=""><option value="" disabled>Choose a subject</option><option>Product question</option><option>Account support</option><option>Partnership</option><option>Feedback</option></select></label>
        <label>Message<textarea required rows={6} placeholder="How can we help?"/></label>
        <button type="submit">Send Message <Send size={17}/></button>
        <small>This form is currently a UI placeholder. We&apos;ll connect it to the CampusMind support backend later.</small>
      </form>
    </section>
  </PublicShell>;
}
