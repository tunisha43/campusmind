import Link from "next/link";

export default function Onboarding() {
  return <main style={{minHeight:"100vh",padding:"32px 16px"}}>
    <div className="container" style={{maxWidth:720}}>
      <Link href="/" style={{fontWeight:800,fontSize:22,color:"#7F1D1D"}}>CampusMind</Link>
      <div style={{marginTop:50}}>
        <div style={{color:"#C2410C",fontWeight:800}}>Step 1 of 1</div>
        <h1 style={{fontSize:36,margin:"8px 0"}}>Let's personalize your workspace.</h1>
        <p className="muted">You only need to provide this information once. CampusMind will reuse it when you create assignments, projects and presentations.</p>
        <div className="card" style={{padding:24,marginTop:24,display:"grid",gap:16}}>
          {[
            ["Country","Country"],
            ["University","University / Institution"],
            ["Matric number","Student ID / Matric number"],
            ["Faculty","Faculty / School"],
            ["Department","Department"],
            ["Level","e.g. 100 Level"],
            ["Semester","e.g. First Semester"]
          ].map(([label,placeholder])=>
            <label key={label} style={{display:"grid",gap:7,fontWeight:600,fontSize:14}}>
              {label}<input placeholder={placeholder} style={{height:46,padding:"0 13px",border:"1px solid #E7E5E4",borderRadius:8}}/>
            </label>
          )}
          <Link href="/dashboard" className="btn btn-primary">Continue to Dashboard</Link>
        </div>
      </div>
    </div>
  </main>;
}