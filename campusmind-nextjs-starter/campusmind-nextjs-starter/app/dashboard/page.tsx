"use client";

import Link from "next/link";
import {
  ArrowRight, Bell, BookOpen, Brain, CalendarDays, ChevronRight,
  ClipboardList, FileText, GraduationCap, LayoutDashboard, LogOut,
  Menu, Presentation, Settings, Sparkles, UserRound, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Profile = { full_name: string | null; matric_number: string | null; university_id: string | null };
type AcademicProfile = { faculty: string | null; department: string | null; level: string | null; semester: string | null };
type University = { name: string };

const quickTools = [
  { title: "Assignment", description: "Write or improve an assignment", href: "/assignments/new", icon: FileText, className: "tool-red" },
  { title: "Study", description: "Prepare for a test or exam", href: "/study", icon: BookOpen, className: "tool-green" },
  { title: "PowerPoint", description: "Turn your topic into slides", href: "/powerpoint", icon: Presentation, className: "tool-orange" },
  { title: "Project", description: "Plan and write your project", href: "/projects/new", icon: ClipboardList, className: "tool-purple" },
];

export default function DashboardPage() {
  const supabase = createClient();
  const [name, setName] = useState("Student");
  const [academic, setAcademic] = useState<AcademicProfile | null>(null);
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }

      const [profileResult, academicResult] = await Promise.all([
        supabase.from("profiles").select("full_name, matric_number, university_id").eq("id", user.id).single(),
        supabase.from("academic_profiles").select("faculty, department, level, semester").eq("user_id", user.id).eq("is_current", true).maybeSingle(),
      ]);
      if (!mounted) return;

      if (profileResult.data) {
        if (profileResult.data.full_name) setName(profileResult.data.full_name);
        if (profileResult.data.university_id) {
          const { data } = await supabase.from("universities").select("name").eq("id", profileResult.data.university_id).single();
          if (mounted && data) setUniversity(data);
        }
      }
      if (academicResult.data) setAcademic(academicResult.data);
      setLoading(false);
    }
    loadDashboard();
    return () => { mounted = false; };
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const firstName = name.trim().split(/\s+/)[0] || "Student";
  const schoolLine = [academic?.department, academic?.level].filter(Boolean).join(" · ");

  return (
    <div className="cm-dashboard">
      <aside className={`cm-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="cm-sidebar-top">
          <Link href="/" className="cm-brand">
            <span className="cm-brand-mark"><GraduationCap size={20} /></span>
            <span>Campus<span>Mind</span></span>
          </Link>
          <button className="cm-close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={21} /></button>
        </div>

        <nav className="cm-nav">
          <p className="cm-nav-label">Workspace</p>
          <Link href="/dashboard" className="cm-nav-item active"><LayoutDashboard size={18} /><span>Dashboard</span></Link>
          <Link href="/assignments" className="cm-nav-item"><FileText size={18} /><span>Assignments</span></Link>
          <Link href="/projects" className="cm-nav-item"><ClipboardList size={18} /><span>Projects</span></Link>
          <Link href="/study" className="cm-nav-item"><BookOpen size={18} /><span>Study</span></Link>
          <Link href="/powerpoint" className="cm-nav-item"><Presentation size={18} /><span>PowerPoint</span></Link>

          <p className="cm-nav-label cm-nav-label-spaced">Account</p>
          <Link href="/profile" className="cm-nav-item"><UserRound size={18} /><span>Profile</span></Link>
          <Link href="/settings" className="cm-nav-item"><Settings size={18} /><span>Settings</span></Link>
        </nav>

        <div className="cm-sidebar-bottom">
          <button className="cm-logout" onClick={logout}><LogOut size={17} /><span>Log out</span></button>
        </div>
      </aside>

      {menuOpen && <button className="cm-mobile-overlay" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <main className="cm-main">
        <header className="cm-topbar">
          <button className="cm-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="cm-mobile-brand">
            <Link href="/" className="cm-brand">
              <span className="cm-brand-mark"><GraduationCap size={18} /></span>
              <span>Campus<span>Mind</span></span>
            </Link>
          </div>
          <div className="cm-topbar-actions">
            <button className="cm-icon-button" aria-label="Notifications"><Bell size={19} /><span className="cm-notification-dot" /></button>
            <Link href="/profile" className="cm-avatar" aria-label="Profile">{firstName.charAt(0).toUpperCase()}</Link>
          </div>
        </header>

        <div className="cm-content">
          <section className="cm-welcome">
            <div>
              <p className="cm-eyebrow">STUDENT WORKSPACE</p>
              <h1>Good morning, {loading ? "Student" : firstName} <span className="cm-wave">👋</span></h1>
              <p className="cm-subtitle">Let&apos;s make your academic work a little easier today.</p>
              <div className="cm-student-meta">
                {university?.name && <span><GraduationCap size={14} />{university.name}</span>}
                {schoolLine && <span><BookOpen size={14} />{schoolLine}</span>}
              </div>
            </div>
            <Link href="/ai" className="cm-ai-header-button"><Sparkles size={16} />Ask CampusMind</Link>
          </section>

          <section className="cm-ai-card">
            <div className="cm-ai-icon"><Brain size={24} /></div>
            <div className="cm-ai-copy">
              <span className="cm-ai-label"><Sparkles size={13} />CAMPUSMIND AI</span>
              <h2>What are you working on?</h2>
              <p>Ask a question, explain a topic, improve your writing, or get help starting an academic task.</p>
            </div>
            <Link href="/ai" className="cm-ai-action">Start with AI <ArrowRight size={16} /></Link>
          </section>

          <section className="cm-section">
            <div className="cm-section-heading"><div><p className="cm-section-kicker">QUICK TOOLS</p><h2>What do you need help with?</h2></div></div>
            <div className="cm-tools-grid">
              {quickTools.map((tool) => {
                const Icon = tool.icon;
                return <Link href={tool.href} className={`cm-tool-card ${tool.className}`} key={tool.title}>
                  <div className="cm-tool-icon"><Icon size={21} /></div>
                  <div className="cm-tool-copy"><h3>{tool.title}</h3><p>{tool.description}</p></div>
                  <ChevronRight className="cm-tool-arrow" size={18} />
                </Link>;
              })}
            </div>
          </section>

          <div className="cm-lower-grid">
            <section className="cm-panel">
              <div className="cm-panel-heading">
                <div><p className="cm-section-kicker">YOUR WORK</p><h2>Upcoming</h2></div>
                <Link href="/assignments">View all <ArrowRight size={14} /></Link>
              </div>
              <div className="cm-empty">
                <div className="cm-empty-icon"><CalendarDays size={22} /></div>
                <h3>Your upcoming work will appear here.</h3>
                <p>Add an assignment or project and CampusMind will help you keep track of what is due.</p>
                <Link href="/assignments/new">Add your first task <ArrowRight size={14} /></Link>
              </div>
            </section>

            <section className="cm-panel cm-study-panel">
              <div className="cm-study-icon"><BookOpen size={22} /></div>
              <p className="cm-section-kicker">STUDY SMARTER</p>
              <h2>Turn your materials into something you can study.</h2>
              <p>Upload notes or a PDF, then use CampusMind to create summaries, questions and revision material.</p>
              <Link href="/study">Start studying <ArrowRight size={15} /></Link>
            </section>
          </div>

          <section className="cm-template-banner">
            <div className="cm-template-icon"><Sparkles size={22} /></div>
            <div><span className="cm-section-kicker">CAMPUSMIND TEMPLATES</span><h2>Don&apos;t start from a blank page.</h2><p>Use ready-made academic templates for assignments, projects and presentations.</p></div>
            <Link href="/templates">Explore templates <ArrowRight size={15} /></Link>
          </section>

          <footer className="cm-dashboard-footer">
            <span>CampusMind</span><span>Built for students, wherever they study.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
