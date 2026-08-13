import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Presentation, Sparkles, GraduationCap } from "lucide-react";

const tools = [
  { icon: FileText, title: "Assignments & Projects", text: "Get structured help with coursework, research and project writing." },
  { icon: BookOpen, title: "Study Assistant", text: "Understand difficult topics, create quizzes and study from your materials." },
  { icon: FileText, title: "PDF & Documents", text: "Summarize academic documents and ask questions about your files." },
  { icon: Presentation, title: "PowerPoint Generator", text: "Turn a topic into a clear, organized presentation in minutes." }
];

export default function Home() {
  return (
    <main>
      <header style={{padding:"16px 0", background:"#fff", borderBottom:"1px solid #E7E5E4"}}>
        <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Link href="/" style={{fontWeight:800, fontSize:22, color:"#7F1D1D"}}>CampusMind</Link>
          <nav style={{display:"flex", gap:20, alignItems:"center"}}>
            <a href="#features" className="muted">Features</a>
            <a href="#how" className="muted">How it works</a>
            <Link href="/login" className="muted">Login</Link>
            <Link href="/signup" className="btn btn-primary">Get Started</Link>
          </nav>
        </div>
      </header>

      <section style={{padding:"72px 0 56px"}}>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1.05fr .95fr", gap:40, alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex", alignItems:"center", gap:8, color:"#7F1D1D", fontWeight:700, marginBottom:16}}>
              <Sparkles size={18}/> Your academic workspace
            </div>
            <h1 style={{fontSize:"clamp(40px, 7vw, 68px)", lineHeight:1.02, margin:"0 0 20px", letterSpacing:"-2px"}}>
              Your academic work, <span style={{color:"#7F1D1D"}}>smarter.</span>
            </h1>
            <p className="muted" style={{fontSize:18, lineHeight:1.7, maxWidth:600, marginBottom:28}}>
              Study smarter, write better, analyze your notes and create presentations from one intelligent academic workspace.
            </p>
            <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
              <Link href="/signup" className="btn btn-primary">Get Started Free <ArrowRight size={18}/></Link>
              <a href="#features" className="btn btn-secondary">Explore CampusMind</a>
            </div>
          </div>

          <div className="card" style={{padding:20}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18}}>
              <div>
                <div style={{fontWeight:800}}>Good morning, David 👋</div>
                <div className="muted" style={{fontSize:13}}>Computer Science • 300 Level</div>
              </div>
              <div style={{width:38,height:38,borderRadius:"50%",background:"#7F1D1D",color:"#fff",display:"grid",placeItems:"center",fontWeight:800}}>D</div>
            </div>
            <div style={{fontWeight:800, marginBottom:12}}>What do you want to work on?</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {["Assignment","Project","Study","PDF","PowerPoint","My Files"].map((x,i)=>
                <div key={x} style={{padding:15,border:"1px solid #E7E5E4",borderRadius:10,background:i===0?"#FFF7F7":"#fff"}}>
                  <div style={{fontWeight:700}}>{x}</div>
                  <div className="muted" style={{fontSize:12,marginTop:4}}>Start now →</div>
                </div>
              )}
            </div>
            <div style={{marginTop:16,padding:14,borderRadius:10,background:"#F0FDF4",color:"#166534",fontSize:13}}>
              <b>Upcoming:</b> CSC 301 assignment due tomorrow
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section" style={{background:"#fff"}}>
        <div className="container">
          <div style={{maxWidth:650, marginBottom:30}}>
            <div style={{color:"#C2410C",fontWeight:800}}>Everything in one place</div>
            <h2 style={{fontSize:36,margin:"8px 0 10px"}}>Built around what students actually need.</h2>
            <p className="muted">CampusMind combines the most useful academic tools into one simple workspace.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {tools.map(({icon:Icon,title,text})=>
              <div className="card" key={title} style={{padding:22}}>
                <div style={{width:44,height:44,borderRadius:10,background:"#FFF7ED",color:"#C2410C",display:"grid",placeItems:"center",marginBottom:16}}><Icon size={22}/></div>
                <h3 style={{margin:"0 0 8px",fontSize:18}}>{title}</h3>
                <p className="muted" style={{fontSize:14,lineHeight:1.6,margin:0}}>{text}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container" style={{textAlign:"center"}}>
          <h2 style={{fontSize:34,margin:"0 0 10px"}}>Choose. Create. Improve. Save.</h2>
          <p className="muted">A simple workflow for everyday academic work.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginTop:30}}>
            {["Choose a tool","Give the details","Review the result","Save or export"].map((x,i)=>
              <div className="card" key={x} style={{padding:22}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:"#7F1D1D",color:"#fff",display:"grid",placeItems:"center",margin:"0 auto 12px",fontWeight:800}}>{i+1}</div>
                <b>{x}</b>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{padding:"56px 0",background:"#7F1D1D",color:"#fff"}}>
        <div className="container" style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"center",flexWrap:"wrap"}}>
          <div>
            <h2 style={{margin:"0 0 8px",fontSize:32}}>Ready to make academic work easier?</h2>
            <p style={{margin:0,opacity:.85}}>Start building your academic workspace today.</p>
          </div>
          <Link href="/signup" className="btn" style={{background:"#fff",color:"#7F1D1D"}}>Get Started Free <ArrowRight size={18}/></Link>
        </div>
      </section>

      <footer style={{padding:"28px 0",background:"#fff",borderTop:"1px solid #E7E5E4"}}>
        <div className="container" style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
          <b style={{color:"#7F1D1D"}}>CampusMind</b>
          <span className="muted" style={{fontSize:13}}>Privacy • Terms • Contact</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 800px) {
          nav a:not(.btn) { display:none; }
          .container { width: min(100% - 24px, 1120px); }
          section > .container { grid-template-columns: 1fr !important; }
          .section { padding: 48px 0; }
          #features .container > div:last-child, #how .container > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          h1 { letter-spacing:-1.5px !important; }
          #features .container > div:last-child, #how .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}