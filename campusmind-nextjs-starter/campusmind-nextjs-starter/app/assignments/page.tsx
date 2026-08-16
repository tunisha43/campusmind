"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2,
  Clock3, FileText, Filter, Plus, Search, Sparkles
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";

type Assignment = {
  id: string;
  title: string;
  instructions: string | null;
  status: string;
  due_date: string | null;
  word_count: number | null;
  course_id: string | null;
};

type Course = {
  id: string;
  course_code: string | null;
  course_title: string;
};

export default function AssignmentsPage() {
  const supabase = createClient();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [course, setCourse] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const [a, c] = await Promise.all([
        supabase
          .from("assignments")
          .select("id,title,instructions,status,due_date,word_count,course_id")
          .eq("user_id", user.id)
          .order("due_date", { ascending: true, nullsFirst: false }),
        supabase
          .from("courses")
          .select("id,course_code,course_title")
          .eq("user_id", user.id)
          .order("course_title")
      ]);

      setAssignments((a.data as Assignment[]) || []);
      setCourses((c.data as Course[]) || []);
      setLoading(false);
    }

    load();
  }, [supabase]);

  const courseMap = useMemo(
    () => Object.fromEntries(courses.map((c) => [c.id, c])),
    [courses]
  );

  const filtered = assignments.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.instructions || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      (status === "active" && ["draft", "generating"].includes(a.status)) ||
      a.status === status;

    const matchesCourse = course === "all" || a.course_id === course;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const counts = {
    all: assignments.length,
    active: assignments.filter((a) => ["draft", "generating"].includes(a.status)).length,
    completed: assignments.filter((a) => a.status === "completed").length,
  };

  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(value))
      : "No deadline";

  return (
    <div className="cm-module-page">
      <header className="cm-module-topbar">
        <Link href="/dashboard" className="cm-back-link">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <Link href="/assignments/new" className="cm-primary-button">
          <Plus size={16} /> New assignment
        </Link>
      </header>

      <main className="cm-module-content">
        <section className="cm-page-intro">
          <div>
            <p className="cm-page-kicker">ACADEMIC WORKSPACE</p>
            <h1>Assignments</h1>
            <p>Keep your coursework organized and get help writing when you need it.</p>
          </div>

          <div className="cm-page-ai">
            <Sparkles size={17} />
            AI assistance is available inside every assignment.
          </div>
        </section>

        <section className="cm-stat-row">
          <button className={`cm-stat ${status === "all" ? "selected" : ""}`} onClick={() => setStatus("all")}>
            <FileText size={17} />
            <span><b>{counts.all}</b> All assignments</span>
          </button>

          <button className={`cm-stat ${status === "active" ? "selected" : ""}`} onClick={() => setStatus("active")}>
            <Clock3 size={17} />
            <span><b>{counts.active}</b> In progress</span>
          </button>

          <button className={`cm-stat ${status === "completed" ? "selected" : ""}`} onClick={() => setStatus("completed")}>
            <CheckCircle2 size={17} />
            <span><b>{counts.completed}</b> Completed</span>
          </button>
        </section>

        <section className="cm-list-panel">
          <div className="cm-list-toolbar">
            <div className="cm-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
              />
            </div>

            <div className="cm-filter-wrap">
              <Filter size={14} />
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="all">All courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.course_code || c.course_title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="cm-module-empty">
              <div className="cm-loader" />
              <h3>Loading your assignments...</h3>
            </div>
          ) : filtered.length === 0 ? (
            <div className="cm-module-empty">
              <div className="cm-big-empty-icon"><FileText size={25} /></div>
              <h3>{assignments.length === 0 ? "No assignments yet" : "No assignments match your filters"}</h3>
              <p>
                {assignments.length === 0
                  ? "Create your first assignment and keep everything organized in one place."
                  : "Try changing your search or filters."}
              </p>

              {assignments.length === 0 && (
                <Link href="/assignments/new" className="cm-primary-button">
                  <Plus size={15} /> Create assignment
                </Link>
              )}
            </div>
          ) : (
            <div className="cm-assignment-list">
              {filtered.map((a) => {
                const c = a.course_id ? courseMap[a.course_id] : undefined;
                const overdue = Boolean(
                  a.due_date &&
                  new Date(a.due_date) < new Date() &&
                  a.status !== "completed"
                );

                return (
                  <Link href={`/assignments/${a.id}`} className="cm-assignment-row" key={a.id}>
                    <div className="cm-assignment-icon"><FileText size={18} /></div>

                    <div className="cm-assignment-main">
                      <h3>{a.title}</h3>
                      <div className="cm-assignment-meta">
                        {c && (
                          <span>
                            <BookOpen size={12} />
                            {c.course_code || c.course_title}
                          </span>
                        )}

                        <span className={overdue ? "overdue" : ""}>
                          <CalendarDays size={12} />
                          {overdue ? "Overdue · " : ""}
                          {date(a.due_date)}
                        </span>
                      </div>
                    </div>

                    <span className={`cm-status status-${a.status || "draft"}`}>
                      {(a.status || "draft").replace("_", " ")}
                    </span>

                    <ArrowRight className="cm-row-arrow" size={17} />
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
