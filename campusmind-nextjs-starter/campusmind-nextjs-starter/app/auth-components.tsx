import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return <main className="auth-page">
    <header className="auth-header">
      <Link href="/" className="landing-brand"><span className="brand-mark">🎓</span><span>Campus<span>Mind</span></span></Link>
      <Link href="/" className="back-home">← Back to home</Link>
    </header>
    <div className="auth-content">{children}</div>
    <footer className="auth-footer">© 2026 CampusMind. All rights reserved.</footer>
  </main>;
}
export function AuthCard({eyebrow,title,description,children}:{eyebrow:string;title:string;description:string;children:React.ReactNode}) {
  return <div className="auth-card"><div className="auth-logo"><GraduationCap size={25}/></div><div className="auth-heading"><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{children}</div>;
}
export function AuthInput({label,type="text",placeholder,name}:{label:string;type?:string;placeholder:string;name?:string}) {
  return <label className="auth-label">{label}<input name={name} type={type} placeholder={placeholder}/></label>;
}
