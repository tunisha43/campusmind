import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PublicShell } from "../public-components";

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    intro: "Explore CampusMind and get started with essential academic tools.",
    featured: false,
    features: ["Limited AI generations", "Basic assignment assistance", "Basic study tools", "Limited document processing", "Access to your workspace"]
  },
  {
    name: "CampusMind Pro",
    price: "₦3,000",
    period: "per month",
    intro: "Everything a student needs to work smarter throughout the semester.",
    featured: true,
    features: ["Higher monthly AI allowance", "Assignment Assistant", "Project Assistant", "Study Assistant", "PDF & document tools", "PowerPoint generation", "Academic templates", "Priority feature access"]
  }
];

export default function PricingPage() {
  return <PublicShell>
    <section className="subpage-hero">
      <div className="landing-container narrow">
        <div className="eyebrow">Simple student pricing</div>
        <h1>Powerful academic tools.<br/><span>Student-friendly pricing.</span></h1>
        <p>Start free, discover what CampusMind can do, then upgrade when you need more power.</p>
      </div>
    </section>

    <section className="landing-container pricing-section">
      <div className="pricing-grid">
        {plans.map((plan) => <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
          {plan.featured && <div className="popular">MOST POPULAR</div>}
          <div className="price-icon"><Sparkles size={20}/></div>
          <h2>{plan.name}</h2>
          <p className="price-intro">{plan.intro}</p>
          <div className="price"><strong>{plan.price}</strong><span>/{plan.period}</span></div>
          <Link href="/signup" className={plan.featured ? "price-button primary" : "price-button"}>{plan.featured ? "Start Pro" : "Get Started"} <ArrowRight size={16}/></Link>
          <div className="feature-list">{plan.features.map(x => <div key={x}><Check size={16}/><span>{x}</span></div>)}</div>
        </article>)}
      </div>
      <p className="pricing-note">AI usage limits and generation allowances may change as we improve the service and manage operating costs. Your plan will always show the allowance available to you.</p>
    </section>
  </PublicShell>;
}
