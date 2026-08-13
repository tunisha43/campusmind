import { BookOpen, HeartHandshake, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import { PublicShell } from "../public-components";

export default function AboutPage() {
  return <PublicShell>
    <section className="subpage-hero">
      <div className="landing-container narrow">
        <div className="eyebrow">About CampusMind</div>
        <h1>Built around the way <span>students actually study.</span></h1>
        <p>CampusMind brings academic writing, studying, research and presentation tools into one simple AI workspace.</p>
      </div>
    </section>

    <section className="landing-container story-section">
      <div className="story-copy">
        <span className="section-kicker">Our mission</span>
        <h2>Make academic work less stressful and more productive.</h2>
        <p>Students spend too much time moving between notes, search engines, document editors, presentation tools and different AI services. CampusMind is designed to bring those everyday academic tasks together.</p>
        <p>We want students to spend less time fighting with tools and more time understanding their subjects, improving their work and preparing for the next opportunity.</p>
      </div>
      <div className="mission-card"><Target size={30}/><h3>Study smarter. Create better. Achieve more.</h3><p>One student-focused workspace for the academic tasks that matter most.</p></div>
    </section>

    <section className="values-section">
      <div className="landing-container">
        <div className="center-heading"><span className="section-kicker">What we believe</span><h2>Designed with students in mind.</h2></div>
        <div className="values-grid">
          {[
            [Users,"Student First","Every feature should solve a real student problem."],
            [Lightbulb,"Useful AI","AI should help students understand and create, not add unnecessary complexity."],
            [ShieldCheck,"Privacy Matters","Academic documents and personal information deserve careful handling."],
            [HeartHandshake,"Accessible","Powerful tools should remain affordable for students."]
          ].map(([I,t,d])=><article className="value-card" key={t as string}><div><I size={21}/></div><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </div>
    </section>

    <section className="landing-container about-bottom">
      <BookOpen size={28}/><h2>From assignments to presentations, CampusMind is growing with the student.</h2>
      <p>We are starting with the academic tasks students need most and will continue expanding the workspace based on real feedback.</p>
    </section>
  </PublicShell>;
}
