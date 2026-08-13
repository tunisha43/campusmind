import Link from "next/link";
export default function Projects() {
  return <main className="container" style={{padding:"32px 0"}}>
    <Link href="/dashboard" style={{color:"#7F1D1D",fontWeight:700}}>← Dashboard</Link>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginTop:24}}>
      <div><h1 style={{margin:0}}>Projects</h1><p className="muted">Organize and develop your academic projects.</p></div>
      <button className="btn btn-primary">+ New Project</button>
    </div>
    <div className="card" style={{padding:20,marginTop:24}}>
      <b>No projects yet</b><p className="muted">Start a project and build it chapter by chapter.</p>
      <button className="btn btn-primary">Create Project</button>
    </div>
  </main>;
}