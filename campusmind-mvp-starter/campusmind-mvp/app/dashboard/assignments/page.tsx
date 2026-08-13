import Link from "next/link";
export default function Assignments() {
  return <main className="container" style={{padding:"32px 0"}}>
    <Link href="/dashboard" style={{color:"#7F1D1D",fontWeight:700}}>← Dashboard</Link>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginTop:24}}>
      <div><h1 style={{margin:0}}>Assignments</h1><p className="muted">Create and manage your coursework.</p></div>
      <button className="btn btn-primary">+ New Assignment</button>
    </div>
    <div className="card" style={{padding:20,marginTop:24}}>
      <b>No assignments yet</b><p className="muted">Create your first assignment to get started.</p>
      <button className="btn btn-primary">Create Assignment</button>
    </div>
  </main>;
}