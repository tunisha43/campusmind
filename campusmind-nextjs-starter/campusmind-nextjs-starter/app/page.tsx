import Link from "next/link";
import { BookOpen, FileText, Presentation, Sparkles } from "lucide-react";

const features = [
  [FileText,"Assignment Assistant","Turn assignment instructions into a clear academic draft."],
  [BookOpen,"Study Assistant","Summarize materials and explain difficult topics."],
  [Presentation,"PowerPoint Generator","Create presentation outlines and slide-ready content."],
  [Sparkles,"Academic Workspace","Keep courses, projects and documents organized."]
] as const;

export default function Home(){
  return <main>
    <nav className="container nav">
      <Link href="/" className="brand">CampusMind</Link>
      <div style={{display:"flex",gap:8}}><Link href="/login" className="btn btn-secondary">Log in</Link><Link href="/signup" className="btn btn-primary">Get started</Link></div>
    </nav>
    <section className="container hero">
      <div style={{color:"#9a3412",fontWeight:800,marginBottom:15}}>Built for students</div>
      <h1>Your academic work, in one mind.</h1>
      <p>CampusMind is an AI-powered academic assistant for assignments, projects, study materials and presentations.</p>
      <div className="hero-actions"><Link href="/signup" className="btn btn-primary">Start with CampusMind</Link><Link href="/dashboard" className="btn btn-secondary">Preview dashboard</Link></div>
    </section>
    <section className="container features">{features.map(([Icon,title,text])=><article className="card feature" key={title}><Icon size={26} color="#7f1d1d"/><h3>{title}</h3><p>{text}</p></article>)}</section>
  </main>
}
