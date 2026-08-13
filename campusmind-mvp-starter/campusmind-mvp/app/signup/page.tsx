import Link from "next/link";

export default function Signup() {
  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}>
    <div className="card" style={{width:"min(440px,100%)",padding:28}}>
      <Link href="/" style={{fontWeight:800,fontSize:22,color:"#7F1D1D"}}>CampusMind</Link>
      <h1 style={{margin:"28px 0 8px"}}>Create your account</h1>
      <p className="muted">Your academic workspace starts here.</p>
      <form style={{display:"grid",gap:16,marginTop:24}}>
        {["Full name","Email address","Password","Confirm password"].map(x=>
          <label key={x} style={{display:"grid",gap:7,fontWeight:600,fontSize:14}}>
            {x}<input required type={x.toLowerCase().includes("password")?"password":"text"} placeholder={x} style={{height:46,padding:"0 13px",border:"1px solid #E7E5E4",borderRadius:8,outline:"none"}}/>
          </label>
        )}
        <button className="btn btn-primary" type="submit">Create Account</button>
      </form>
      <p className="muted" style={{fontSize:14,textAlign:"center",marginTop:20}}>Already have an account? <Link href="/login" style={{color:"#7F1D1D",fontWeight:700}}>Log in</Link></p>
    </div>
  </main>;
}