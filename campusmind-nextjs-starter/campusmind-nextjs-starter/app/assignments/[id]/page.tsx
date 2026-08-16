"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft, BookOpen, CalendarDays, Check, FileText,
  Save, Sparkles, WandSparkles
} from "lucide-react";
import { createClient } from "../../../lib/supabase/client";

type Assignment = {
  id: string;
  title: string;
  instructions: string | null;
  content: string | null;
  status: string;
  due_date: string | null;
  word_count: number | null;
  citation_style: string | null;
  course_id: string | null;
};

type Course = {
  id: string;
  course_code: string | null;
  course_title: string;
};

export default function AssignmentWorkspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const supabase = createClient();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data } = await supabase
        .from("assignments")
        .select(
          "id,title,instructions,content,status,due_date,word_count,citation_style,course_id"
        )
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (!data) {
        window.location.href = "/assignments";
        return;
      }

      const assignmentData = data as Assignment;

      setAssignment(assignmentData);
      setContent(assignmentData.content || "");
      setStatus(assignmentData.status || "draft");

      if (assignmentData.course_id) {
        const { data: c } = await supabase
          .from("courses")
          .select("id,course_code,course_title")
          .eq("id", assignmentData.course_id)
          .single();

        setCourse((c as Course) || null);
      }

      setLoading(false);
    }

    load();
  }, [id, supabase]);

  async function saveChanges(nextStatus = status) {
    if (!assignment) return;

    setSaving(true);

    const { error } = await supabase
      .from("assignments")
      .update({
        content,
        status: nextStatus,
      })
      .eq("id", assignment.id);

    setSaving(false);

    if (!error) {
      setStatus(nextStatus);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }
  }

  if (loading) {
    return (
      <div className="cm-full-loader">
        <div className="cm-loader" />
        <span>Loading assignment...</span>
      </div>
    );
  }

  if (!assignment) return null;

  return (
    <div className="cm-module-page">
      <header className="cm-module-topbar">
        <Link href="/assignments" className="cm-back-link">
          <ArrowLeft size={16} /> Assignments
        </Link>

        <div className="cm-workspace-actions">
          {saved && (
            <span className="cm-saved">
              <Check size={14} /> Saved
            </span>
          )}

          <button
            className="cm-secondary-button compact"
            disabled={saving}
            onClick={() => saveChanges()}
          >
            <Save size={14} /> {saving ? "Saving" : "Save"}
          </button>

          {status !== "completed" && (
            <button
              className="cm-primary-button compact"
              onClick={() => saveChanges("completed")}
            >
              <Check size={14} /> Complete
            </button>
          )}
        </div>
      </header>

      <main className="cm-workspace">
        <section className="cm-workspace-heading">
          <div>
            <p className="cm-page-kicker">ASSIGNMENT WORKSPACE</p>
            <h1>{assignment.title}</h1>

            <div className="cm-workspace-meta">
              {course && (
                <span>
                  <BookOpen size={13} />
                  {course.course_code
                    ? `${course.course_code} · ${course.course_title}`
                    : course.course_title}
                </span>
              )}

              {assignment.due_date && (
                <span>
                  <CalendarDays size={13} />
                  Due{" "}
                  {new Intl.DateTimeFormat("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(assignment.due_date))}
                </span>
              )}

              {assignment.word_count && (
                <span>{assignment.word_count.toLocaleString()} words</span>
              )}
            </div>
          </div>

          <span className={`cm-status status-${status}`}>
            {status.replace("_", " ")}
          </span>
        </section>

        <div className="cm-workspace-grid">
          <section className="cm-editor-card">
            <div className="cm-editor-header">
              <div>
                <FileText size={16} />
                <span>Your work</span>
              </div>
              <span>
                {content.trim() ? content.trim().split(/\s+/).length : 0} words
              </span>
            </div>

            <textarea
              className="cm-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your assignment here..."
            />
          </section>

          <aside className="cm-assignment-side">
            <div className="cm-side-card">
              <div className="cm-side-title">
                <FileText size={16} />
                <h2>Instructions</h2>
              </div>

              <p>
                {assignment.instructions || "No instructions have been added yet."}
              </p>

              {assignment.citation_style && (
                <div className="cm-side-detail">
                  <b>Citation style</b>
                  <span>{assignment.citation_style}</span>
                </div>
              )}
            </div>

            <div className="cm-side-ai">
              <div className="cm-side-ai-icon">
                <Sparkles size={18} />
              </div>

              <p className="cm-page-kicker">CAMPUSMIND AI</p>
              <h2>Need help with this assignment?</h2>

              <p>
                AI tools will help you turn your instructions into an outline,
                improve your writing and understand difficult topics.
              </p>

              <Link
                href={`/ai?assignment=${assignment.id}`}
                className="cm-primary-button full"
              >
                <WandSparkles size={15} /> Open AI assistant
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
