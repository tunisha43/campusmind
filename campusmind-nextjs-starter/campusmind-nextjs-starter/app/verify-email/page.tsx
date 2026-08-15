 "use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Mail, RefreshCw } from "lucide-react";
import { useEffect,useState } from "react";
import { AuthCard,AuthShell } from "../auth-components";
import { createClient } from "../../lib/supabase/client";

export default function VerifyEmailPage(){
 const supabase=createClient();const [email,setEmail]=useState(""),[token,setToken]=useState(""),[loading,setLoading]=useState(false),[resending,setResending]=useState(false),[error,setError]=useState(""),[verified,setVerified]=useState(false);
 useEffect(()=>{setEmail(sessionStorage.getItem("campusmind_pending_email")||"")},[]);
 async function verify(e:React.FormEvent){e.preventDefault();setError("");if(!email||token.length!==6)return setError("Enter the 6-digit code sent to your email.");setLoading(true);const {error}=await supabase.auth.verifyOtp({email,token,type:"signup"});setLoading(false);if(error)return setError(error.message);setVerified(true);sessionStorage.removeItem("campusmind_pending_email");}
 async function resend(){if(!email)return setError("Enter the email used to create your account.");setResending(true);const {error}=await supabase.auth.resend({type:"signup",email});setResending(false);if(error)setError(error.message);}
 if(verified)return <AuthShell><AuthCard eyebrow="Email verified" title="You&apos;re verified!" description="Your CampusMind account is ready. Let&apos;s finish your academic profile."><div className="auth-success"><CheckCircle2 size={28}/><strong>Email confirmed successfully.</strong><span>Your account is now verified.</span></div><Link href="/onboarding" className="auth-button">Set up my academic profile <ArrowRight size={17}/></Link></AuthCard></AuthShell>;
 return <AuthShell><AuthCard eyebrow="Email verification" title="Check your inbox." description="Enter the 6-digit verification code sent to your email."><div className="verify-mail"><Mail size={24}/><span>{email||"your email address"}</span></div><form className="auth-form" onSubmit={verify}><label className="auth-label">Verification code<input className="code-input" inputMode="numeric" maxLength={6} value={token} onChange={e=>setToken(e.target.value.replace(/\D/g,""))} placeholder="000000"/></label>{error&&<div className="auth-error">{error}</div>}<button className="auth-button" disabled={loading}>{loading?<><Loader2 className="spin" size={17}/> Verifying...</>:<>Verify Email <ArrowRight size={17}/></>}</button></form><div className="verify-actions"><button type="button" onClick={resend} disabled={resending}>{resending?<Loader2 className="spin" size={14}/>:<RefreshCw size={14}/>} Resend code</button><Link href="/signup">Use another email</Link></div></AuthCard></AuthShell>;
}
