import { ChevronDown } from "lucide-react";
import { PublicShell } from "../public-components";

const faqs = [
  ["What is CampusMind?","CampusMind is an AI-powered academic workspace designed to help university students with assignments, projects, studying, documents and presentations."],
  ["Is CampusMind free?","Yes. We plan to offer a free tier with limited AI usage so students can try the core experience before deciding whether they need more."],
  ["Can CampusMind write my assignment?","CampusMind can help you structure ideas, draft content, explain concepts and improve your work. Students should review AI-generated content, verify important information and follow their institution's academic rules."],
  ["Can I upload lecture notes or PDFs?","Yes. The Study Assistant and document tools are being designed around uploads such as lecture notes, course materials and PDFs."],
  ["Can it create PowerPoint presentations?","Yes. PowerPoint generation is one of CampusMind's core planned features. You will be able to provide a topic or source material and generate a structured presentation."],
  ["Will CampusMind remember my university information?","Yes. During onboarding you can save information such as your university, matric number, faculty, department and level so you do not have to repeatedly enter it when creating academic work."],
  ["How does the AI usage limit work?","Each plan will include a defined allowance for AI generations or processing. We will show your remaining usage in the dashboard so you can manage it."],
  ["Is my information private?","We are designing CampusMind with account and document privacy in mind. The production privacy policy will explain exactly what data is stored, how it is used and how users can manage their information."],
  ["Can I cancel a Pro subscription?","Yes. The subscription system will allow you to manage or cancel your plan. Exact billing and refund rules will be shown before payment."],
  ["Will CampusMind work outside Nigeria?","The product is being designed to be global from the beginning. Nigeria is our initial focus, but the architecture and academic profile are intended to support students in other countries as we scale."]
];

export default function FAQPage() {
  return <PublicShell>
    <section className="subpage-hero">
      <div className="landing-container narrow">
        <div className="eyebrow">Frequently asked questions</div>
        <h1>Questions? We&apos;ve got <span>answers.</span></h1>
        <p>Here are the things students are most likely to want to know about CampusMind.</p>
      </div>
    </section>
    <section className="landing-container faq-section">
      <div className="faq-list">
        {faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}
      </div>
      <div className="faq-help"><h2>Still have a question?</h2><p>Send us a message and we&apos;ll help you find the answer.</p><a href="/contact">Contact CampusMind →</a></div>
    </section>
  </PublicShell>;
}
