"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, FileText, Save, Sparkles } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";

type Course = {
  id: string;
  course_code: string | null;
  course_title: string;
};

export default function NewAssignmentPage() {
  const supabase = createClient();

  const [courses, setCourses] = useState<Course[]>([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructions, setInstructions] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [citationStyle, setCitationStyle] = useState("APA");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("courses")
        .select("id,course_code,course_title")
        .eq("user_id", user.id)
        .order("course_title");

      setCourses((data as Course[]) || []);
    }

    load();
  }, [supabase]);

  async function save(nextStatus: "draft" | "generating") {
    setError("");

    if (!title.trim()) {
      setError("Please enter an assignment title.");
      return;
    }

    if (!courseId) {
      setError("Please select a course.");
      return;
    }

    setSaving(true);

    const { data, error: e } = await supabase
      .from("assignments")
      .insert({
        user_id: userId,
        course_id: courseId,
        title: title.trim(),
        instructions: instructions.trim() || null,
        word_count: wordCount ? Number(wordCount) : null,
        citation_style: citationStyle || null,
        due_date: dueDate || null,
        status: nextStatus,
      })
      .select("id")
      .single();

    if (e) {
      setError(e.message);
      setSaving(false);
      return;
    }

    window.location.href = `/assignments/${data.id}`;
  }

  return (
    <div className="cm-module-page">
      <header className="cm-module-topbar">
        <Link href="/assignments" className="cm-back-link">
          <ArrowLeft size={16} /> Assignments
        </Link>
        <span className="cm-topbar-label">Create assignment</span>
      </header>

      <main className="cm-form-content">
        <div className="cm-form-heading">
          <p className="cm-page-kicker">NEW ASSIGNMENT</p>
          <h1>What are you working on?</h1>
          <p>Add the basics now. You can write and work with CampusMind AI after saving.</p>
        </div>

        <div className="cm-form-card">
          {error && <div className="cm-form-error">{error}</div>}

          <label className="cm-field">
            <span>Assignment title <b>*</b></span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The impact of social media on students"
            />
          </label>

          <label className="cm-field">
            <span>Course <b>*</b></span>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.course_code ? `${c.course_code} — ${c.course_title}` : c.course_title}
                </option>
              ))}
            </select>
          </label>

          <label className="cm-field">
            <span>Assignment instructions</span>
            <textarea
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Paste the lecturer's instructions or describe what you have been asked to do..."
            />
          </label>

          <div className="cm-field-grid">
            <label className="cm-field">
              <span>Word count</span>
              <input
                type="number"
                min="0"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                placeholder="e.g. 1500"
              />
            </label>

            <label className="cm-field">
              <span>Citation style</span>
              <select value={citationStyle} onChange={(e) => setCitationStyle(e.target.value)}>
                <option>APA</option>
                <option>MLA</option>
                <option>Chicago</option>
                <option>Harvard</option>
                <option>Vancouver</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label className="cm-field">
            <span>Due date</span>
            <div className="cm-input-icon">
              <CalendarDays size={16} />
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </label>

          <div className="cm-ai-tip">
            <Sparkles size={18} />
            <div>
              <b>Work smarter with CampusMind AI</b>
              <p>
                Once saved, you can use AI to create an outline, improve your writing,
                explain difficult parts and more.
              </p>
            </div>
          </div>

          <div className="cm-form-actions">
            <Link href="/assignments" className="cm-secondary-button">Cancel</Link>

            <button
              className="cm-secondary-button"
              disabled={saving}
              onClick={() => save("draft")}
            >
              <Save size={15} /> Save draft
            </button>

            <button
              className="cm-primary-button"
              disabled={saving}
              onClick={() => save("generating")}
            >
              <FileText size={15} /> {saving ? "Saving..." : "Start assignment"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
