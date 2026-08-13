import Link from "next/link";

export default function Login() {
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}>
    <div className="card" style={{width:"min(440px,100%)",padding:28}}>
      <Link href="/" style={{fontWeight:800,fontSize:22,color:"#7F1D1D"}}>CampusMind</Link>
      <h1 style={{margin:"28px 0 8px"}}>Welcome back</h1>
      <p className="muted">Log in to your academic workspace.</p>
      <form style={{display:"grid",gap:16,marginTop:24}}>
        <label style={{display:"grid",gap:7,fontWeight:600,fontSize:14}}>Email address<input required type="email" placeholder="you@example.com" style={{height:46,padding:"0 13px",border:"1px solid #E7E5E4",borderRadius:8}}/></label>
        <label style={{display:"grid",gap:7,fontWeight:600,fontSize:14}}>Password<input required type="password" placeholder="Your password" style={{height:46,padding:"0 13px",border:"1px solid #E7E5E4",borderRadius:8}}/></label>
        <button className="btn btn-primary" type="submit">Log In</button>
      </form>
      <p className="muted" style={{fontSize:14,textAlign:"center",marginTop:20}}>Don't have an account? <Link href="/signup" style={{color:"#7F1D1D",fontWeight:700}}>Create one</Link></p>
    </div>
  </main>;
}