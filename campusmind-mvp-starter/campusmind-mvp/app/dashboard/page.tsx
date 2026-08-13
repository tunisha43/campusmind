import Link from "next/link";
import { BookOpen, FileText, FolderKanban, Presentation, User, Bell } from "lucide-react";

const actions = [
  ["Assignment", FileText, "/dashboard/assignments"],
  ["Project", FolderKanban, "/dashboard/projects"],
  ["Study", BookOpen, "#"],
  ["PDF", FileText, "#"],
  ["PowerPoint", Presentation, "#"],
  ["My Files", FolderKanban, "#"]
] as const;

export default function Dashboard() {
  return <main style={{minHeight:"100vh"}}>
    <header style={{background:"#fff",borderBottom:"1px solid #E7E5E4",padding:"14px 0"}}>
      <div className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Link href="/" style={{fontWeight:800,fontSize:21,color:"#7F1D1D"}}>CampusMind</Link>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><Bell size={20}/><div style={{width:36,height:36,borderRadius:"50%",background:"#7F1D1D",color:"#fff",display:"grid",placeItems:"center"}}><User size={18}/></div></div>
      </div>
    </header>
    <div className="container" style={{padding:"32px 0 90px"}}>
      <p className="muted" style={{marginBottom:6}}>University • Faculty • Department</p>
      <h1 style={{margin:"0 0 26px",fontSize:32}}>Good morning, Student 👋</h1>
      <h2 style={{fontSize:20}}>What do you want to work on?</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {actions.map(([name,Icon,href])=><Link href={href} key={name} className="card" style={{padding:18}}>
          <div style={{width:42,height:42,borderRadius:10,background:"#FFF7ED",color:"#C2410C",display:"grid",placeItems:"center"}}><Icon size={20}/></div>
          <b style={{display:"block",marginTop:12}}>{name}</b><span className="muted" style={{fontSize:12}}>Start now →</span>
        </Link>)}
      </div>
      <h2 style={{fontSize:20,marginTop:34}}>Upcoming</h2>
      <div className="card" style={{padding:18,display:"flex",justifyContent:"space-between",gap:12}}>
        <div><b>CSC 301 Assignment</b><div className="muted" style={{fontSize:13,marginTop:4}}>Due tomorrow</div></div>
        <span style={{color:"#C2410C",fontWeight:700}}>View</span>
      </div>
    </div>
    <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #E7E5E4",padding:"10px 12px",display:"flex",justifyContent:"space-around"}}>
      {[["Home","/dashboard"],["AI","#"],["Study","#"],["Profile","#"]].map(([x,href])=><Link href={href} key={x} style={{fontSize:12,fontWeight:700,color:x==="Home"?"#7F1D1D":"#57534E"}}>{x}</Link>)}
    </nav>
    <style>{`@media(max-width:650px){.container{width:calc(100% - 24px)} .container>div[style*="repeat(3"]{grid-template-columns:1fr 1fr !important}}`}</style>
  </main>;
}